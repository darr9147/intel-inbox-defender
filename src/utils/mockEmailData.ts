
import { EmailThreat } from "@/types/email";

export const mockEmailThreats: EmailThreat[] = [
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
