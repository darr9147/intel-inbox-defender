
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const IPQUALITYSCORE_API_KEY = "icF9wrJO400DxKktcuGwDdaAWg8Sm6Vq";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, sender, subject } = await req.json();

    // Validate input
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call IPQualityScore API to analyze the email
    const apiUrl = `https://www.ipqualityscore.com/api/json/email/${IPQUALITYSCORE_API_KEY}/${encodeURIComponent(email)}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const ipqsData = await response.json();
    
    console.log("IPQualityScore response:", JSON.stringify(ipqsData));

    // Map IPQualityScore data to our threat model
    const emailThreat = {
      sender: sender || email,
      subject: subject || "Email analysis",
      date: new Date().toISOString(),
      senderIP: ipqsData.recently_created ? "Unknown" : "Verified",
      country: ipqsData.country_code || "Unknown",
      threat: determineThreatType(ipqsData),
      severity: determineSeverity(ipqsData),
      status: ipqsData.valid ? "Allowed" : "Blocked",
      spf: ipqsData.smtp_score > 0.7 ? "pass" : "fail",
      dkim: ipqsData.dns_valid ? "pass" : "fail",
      dmarc: ipqsData.disposable ? "fail" : "pass",
      risk_score: Math.round(ipqsData.fraud_score),
      risk_reasons: extractRiskReasons(ipqsData),
      is_safe: ipqsData.fraud_score < 50 && ipqsData.valid,
    };

    return new Response(
      JSON.stringify(emailThreat),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function determineThreatType(ipqsData: any): string {
  if (ipqsData.disposable) return "Spam";
  if (ipqsData.honeypot) return "Phishing";
  if (ipqsData.spam_trap_score > 0.7) return "Spam";
  if (ipqsData.overall_score < 0.3) return "Phishing";
  if (ipqsData.overall_score < 0.7) return "Suspicious";
  return "None";
}

function determineSeverity(ipqsData: any): string {
  const fraudScore = ipqsData.fraud_score;
  if (fraudScore > 85) return "Critical";
  if (fraudScore > 70) return "High";
  if (fraudScore > 40) return "Medium";
  return "Low";
}

function extractRiskReasons(ipqsData: any): string[] {
  const reasons = [];
  
  if (ipqsData.disposable) reasons.push("Disposable email address");
  if (ipqsData.honeypot) reasons.push("Email used in honeypot");
  if (ipqsData.smtp_score < 0.5) reasons.push("Poor SMTP configuration");
  if (ipqsData.overall_score < 0.5) reasons.push("Low overall email quality");
  if (ipqsData.recent_abuse) reasons.push("Recent abuse detected");
  if (ipqsData.spam_trap_score > 0.5) reasons.push("Email matches spam patterns");
  if (ipqsData.fraudulent) reasons.push("Fraudulent activity detected");
  if (ipqsData.suspect) reasons.push("Suspicious characteristics");
  if (ipqsData.recently_created && ipqsData.days_since_domain_creation < 30) {
    reasons.push("Domain recently created");
  }
  
  // If no specific reasons found but score is high
  if (reasons.length === 0 && ipqsData.fraud_score > 70) {
    reasons.push("Multiple risk factors detected");
  }
  
  return reasons;
}
