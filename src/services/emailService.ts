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

// Mock email accounts data
const mockEmailAccounts: EmailAccount[] = [
  {
    id: "1",
    provider: "gmail",
    email: "user@gmail.com",
    connected_at: new Date().toISOString()
  }
];

export const fetchEmailAccounts = async (): Promise<EmailAccount[]> => {
  // Return mock data instead of querying Supabase
  return [...mockEmailAccounts];
};

export const connectEmailAccount = async (
  provider: string,
  email: string
): Promise<EmailAccount | null> => {
  // Create a new mock account
  const newAccount: EmailAccount = {
    id: String(mockEmailAccounts.length + 1),
    provider,
    email,
    connected_at: new Date().toISOString()
  };
  
  // Add to mock data
  mockEmailAccounts.push(newAccount);
  
  return newAccount;
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
    // In a real app, this would fetch from the database
    // For this demo, we'll return simulated data
    
    // This simulates fetching from a database table
    // If you have real data in Supabase, you'd query that instead
    
    // Simulated data for demonstration
    const threats: EmailThreat[] = [
      {
        id: 1,
        date: '2025-04-15T10:30:00',
        subject: 'Your Account Security Alert',
        sender: 'security@fake-bank.com',
        senderIP: '192.168.1.1',
        country: 'Russia',
        threat: 'Phishing',
        severity: 'High',
        status: 'Blocked',
        spf: 'fail',
        dkim: 'fail',
        dmarc: 'fail',
        risk_score: 85,
        risk_reasons: ['Suspicious sender domain', 'Failed authentication'],
        is_safe: false
      },
      {
        id: 2,
        date: '2025-04-15T09:15:00',
        subject: 'Invoice #INV-4821 - Payment Required',
        sender: 'billing@supplier-scam.net',
        senderIP: '10.0.0.1',
        country: 'Nigeria',
        threat: 'Malware',
        severity: 'Critical',
        status: 'Quarantined',
        spf: 'pass',
        dkim: 'fail',
        dmarc: 'none',
        risk_score: 92,
        risk_reasons: ['Known malware pattern', 'Suspicious attachments'],
        is_safe: false
      },
      {
        id: 3,
        date: '2025-04-14T16:45:00',
        subject: 'Your Package Delivery Notification',
        sender: 'delivery@shipping-notice.co',
        senderIP: '172.16.0.1',
        country: 'China',
        threat: 'Spam',
        severity: 'Medium',
        status: 'Quarantined',
        spf: 'neutral',
        dkim: 'pass',
        dmarc: 'fail',
        risk_score: 65,
        risk_reasons: ['Mass mailing pattern', 'Suspicious links'],
        is_safe: false
      },
      {
        id: 4,
        date: '2025-04-14T11:20:00',
        subject: 'Urgent: Wire Transfer Required',
        sender: 'ceo@company-spoofed.org',
        senderIP: '169.254.0.1',
        country: 'Ukraine',
        threat: 'Business Email Compromise',
        severity: 'Critical',
        status: 'Blocked',
        spf: 'fail',
        dkim: 'fail',
        dmarc: 'fail',
        risk_score: 95,
        risk_reasons: ['Executive impersonation', 'Urgent action request'],
        is_safe: false
      },
      {
        id: 5,
        date: '2025-04-13T14:30:00',
        subject: 'Win a Free iPhone 15 - Claim Now',
        sender: 'prize@sweepstakes-winner.info',
        senderIP: '203.0.113.1',
        country: 'Romania',
        threat: 'Scam',
        severity: 'Medium',
        status: 'Quarantined',
        spf: 'pass',
        dkim: 'fail',
        dmarc: 'none',
        risk_score: 70,
        risk_reasons: ['Prize scam indicators', 'Suspicious domain age'],
        is_safe: false
      },
      {
        id: 6,
        date: '2025-04-12T09:30:00',
        subject: 'Monthly Newsletter - April 2025',
        sender: 'news@legitimate-company.com',
        senderIP: '192.0.2.1',
        country: 'United States',
        threat: 'None',
        severity: 'Low',
        status: 'Allowed',
        spf: 'pass',
        dkim: 'pass',
        dmarc: 'pass',
        risk_score: 15,
        risk_reasons: [],
        is_safe: true
      },
      {
        id: 7,
        date: '2025-04-11T15:45:00',
        subject: 'Your Account Statement - April 2025',
        sender: 'statements@realbank.com',
        senderIP: '198.51.100.1',
        country: 'United States',
        threat: 'None',
        severity: 'Low',
        status: 'Allowed',
        spf: 'pass',
        dkim: 'pass',
        dmarc: 'pass',
        risk_score: 12,
        risk_reasons: [],
        is_safe: true
      },
      {
        id: 8,
        date: '2025-04-10T11:20:00',
        subject: 'Team Meeting - Tomorrow at 10 AM',
        sender: 'colleague@company.com',
        senderIP: '203.0.113.1',
        country: 'United States',
        threat: 'None',
        severity: 'Low',
        status: 'Allowed',
        spf: 'pass',
        dkim: 'pass',
        dmarc: 'pass',
        risk_score: 5,
        risk_reasons: [],
        is_safe: true
      }
    ];
    
    // Apply filters
    let filteredThreats = [...threats];
    
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
