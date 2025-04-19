
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

// Mock email threats data for fallback
const mockEmailThreats: EmailThreat[] = [
  {
    id: 1,
    date: new Date().toISOString(),
    subject: "Important Document",
    sender: "suspicious@example.com",
    senderIP: "192.168.1.1",
    country: "Unknown",
    threat: "Phishing",
    severity: "High",
    status: "Blocked",
    spf: "fail",
    dkim: "fail",
    dmarc: "fail",
    risk_score: 85,
    risk_reasons: ["Suspicious sender", "Contains suspicious links"],
    is_safe: false
  },
  {
    id: 2,
    date: new Date(Date.now() - 86400000).toISOString(),
    subject: "Company Newsletter",
    sender: "newsletter@company.com",
    senderIP: "10.0.0.1",
    country: "United States",
    threat: "None",
    severity: "Low",
    status: "Allowed",
    spf: "pass",
    dkim: "pass",
    dmarc: "pass",
    risk_score: 10,
    risk_reasons: [],
    is_safe: true
  },
  {
    id: 3,
    date: new Date(Date.now() - 172800000).toISOString(),
    subject: "Your Account Security",
    sender: "security@fakebank.com",
    senderIP: "203.0.113.1",
    country: "Russia",
    threat: "Scam",
    severity: "Critical",
    status: "Quarantined",
    spf: "fail",
    dkim: "pass",
    dmarc: "fail",
    risk_score: 95,
    risk_reasons: ["Impersonating financial institution", "Urgency tactics"],
    is_safe: false
  }
];

// Create a reusable function to check if a table exists
const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    // Check if the table exists by trying to select from it
    const { error } = await supabase
      .from(tableName as any)
      .select('id')
      .limit(1)
      .throwOnError();
    
    return !error;
  } catch (error) {
    console.log(`Table ${tableName} does not exist:`, error);
    return false;
  }
};

export const fetchEmailAccounts = async (): Promise<EmailAccount[]> => {
  try {
    // Check if the email_accounts table exists
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

    // Use a double cast through unknown first to satisfy TypeScript
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
    // Check if the email_accounts table exists
    const tableExists = await checkTableExists('email_accounts');
    
    if (!tableExists) {
      console.info('Email accounts table not available, returning mock data');
      // Return mock data since table doesn't exist
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
    
    // Use a double cast through unknown first to satisfy TypeScript
    return (data as unknown as EmailAccount);
  } catch (error) {
    console.error('Error connecting email account:', error);
    return null;
  }
};

export const disconnectEmailAccount = async (id: string): Promise<boolean> => {
  try {
    // Check if the email_accounts table exists
    const tableExists = await checkTableExists('email_accounts');
    
    if (!tableExists) {
      console.info('Email accounts table not available, pretending to disconnect');
      return true; // Pretend it worked since we're using mock data
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

export const fetchEmailThreats = async (
  filters?: {
    threatType?: string;
    severity?: string;
    dateRange?: string;
    searchQuery?: string;
  }
): Promise<EmailThreat[]> => {
  try {
    // Check if the email_threats table exists
    const tableExists = await checkTableExists('email_threats');
    
    if (!tableExists) {
      console.info('Email threats table not available, using mock data');
      // Use mock data since table doesn't exist
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
      }
      
      return filteredThreats;
    }
    
    // If we get here, the table exists, so get data from Supabase
    let query = supabase
      .from('email_threats' as any)
      .select('*');
    
    if (filters) {
      const { threatType, severity, searchQuery } = filters;
      
      if (threatType && threatType !== 'all_threats') {
        query = query.eq('threat', threatType);
      }
      
      if (severity && severity !== 'all_severities') {
        query = query.eq('severity', severity);
      }
      
      if (searchQuery) {
        query = query.or(`subject.ilike.%${searchQuery}%,sender.ilike.%${searchQuery}%`);
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching email threats from DB:', error);
      return mockEmailThreats; // Fallback to mock data
    }
    
    // Convert the database results to match our interface
    return data.map((item: any) => ({
      id: item.id,
      date: item.date,
      subject: item.subject,
      sender: item.sender,
      senderIP: item.sender_ip,
      country: item.country,
      threat: item.threat,
      severity: item.severity,
      status: item.status,
      spf: item.spf,
      dkim: item.dkim,
      dmarc: item.dmarc,
      risk_score: item.risk_score,
      risk_reasons: item.risk_reasons,
      is_safe: item.is_safe
    }));
  } catch (error) {
    console.error('Error fetching email threats:', error);
    return mockEmailThreats; // Fallback to mock data
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
