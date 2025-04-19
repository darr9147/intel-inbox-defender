
import { supabase } from "@/integrations/supabase/client";
import { EmailAccount } from "@/types/email";
import { checkTableExists } from "@/utils/dbUtils";

export const fetchEmailAccounts = async (): Promise<EmailAccount[]> => {
  try {
    const tableExists = await checkTableExists('email_accounts');
    
    if (!tableExists) {
      console.info('Email accounts table not available, returning empty array');
      return [];
    }

    const { data, error } = await supabase
      .from('email_accounts' as any)
      .select('*')
      .order('connected_at', { ascending: false });

    if (error) {
      console.error('Error fetching email accounts:', error);
      return [];
    }

    return (data as unknown as EmailAccount[]) || [];
  } catch (error) {
    console.error('Error in fetchEmailAccounts:', error);
    return [];
  }
};

export const connectEmailAccount = async (
  provider: string,
  email: string
): Promise<EmailAccount | null> => {
  try {
    const tableExists = await checkTableExists('email_accounts');
    
    if (!tableExists) {
      console.info('Email accounts table not available, returning mock data');
      return {
        id: crypto.randomUUID(),
        provider,
        email,
        connected_at: new Date().toISOString()
      };
    }

    const { data, error } = await supabase
      .from('email_accounts' as any)
      .insert([
        {
          provider,
          email,
          connected_at: new Date().toISOString(),
          user_id: (await supabase.auth.getUser()).data.user?.id || 'anonymous'
        }
      ])
      .select()
      .single();

    if (error) throw error;
    
    // Analyze the email using IPQualityScore API
    await analyzeNewEmail(email);
    
    return (data as unknown as EmailAccount);
  } catch (error) {
    console.error('Error connecting email account:', error);
    return null;
  }
};

export const disconnectEmailAccount = async (id: string): Promise<boolean> => {
  try {
    const tableExists = await checkTableExists('email_accounts');
    
    if (!tableExists) {
      console.info('Email accounts table not available, pretending to disconnect');
      return true;
    }

    const { error } = await supabase
      .from('email_accounts' as any)
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error disconnecting email account:', error);
    return false;
  }
};

export const analyzeNewEmail = async (email: string): Promise<void> => {
  try {
    const response = await fetch(`${window.location.origin}/api/analyze-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        sender: email,
        subject: "Email account connection",
      }),
    });

    if (!response.ok) {
      throw new Error(`Error analyzing email: ${response.statusText}`);
    }

    const threatData = await response.json();
    console.log("Email analyzed:", threatData);
    
  } catch (error) {
    console.error("Error analyzing email:", error);
    throw error;
  }
};
