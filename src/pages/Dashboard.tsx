
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Mail, AlertTriangle, Activity, FileText, Lock, Upload, BarChart, Globe, Calendar, DollarSign, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for charts
const mockThreatData = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 18 },
  { day: 'Wed', count: 15 },
  { day: 'Thu', count: 25 },
  { day: 'Fri', count: 20 },
  { day: 'Sat', count: 8 },
  { day: 'Sun', count: 10 },
];

// Mock data for suspicious domains
const suspiciousDomains = [
  { domain: "malicious-domain.com", threatCount: 15, type: "Phishing" },
  { domain: "fake-banking.net", threatCount: 8, type: "Phishing" },
  { domain: "malware-downloads.xyz", threatCount: 6, type: "Malware" },
  { domain: "suspicious-login.info", threatCount: 4, type: "Credential Theft" },
  { domain: "spam-newsletter.org", threatCount: 12, type: "Spam" },
];

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isConnectingEmail, setIsConnectingEmail] = useState(false);

  // Mock data for dashboard stats
  const stats = {
    emailsScanned: 0,
    threatsDetected: 0,
    protected: 0,
  };

  const handleConnectEmail = (provider: string) => {
    setIsConnectingEmail(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setIsConnectingEmail(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic
    console.log("Files:", e.target.files);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          {isAuthenticated ? (
            <p className="text-gray-400 mt-2">Welcome back, {user?.name}!</p>
          ) : (
            <p className="text-gray-400 mt-2">Sign in to access all features</p>
          )}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full bg-gray-800 border border-gray-700 mb-6">
            <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-blue-600 text-white">Overview</TabsTrigger>
            <TabsTrigger value="connect" className="flex-1 data-[state=active]:bg-blue-600 text-white">Connect Email</TabsTrigger>
            <TabsTrigger value="upload" className="flex-1 data-[state=active]:bg-blue-600 text-white">Upload Files</TabsTrigger>
            <TabsTrigger value="watchlist" className="flex-1 data-[state=active]:bg-blue-600 text-white">Watchlist</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center space-x-3">
                    <Mail className="h-6 w-6 text-blue-400" />
                    <span>Emails Scanned</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-white">{stats.emailsScanned}</p>
                  <p className="text-gray-400 text-sm mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center space-x-3">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                    <span>Threats Detected</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-white">{stats.threatsDetected}</p>
                  <p className="text-gray-400 text-sm mt-1">Last 30 days</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-green-400" />
                    <span>Protected</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-white">{stats.protected}</p>
                  <p className="text-gray-400 text-sm mt-1">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Trend Chart */}
            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-3">
                  <BarChart className="h-6 w-6 text-blue-400" />
                  <span>Weekly Detection Trends</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Threat detections over the past week
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                {stats.threatsDetected === 0 ? (
                  <div className="h-full flex items-center justify-center flex-col">
                    <Activity className="h-16 w-16 text-gray-600 mb-4" />
                    <p className="text-gray-400">No threat data available yet</p>
                    <p className="text-gray-500 text-sm">Connect your email to start monitoring</p>
                  </div>
                ) : (
                  <div className="h-full">
                    {/* This would be replaced with an actual chart component */}
                    <div className="h-full flex items-end justify-between">
                      {mockThreatData.map((item) => (
                        <div key={item.day} className="flex flex-col items-center w-full">
                          <div 
                            className="bg-blue-500 rounded-t-sm w-4/5" 
                            style={{ height: `${(item.count / 25) * 100}%` }}
                          ></div>
                          <p className="text-gray-400 text-xs mt-2">{item.day}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-3">
                  <Activity className="h-6 w-6 text-blue-400" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 rounded-md bg-gray-700/50">
                    <Activity className="h-6 w-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-white">No recent activity</h3>
                      <p className="text-gray-300">Connect your email to start monitoring threats</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connect" className="space-y-6">
            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Connect Your Email</CardTitle>
                <CardDescription className="text-gray-400">
                  Link your email accounts to enable continuous email threat monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => handleConnectEmail("gmail")}
                    disabled={isConnectingEmail} 
                    className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 h-16"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Connect Gmail</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleConnectEmail("outlook")}
                    disabled={isConnectingEmail}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 h-16"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Connect Outlook</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleConnectEmail("office365")}
                    disabled={isConnectingEmail}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 h-16"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Connect Microsoft 365</span>
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-white mb-4">Connected Accounts</h3>
                  
                  <div className="bg-gray-700/50 rounded-lg p-6 text-center">
                    <Lock className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No email accounts connected yet</p>
                    <p className="text-gray-500 text-sm mt-1">Connect an account to start monitoring</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Upload Email Files</CardTitle>
                <CardDescription className="text-gray-400">
                  Upload .eml or .msg files for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-lg p-10 text-center">
                  <Upload className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-white text-lg mb-2">Drag and drop email files</p>
                  <p className="text-gray-400 mb-4">or</p>
                  
                  <label htmlFor="file-upload">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Select files
                    </Button>
                    <Input 
                      id="file-upload" 
                      type="file" 
                      accept=".eml,.msg" 
                      multiple
                      onChange={handleFileUpload}
                      className="hidden" 
                    />
                  </label>
                  
                  <p className="text-gray-500 text-sm mt-4">
                    Supports .eml and .msg file formats
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="watchlist" className="space-y-6">
            <Card className="bg-gray-800 border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Suspicious Domain Watchlist</CardTitle>
                <CardDescription className="text-gray-400">
                  Domains or IPs with suspicious activity detected in your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                {suspiciousDomains.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Domain</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Threat Type</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Detections</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {suspiciousDomains.map((item, index) => (
                          <tr key={index} className="border-b border-gray-700/50">
                            <td className="py-3 px-4 text-white">{item.domain}</td>
                            <td className="py-3 px-4 text-gray-300">{item.type}</td>
                            <td className="py-3 px-4 text-gray-300">{item.threatCount}</td>
                            <td className="py-3 px-4 text-right">
                              <Button size="sm" variant="outline" className="text-gray-300 border-gray-600">
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-gray-700/50 rounded-lg p-6 text-center">
                    <Shield className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No suspicious domains detected yet</p>
                    <p className="text-gray-500 text-sm mt-1">Connect your email to start monitoring</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Access Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card className="bg-gray-800 border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <FileText className="h-8 w-8 text-blue-400 mb-3" />
                <h3 className="text-white font-medium">View Reports</h3>
                <p className="text-gray-400 text-sm mt-1">Detailed analysis of threats</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Globe className="h-8 w-8 text-blue-400 mb-3" />
                <h3 className="text-white font-medium">Threat Map</h3>
                <p className="text-gray-400 text-sm mt-1">Visualize threat sources</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Calendar className="h-8 w-8 text-blue-400 mb-3" />
                <h3 className="text-white font-medium">News & Updates</h3>
                <p className="text-gray-400 text-sm mt-1">Latest security insights</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Cpu className="h-8 w-8 text-blue-400 mb-3" />
                <h3 className="text-white font-medium">Case Studies</h3>
                <p className="text-gray-400 text-sm mt-1">Detailed threat analysis</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
