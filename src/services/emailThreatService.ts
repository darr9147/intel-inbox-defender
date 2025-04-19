
import { supabase } from "@/integrations/supabase/client";
import { EmailThreat, EmailStatistics, EmailSafetyReport } from "@/types/email";
import { checkTableExists } from "@/utils/dbUtils";
import { mockEmailThreats } from "@/utils/mockEmailData";

export const fetchEmailThreats = async (
  filters?: {
    threatType?: string;
    severity?: string;
    dateRange?: string;
    searchQuery?: string;
  }
): Promise<EmailThreat[]> => {
  try {
    const tableExists = await checkTableExists('email_threats');
    
    if (!tableExists) {
      console.info('Email threats table not available, using mock data');
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
      return mockEmailThreats;
    }
    
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
    return mockEmailThreats;
  }
};

export const getThreatStatistics = async (): Promise<EmailStatistics> => {
  try {
    const threats = await fetchEmailThreats();
    
    const threatTypes = threats.reduce((acc, threat) => {
      const type = threat.threat === 'None' ? 'Safe' : threat.threat;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const countries = threats.reduce((acc, threat) => {
      acc[threat.country] = (acc[threat.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
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

export const generateSafetyReport = async (): Promise<EmailSafetyReport | null> => {
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
