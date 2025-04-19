
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailAnalysisRequest {
  email: string;
  sender: string;
  subject: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, sender, subject } = await req.json() as EmailAnalysisRequest;
    const ipQualityScoreApiKey = Deno.env.get('IPQUALITYSCORE_API_KEY') || 'icF9wrJO400DxKktcuGwDdaAWg8Sm6Vq';
    
    // Call IPQualityScore API to analyze the email
    const apiUrl = `https://www.ipqualityscore.com/api/json/email/${ipQualityScoreApiKey}/${encodeURIComponent(email)}`;
    
    console.log(`Analyzing email ${email} from sender ${sender} with subject "${subject}"`);
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`IPQualityScore API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("IPQualityScore analysis result:", data);
    
    // Store the result in Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://fnkjxnltxopuljxyoxzx.supabase.co';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // Try to insert the analysis result into the email_threats table
      try {
        const { error } = await supabase
          .from('email_threats')
          .insert([{
            subject: subject,
            sender: sender,
            sender_ip: data.success ? data.fraud_score : "Unknown",
            country: data.success ? data.country : "Unknown",
            threat: data.success && data.fraud_score > 75 ? "Potential Fraud" : "None",
            severity: data.success ? 
              (data.fraud_score > 80 ? "High" : 
               data.fraud_score > 50 ? "Medium" : "Low") : "Unknown",
            status: data.success && data.fraud_score > 75 ? "Quarantined" : "Allowed",
            spf: data.success ? (data.spam_trap_score > 0.5 ? "fail" : "pass") : "unknown",
            dkim: data.success ? (data.recent_abuse ? "fail" : "pass") : "unknown",
            dmarc: data.success ? (data.disposable ? "fail" : "pass") : "unknown",
            risk_score: data.success ? data.fraud_score : 0,
            risk_reasons: data.success ? [
              data.disposable ? "Disposable email" : null,
              data.honeypot ? "Honeypot detected" : null,
              data.recent_abuse ? "Recent abuse detected" : null,
              data.spam_trap_score > 0.5 ? "Possible spam trap" : null
            ].filter(Boolean) : [],
            is_safe: data.success ? data.fraud_score < 50 : true,
            date: new Date().toISOString(),
            user_id: req.headers.get('Authorization')?.split(' ')[1] || 'anonymous'
          }]);
          
        if (error) {
          console.error("Error inserting threat data:", error);
        }
      } catch (dbError) {
        console.error("Database operation failed:", dbError);
      }
    } else {
      console.log("Supabase credentials not available, skipping database storage");
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Email analyzed successfully",
        threatDetails: {
          riskScore: data.success ? data.fraud_score : 0,
          isSafe: data.success ? data.fraud_score < 50 : true,
          severity: data.success ? 
            (data.fraud_score > 80 ? "High" : 
             data.fraud_score > 50 ? "Medium" : "Low") : "Unknown",
        }
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error("Error analyzing email:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to analyze email",
        error: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});
