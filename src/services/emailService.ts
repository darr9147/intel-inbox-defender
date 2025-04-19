import { supabase } from "@/integrations/supabase/client";

export interface EmailThreat {
  id: number;
  date: string;
  subject: string;
  sender: string;
  senderIP: string;
  country: string;
  threat: string;
  severity: string;
  status: string;
  spf: string;
  dkim: string;
  dmarc: string;
  risk_score?: number;
  risk_reasons?: string[];
  is_safe?: boolean;
}

interface EmailAccount {
  id: string;
  provider: string;
  email: string;
  connected_at: string;
}

export const fetchEmailAccounts = async (): Promise<EmailAccount[]> => {
  const { data, error } = await supabase
    .from('email_accounts')
    .select('*')
    .order('connected_at', { ascending: false });

  if (error) {
    console.error('Error fetching email accounts:', error);
    return [];
  }

  return data || [];
};

export const connectEmailAccount = async (
  provider: string,
  email: string
): Promise<EmailAccount | null> => {
  try {
    const { data, error } = await supabase
      .from('email_accounts')
      .insert([
        {
          provider,
          email,
          connected_at: new Date().toISOString(),
          user_id: (await supabase.auth.getUser()).data.user?.id
        }
      ])
      .select()
      .single();

    if (error) throw error;
    
    // Analyze the email using IPQualityScore API
    await analyzeNewEmail(email);
    
    return data;
  } catch (error) {
    console.error('Error connecting email account:', error);
    return null;
  }
};

export const disconnectEmailAccount = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('email_accounts')
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

export const fetchEmailThreats = async (
  filters?: {
    threatType?: string;
    severity?: string;
    dateRange?: string;
    searchQuery?: string;
  }
): Promise<EmailThreat[]> => {
  try {
    // Apply filters
    let filteredThreats = [...mockEmailThreats];
    
    if (filters) {
      const { threatType, severity, dateRange, searchQuery } = filters;
      
      if (threatType && threatType !== 'all_threats') {
        filteredThreats = filteredThreats.filter(threat => 
          threat.threat.toLowerCase() === threatType.toLowerCase()
        );
      }
      
      if (severity && severity !== 'all_severities') {
        filteredThreats = filteredThreats.filter(threat => 
          threat.severity.toLowerCase() === severity.toLowerCase()
        );
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredThreats = filteredThreats.filter(threat => 
          threat.subject.toLowerCase().includes(query) || 
          threat.sender.toLowerCase().includes(query)
        );
      }
      
      // Date range filtering would be implemented here
    }
    
    return filteredThreats;
  } catch (error) {
    console.error('Error fetching email threats:', error);
    return [];
  }
};

export const getThreatStatistics = async () => {
  try {
    const threats = await fetchEmailThreats();
    
    // By threat type
    const threatTypes = threats.reduce((acc, threat) => {
      const type = threat.threat === 'None' ? 'Safe' : threat.threat;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // By country
    const countries = threats.reduce((acc, threat) => {
      acc[threat.country] = (acc[threat.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // By severity
    const severities = threats.reduce((acc, threat) => {
      acc[threat.severity] = (acc[threat.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      threatTypes,
      countries,
      severities,
      totalEmails: threats.length,
      safeEmails: threats.filter(t => t.is_safe).length,
      threateningEmails: threats.filter(t => !t.is_safe).length
    };
  } catch (error) {
    console.error('Error getting threat statistics:', error);
    return {
      threatTypes: {},
      countries: {},
      severities: {},
      totalEmails: 0,
      safeEmails: 0,
      threateningEmails: 0
    };
  }
};

export const getEmailDetails = async (id: number): Promise<EmailThreat | null> => {
  try {
    const threats = await fetchEmailThreats();
    return threats.find(threat => threat.id === id) || null;
  } catch (error) {
    console.error('Error getting email details:', error);
    return null;
  }
};

export const generateSafetyReport = async () => {
  try {
    const threats = await fetchEmailThreats();
    
    const safeEmails = threats.filter(threat => threat.is_safe);
    const unsafeEmails = threats.filter(threat => !threat.is_safe);
    
    return {
      totalAnalyzed: threats.length,
      safeCount: safeEmails.length,
      unsafeCount: unsafeEmails.length,
      safePercentage: (safeEmails.length / threats.length) * 100,
      topThreats: Object.entries(
        unsafeEmails.reduce((acc, threat) => {
          acc[threat.threat] = (acc[threat.threat] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count })),
      topSafeDomainsCount: Object.entries(
        safeEmails.reduce((acc, email) => {
          const domain = email.sender.split('@')[1];
          acc[domain] = (acc[domain] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([domain, count]) => ({ domain, count })),
      recentSafeEmails: safeEmails
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
    };
  } catch (error) {
    console.error('Error generating safety report:', error);
    return null;
  }
};
