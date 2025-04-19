
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, CheckCircle, Download } from "lucide-react";
import { generateSafetyReport } from '@/services/emailService';

interface SafetyReportData {
  totalAnalyzed: number;
  safeCount: number;
  unsafeCount: number;
  safePercentage: number;
  topThreats: { name: string; count: number }[];
  topSafeDomainsCount: { domain: string; count: number }[];
  recentSafeEmails: any[];
}

const EmailSafetyReport: React.FC = () => {
  const [reportData, setReportData] = useState<SafetyReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      const data = await generateSafetyReport();
      setReportData(data);
      setLoading(false);
    };

    fetchReport();
  }, []);

  const handleExportReport = () => {
    if (!reportData) return;
    
    // Create a text representation of the report
    const reportText = `
Email Safety Report
==================
Generated: ${new Date().toLocaleString()}

Summary
-------
Total Emails Analyzed: ${reportData.totalAnalyzed}
Safe Emails: ${reportData.safeCount} (${reportData.safePercentage.toFixed(1)}%)
Unsafe Emails: ${reportData.unsafeCount}

Top Threats
----------
${reportData.topThreats.map((t, i) => `${i + 1}. ${t.name}: ${t.count} occurrences`).join('\n')}

Top Safe Domains
--------------
${reportData.topSafeDomainsCount.map((d, i) => `${i + 1}. ${d.domain}: ${d.count} emails`).join('\n')}
`;

    // Create a blob and download
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-safety-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Card className="bg-gray-800 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="mr-2 h-5 w-5 text-green-400" />
            Email Safety Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center p-8">
            <div className="animate-pulse h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!reportData) {
    return (
      <Card className="bg-gray-800 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="mr-2 h-5 w-5 text-green-400" />
            Email Safety Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center p-8 text-gray-400">
            No report data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white flex items-center">
          <Shield className="mr-2 h-5 w-5 text-green-400" />
          Email Safety Report
        </CardTitle>
        <Button 
          onClick={handleExportReport}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-md bg-gray-700/50 flex flex-col items-center justify-center">
              <Mail className="h-8 w-8 text-blue-400 mb-2" />
              <p className="text-sm text-gray-400">Total Analyzed</p>
              <p className="text-2xl font-bold text-white">{reportData.totalAnalyzed}</p>
            </div>
            
            <div className="p-4 rounded-md bg-gray-700/50 flex flex-col items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
              <p className="text-sm text-gray-400">Safe Emails</p>
              <p className="text-2xl font-bold text-white">{reportData.safeCount}</p>
              <p className="text-sm text-gray-400">({reportData.safePercentage.toFixed(1)}%)</p>
            </div>
            
            <div className="p-4 rounded-md bg-gray-700/50 flex flex-col items-center justify-center">
              <Shield className="h-8 w-8 text-red-400 mb-2" />
              <p className="text-sm text-gray-400">Unsafe Emails</p>
              <p className="text-2xl font-bold text-white">{reportData.unsafeCount}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Threats */}
            <div>
              <h3 className="text-md font-medium text-gray-300 mb-2">Top Threats</h3>
              <div className="space-y-2">
                {reportData.topThreats.map((threat, idx) => (
                  <div key={idx} className="flex justify-between p-2 bg-gray-700/30 rounded">
                    <span className="text-white">{threat.name}</span>
                    <span className="text-gray-400">{threat.count} emails</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Safe Domains */}
            <div>
              <h3 className="text-md font-medium text-gray-300 mb-2">Top Safe Domains</h3>
              <div className="space-y-2">
                {reportData.topSafeDomainsCount.map((domain, idx) => (
                  <div key={idx} className="flex justify-between p-2 bg-gray-700/30 rounded">
                    <span className="text-white">{domain.domain}</span>
                    <span className="text-gray-400">{domain.count} emails</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recent Safe Emails */}
          <div>
            <h3 className="text-md font-medium text-gray-300 mb-2">Recent Safe Emails</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {reportData.recentSafeEmails.map((email, idx) => (
                <div key={idx} className="p-2 bg-gray-700/30 rounded">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">{email.subject}</span>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-400">{email.sender}</span>
                    <span className="text-gray-400">{new Date(email.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailSafetyReport;
