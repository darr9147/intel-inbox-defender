
import React, { useState, useEffect } from 'react';
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
import { PlusCircle, Download, FileText, Filter, AlertTriangle, Mail, MapPin } from "lucide-react";
import ConnectEmailModal from "@/components/ConnectEmailModal";
import EmailThreatChart from "@/components/EmailThreatChart";
import GeoThreatDistribution from "@/components/GeoThreatDistribution";
import EmailDetailsModal from "@/components/EmailDetailsModal";
import EmailSafetyReport from "@/components/EmailSafetyReport";
import { fetchEmailThreats, fetchEmailAccounts, getThreatStatistics, getEmailDetails, EmailThreat } from "@/services/emailService";
import { useToast } from "@/components/ui/use-toast";

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
  const [emailThreatData, setEmailThreatData] = useState<EmailThreat[]>([]);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [detailedReport, setDetailedReport] = useState<EmailThreat | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    threatTypes: [],
    countries: []
  });
  
  // Filter states
  const [threatFilter, setThreatFilter] = useState<string>("all_threats");
  const [severityFilter, setSeverityFilter] = useState<string>("all_severities");
  const [dateFilter, setDateFilter] = useState<string>("all_time");
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load email accounts
        const accounts = await fetchEmailAccounts();
        setConnectedAccounts(accounts);
        
        // Load email threats
        const threats = await fetchEmailThreats({
          threatType: threatFilter !== "all_threats" ? threatFilter : undefined,
          severity: severityFilter !== "all_severities" ? severityFilter : undefined,
          dateRange: dateFilter !== "all_time" ? dateFilter : undefined,
          searchQuery: searchQuery || undefined
        });
        setEmailThreatData(threats);
        
        // Load statistics for charts
        const stats = await getThreatStatistics();
        
        // Format data for charts
        const threatChartData = Object.entries(stats.threatTypes).map(([name, count]) => {
          let color;
          switch(name.toLowerCase()) {
            case 'phishing': color = '#ff4d4f'; break;
            case 'malware': color = '#722ed1'; break;
            case 'spam': color = '#faad14'; break;
            case 'business email compromise': color = '#eb2f96'; break;
            case 'scam': color = '#fa541c'; break;
            case 'safe': color = '#52c41a'; break;
            case 'none': color = '#52c41a'; break;
            default: color = '#1890ff';
          }
          return { name, count, color };
        });
        
        const countryChartData = Object.entries(stats.countries).map(([name, value]) => {
          const colors = ['#1890ff', '#52c41a', '#fa541c', '#722ed1', '#faad14', '#eb2f96', '#ff4d4f'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return { name, value, color };
        });
        
        setChartData({
          threatTypes: threatChartData,
          countries: countryChartData
        });
        
        // If there are threats and no report is selected, select the first one
        if (threats.length > 0 && !selectedReport) {
          setSelectedReport(threats[0].id);
          const detail = await getEmailDetails(threats[0].id);
          if (detail) setDetailedReport(detail);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error",
          description: "Failed to load report data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [threatFilter, severityFilter, dateFilter, searchQuery]);

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Exporting report in ${format.toUpperCase()} format`
    });
    
    // In a real app, this would trigger an actual download
    console.log(`Exporting in ${format} format`);
  };

  const handleViewDetails = async (id: number) => {
    try {
      const report = await getEmailDetails(id);
      if (report) {
        setDetailedReport(report);
        setIsDetailsModalOpen(true);
      }
    } catch (error) {
      console.error("Error getting report details:", error);
      toast({
        title: "Error",
        description: "Failed to load report details",
        variant: "destructive"
      });
    }
  };

  const handleConnectSuccess = () => {
    toast({
      title: "Email Connected",
      description: "Your email account has been successfully connected"
    });
    
    // Refresh connected accounts
    fetchEmailAccounts().then(accounts => {
      setConnectedAccounts(accounts);
    });
  };

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
              onClick={() => setIsConnectModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Connect Email
            </Button>
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

        {/* Connected Accounts */}
        <Card className="bg-gray-800 border border-gray-700 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Connected Email Accounts
            </CardTitle>
            <CardDescription className="text-gray-400">
              {connectedAccounts.length} account(s) connected for monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {connectedAccounts.length > 0 ? (
                connectedAccounts.map((account, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-3 bg-gray-700/50 rounded-md border border-gray-700"
                  >
                    <Mail className="h-5 w-5 text-blue-400 mr-3" />
                    <div>
                      <p className="text-white font-medium">{account.email}</p>
                      <p className="text-sm text-gray-400">{account.provider}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-6 text-gray-400">
                  <Mail className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                  <p>No email accounts connected yet</p>
                  <p className="text-sm mt-1">Click "Connect Email" to start monitoring</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Threat Types</CardTitle>
              <CardDescription className="text-gray-400">
                Distribution of email threats by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailThreatChart data={chartData.threatTypes} />
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Geographical Distribution</CardTitle>
              <CardDescription className="text-gray-400">
                Source countries of detected threats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GeoThreatDistribution data={chartData.countries} />
            </CardContent>
          </Card>
        </div>

        {/* Email Safety Report */}
        <div className="mb-6">
          <EmailSafetyReport />
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
                    <SelectItem value="business email compromise">Business Email Compromise</SelectItem>
                    <SelectItem value="scam">Scam</SelectItem>
                    <SelectItem value="none">Safe</SelectItem>
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
                {emailThreatData.length} reports found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-12 bg-gray-700 rounded"></div>
                  ))}
                </div>
              ) : emailThreatData.length > 0 ? (
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
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emailThreatData.map((report) => (
                        <tr 
                          key={report.id} 
                          className={`border-b border-gray-700/50 cursor-pointer hover:bg-gray-700/30 ${selectedReport === report.id ? 'bg-gray-700/50' : ''}`}
                          onClick={() => {
                            setSelectedReport(report.id);
                            getEmailDetails(report.id).then(detail => {
                              if (detail) setDetailedReport(detail);
                            });
                          }}
                        >
                          <td className="py-3 px-4 text-gray-300">{formatDate(report.date)}</td>
                          <td className="py-3 px-4 text-white">{report.subject}</td>
                          <td className="py-3 px-4 text-gray-300">{report.sender}</td>
                          <td className="py-3 px-4 text-gray-300">{report.threat}</td>
                          <td className="py-3 px-4">{getSeverityBadge(report.severity)}</td>
                          <td className="py-3 px-4">{getStatusBadge(report.status)}</td>
                          <td className="py-3 px-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-blue-400 border-blue-500/30 hover:bg-blue-500/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(report.id);
                              }}
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <AlertTriangle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p>No threat data available</p>
                  <p className="text-sm mt-1">Try adjusting your filters or connect an email account</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Report Details */}
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Threat Details</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  <div className="h-24 bg-gray-700 rounded"></div>
                  <div className="h-12 bg-gray-700 rounded"></div>
                </div>
              ) : selectedReport && detailedReport ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-300 mb-2">Email Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subject:</span>
                        <span className="text-white">{detailedReport.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sender:</span>
                        <span className="text-white">{detailedReport.sender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white">{formatDate(detailedReport.date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span>{getStatusBadge(detailedReport.status)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-300 mb-2">Threat Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">{detailedReport.threat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Severity:</span>
                        <span>{getSeverityBadge(detailedReport.severity)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk Score:</span>
                        <span className="text-white">{detailedReport.risk_score || 'N/A'}/100</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-300 mb-2">Sender Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">IP Address:</span>
                        <span className="text-white">{detailedReport.senderIP}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-red-400" />
                          {detailedReport.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleViewDetails(detailedReport.id)}
                    >
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
      
      {/* Connect Email Modal */}
      <ConnectEmailModal 
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onSuccess={handleConnectSuccess}
      />
      
      {/* Email Details Modal */}
      <EmailDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        report={detailedReport}
      />
    </div>
  );
};

export default Reports;
