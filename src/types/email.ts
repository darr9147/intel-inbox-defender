
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

export interface EmailAccount {
  id: string;
  provider: string;
  email: string;
  connected_at: string;
}

export interface EmailStatistics {
  threatTypes: Record<string, number>;
  countries: Record<string, number>;
  severities: Record<string, number>;
  totalEmails: number;
  safeEmails: number;
  threateningEmails: number;
}

export interface EmailSafetyReport {
  totalAnalyzed: number;
  safeCount: number;
  unsafeCount: number;
  safePercentage: number;
  topThreats: Array<{ name: string; count: number }>;
  topSafeDomainsCount: Array<{ domain: string; count: number }>;
  recentSafeEmails: EmailThreat[];
}
