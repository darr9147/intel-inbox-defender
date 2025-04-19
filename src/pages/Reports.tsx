
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Download, FileText, Filter, AlertTriangle, Mail, CheckCircle, XCircle, Info, MapPin } from "lucide-react";

// Mock data for reports
const mockReports = [
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
  },
];

// Helper for severity badges
const getSeverityBadge = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return <span className="px-2 py-1 text-xs font-medium bg-red-900/70 text-red-200 rounded-full">Critical</span>;
    case 'high':
      return <span className="px-2 py-1 text-xs font-medium bg-orange-900/70 text-orange-200 rounded-full">High</span>;
    case 'medium':
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-900/70 text-yellow-200 rounded-full">Medium</span>;
    case 'low':
      return <span className="px-2 py-1 text-xs font-medium bg-green-900/70 text-green-200 rounded-full">Low</span>;
    default:
      return <span className="px-2 py-1 text-xs font-medium bg-blue-900/70 text-blue-200 rounded-full">{severity}</span>;
  }
};

// Helper for status badges
const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'blocked':
      return <span className="px-2 py-1 text-xs font-medium bg-red-900/70 text-red-200 rounded-full">Blocked</span>;
    case 'quarantined':
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-900/70 text-yellow-200 rounded-full">Quarantined</span>;
    case 'allowed':
      return <span className="px-2 py-1 text-xs font-medium bg-green-900/70 text-green-200 rounded-full">Allowed</span>;
    default:
      return <span className="px-2 py-1 text-xs font-medium bg-blue-900/70 text-blue-200 rounded-full">{status}</span>;
  }
};

// Helper for authentication indicators
const getAuthIndicator = (status: string) => {
  if (status.toLowerCase() === 'pass') {
    return <CheckCircle className="h-4 w-4 text-green-400" />;
  } else if (status.toLowerCase() === 'fail') {
    return <XCircle className="h-4 w-4 text-red-400" />;
  } else {
    return <Info className="h-4 w-4 text-gray-400" />;
  }
};

// Format date helper
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  
  // Filter states
  const [threatFilter, setThreatFilter] = useState<string>("all_threats");
  const [severityFilter, setSeverityFilter] = useState<string>("all_severities");
  const [dateFilter, setDateFilter] = useState<string>("all_time");
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleExport = (format: string) => {
    console.log(`Exporting in ${format} format`);
    // Export logic would go here
  };

  // Get selected report details
  const getReportDetails = () => {
    return mockReports.find(report => report.id === selectedReport);
  };

  const reportDetails = getReportDetails();

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Email Security Reports</h1>
            <p className="text-gray-400 mt-2">Detailed analysis of all detected email threats</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button 
              onClick={() => handleExport('pdf')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button 
              onClick={() => handleExport('csv')}
              variant="outline" 
              className="border-gray-600 text-gray-300"
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-gray-800 border border-gray-700 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filter Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search" className="text-gray-300">Search</Label>
                <Input
                  id="search"
                  placeholder="Search subjects, senders..."
                  className="bg-gray-700 border-gray-600 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="threat-type" className="text-gray-300">Threat Type</Label>
                <Select value={threatFilter} onValueChange={setThreatFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All threats" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="all_threats">All threats</SelectItem>
                    <SelectItem value="phishing">Phishing</SelectItem>
                    <SelectItem value="malware">Malware</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="bec">Business Email Compromise</SelectItem>
                    <SelectItem value="scam">Scam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="severity" className="text-gray-300">Severity</Label>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All severities" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="all_severities">All severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date" className="text-gray-300">Date Range</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="all_time">All time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 days</SelectItem>
                    <SelectItem value="month">Last 30 days</SelectItem>
                    <SelectItem value="quarter">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border border-gray-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Detected Threats</CardTitle>
              <CardDescription className="text-gray-400">
                {mockReports.length} reports found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Subject</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Sender</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Threat</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Severity</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReports.map((report) => (
                      <tr 
                        key={report.id} 
                        className={`border-b border-gray-700/50 cursor-pointer hover:bg-gray-700/30 ${selectedReport === report.id ? 'bg-gray-700/50' : ''}`}
                        onClick={() => setSelectedReport(report.id)}
                      >
                        <td className="py-3 px-4 text-gray-300">{formatDate(report.date)}</td>
                        <td className="py-3 px-4 text-white">{report.subject}</td>
                        <td className="py-3 px-4 text-gray-300">{report.sender}</td>
                        <td className="py-3 px-4 text-gray-300">{report.threat}</td>
                        <td className="py-3 px-4">{getSeverityBadge(report.severity)}</td>
                        <td className="py-3 px-4">{getStatusBadge(report.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Report Details */}
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Threat Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedReport && reportDetails ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-300 mb-2">Email Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subject:</span>
                        <span className="text-white">{reportDetails.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sender:</span>
                        <span className="text-white">{reportDetails.sender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white">{formatDate(reportDetails.date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span>{getStatusBadge(reportDetails.status)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-300 mb-2">Threat Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">{reportDetails.threat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Severity:</span>
                        <span>{getSeverityBadge(reportDetails.severity)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-300 mb-2">Sender Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">IP Address:</span>
                        <span className="text-white">{reportDetails.senderIP}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-red-400" />
                          {reportDetails.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-300 mb-2">Authentication</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">SPF:</span>
                        <span className="text-white flex items-center">
                          {getAuthIndicator(reportDetails.spf)}
                          <span className="ml-1">{reportDetails.spf}</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">DKIM:</span>
                        <span className="text-white flex items-center">
                          {getAuthIndicator(reportDetails.dkim)}
                          <span className="ml-1">{reportDetails.dkim}</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">DMARC:</span>
                        <span className="text-white flex items-center">
                          {getAuthIndicator(reportDetails.dmarc)}
                          <span className="ml-1">{reportDetails.dmarc}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Full Details
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-16 w-16 text-gray-600 mb-4" />
                  <p className="text-gray-400">Select a report to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
