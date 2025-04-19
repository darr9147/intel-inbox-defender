
import { useState, useEffect } from "react";
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
import ConnectEmailModal from "@/components/ConnectEmailModal";
import { fetchEmailAccounts, fetchEmailThreats, getThreatStatistics } from "@/services/emailService";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [emailAccounts, setEmailAccounts] = useState<any[]>([]);
  const [emailThreats, setEmailThreats] = useState<any[]>([]);
  const [threatStats, setThreatStats] = useState({
    emailsScanned: 0,
    threatsDetected: 0,
    protected: 0,
    weeklyData: [] as {day: string, count: number}[]
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Load email accounts
        const accounts = await fetchEmailAccounts();
        setEmailAccounts(accounts);
        
        // Load email threats
        const threats = await fetchEmailThreats();
        setEmailThreats(threats);
        
        // Calculate statistics
        const stats = await getThreatStatistics();
        
        // Prepare weekly data
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const weeklyData = days.map(day => {
          // Generate random counts for the demo
          const randomCount = Math.floor(Math.random() * 20);
          return { day, count: randomCount };
        });
        
        setThreatStats({
          emailsScanned: threats.length,
          threatsDetected: threats.filter(t => !t.is_safe).length,
          protected: threats.filter(t => t.status === "Blocked").length,
          weeklyData
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  const handleConnectEmail = () => {
    setIsConnectModalOpen(true);
  };

  const handleConnectSuccess = async () => {
    // Reload email accounts after successful connection
    const accounts = await fetchEmailAccounts();
    setEmailAccounts(accounts);
    
    // Reload threats to include any newly analyzed emails
    const threats = await fetchEmailThreats();
    setEmailThreats(threats);
    
    // Update stats
    setThreatStats(prev => ({
      ...prev,
      emailsScanned: threats.length,
      threatsDetected: threats.filter(t => !t.is_safe).length,
      protected: threats.filter(t => t.status === "Blocked").length,
    }));
    
    toast({
      title: "Email Connected",
      description: "Your email has been successfully connected and analyzed",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic
    toast({
      title: "File Upload",
      description: "File upload feature will be implemented in a future update",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          {isAuthenticated ? (
            <p className="text-gray-400 mt-2">Welcome back, {user?.user_metadata?.name || "User"}!</p>
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
                  <p className="text-4xl font-bold text-white">{threatStats.emailsScanned}</p>
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
                  <p className="text-4xl font-bold text-white">{threatStats.threatsDetected}</p>
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
                  <p className="text-4xl font-bold text-white">{threatStats.protected}</p>
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
                {threatStats.emailsScanned === 0 ? (
                  <div className="h-full flex items-center justify-center flex-col">
                    <Activity className="h-16 w-16 text-gray-600 mb-4" />
                    <p className="text-gray-400">No threat data available yet</p>
                    <p className="text-gray-500 text-sm">Connect your email to start monitoring</p>
                  </div>
                ) : (
                  <div className="h-full">
                    <div className="h-full flex items-end justify-between">
                      {threatStats.weeklyData.map((item) => (
                        <div key={item.day} className="flex flex-col items-center w-full">
                          <div 
                            className="bg-blue-500 rounded-t-sm w-4/5" 
                            style={{ height: `${(item.count / 20) * 100}%` }}
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
                {emailThreats.length > 0 ? (
                  <div className="space-y-4">
                    {emailThreats.slice(0, 3).map((threat, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-md bg-gray-700/50">
                        {threat.is_safe ? (
                          <Shield className="h-6 w-6 text-green-400 mt-1" />
                        ) : (
                          <AlertTriangle className="h-6 w-6 text-red-400 mt-1" />
                        )}
                        <div>
                          <h3 className="text-lg font-medium text-white">{threat.subject}</h3>
                          <p className="text-gray-300">{threat.sender}</p>
                          <div className="flex gap-2 mt-1">
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              threat.severity === 'Critical' ? 'bg-red-900/70 text-red-200' :
                              threat.severity === 'High' ? 'bg-orange-900/70 text-orange-200' :
                              threat.severity === 'Medium' ? 'bg-yellow-900/70 text-yellow-200' :
                              'bg-green-900/70 text-green-200'
                            }`}>
                              {threat.severity}
                            </span>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              threat.status === 'Blocked' ? 'bg-red-900/70 text-red-200' :
                              threat.status === 'Quarantined' ? 'bg-yellow-900/70 text-yellow-200' :
                              'bg-green-900/70 text-green-200'
                            }`}>
                              {threat.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="text-center">
                      <Button variant="link" className="text-blue-400">
                        View all in Reports
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-4 p-4 rounded-md bg-gray-700/50">
                    <Activity className="h-6 w-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="text-lg font-medium text-white">No recent activity</h3>
                      <p className="text-gray-300">Connect your email to start monitoring threats</p>
                    </div>
                  </div>
                )}
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
                    onClick={handleConnectEmail}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 h-16"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Connect Gmail</span>
                  </Button>
                  
                  <Button 
                    onClick={handleConnectEmail}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 h-16"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Connect Outlook</span>
                  </Button>
                  
                  <Button 
                    onClick={handleConnectEmail}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 h-16"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Connect Microsoft 365</span>
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-white mb-4">Connected Accounts</h3>
                  
                  {emailAccounts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {emailAccounts.map((account, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-700/50 rounded-lg p-4 flex items-center space-x-3"
                        >
                          <Mail className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="text-white font-medium">{account.email}</p>
                            <p className="text-gray-400 text-sm">Connected via {account.provider}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg p-6 text-center">
                      <Lock className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400">No email accounts connected yet</p>
                      <p className="text-gray-500 text-sm mt-1">Connect an account to start monitoring</p>
                    </div>
                  )}
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
                {emailThreats.length > 0 ? (
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
                        {emailThreats
                          .filter(threat => !threat.is_safe)
                          .slice(0, 5)
                          .map((threat, index) => {
                            const domain = threat.sender.split('@')[1] || 'unknown';
                            return (
                              <tr key={index} className="border-b border-gray-700/50">
                                <td className="py-3 px-4 text-white">{domain}</td>
                                <td className="py-3 px-4 text-gray-300">{threat.threat}</td>
                                <td className="py-3 px-4 text-gray-300">1</td>
                                <td className="py-3 px-4 text-right">
                                  <Button size="sm" variant="outline" className="text-gray-300 border-gray-600">
                                    Details
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
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
          <a href="/reports">
            <Card className="bg-gray-800 border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <FileText className="h-8 w-8 text-blue-400 mb-3" />
                  <h3 className="text-white font-medium">View Reports</h3>
                  <p className="text-gray-400 text-sm mt-1">Detailed analysis of threats</p>
                </div>
              </CardContent>
            </Card>
          </a>
          
          <a href="/threat-map">
            <Card className="bg-gray-800 border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Globe className="h-8 w-8 text-blue-400 mb-3" />
                  <h3 className="text-white font-medium">Threat Map</h3>
                  <p className="text-gray-400 text-sm mt-1">Visualize threat sources</p>
                </div>
              </CardContent>
            </Card>
          </a>
          
          <a href="/news">
            <Card className="bg-gray-800 border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="h-8 w-8 text-blue-400 mb-3" />
                  <h3 className="text-white font-medium">News & Updates</h3>
                  <p className="text-gray-400 text-sm mt-1">Latest security insights</p>
                </div>
              </CardContent>
            </Card>
          </a>
          
          <a href="/case-studies">
            <Card className="bg-gray-800 border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Cpu className="h-8 w-8 text-blue-400 mb-3" />
                  <h3 className="text-white font-medium">Case Studies</h3>
                  <p className="text-gray-400 text-sm mt-1">Detailed threat analysis</p>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>

      {/* Connect Email Modal */}
      <ConnectEmailModal 
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onSuccess={handleConnectSuccess}
      />
    </div>
  );
};

export default Dashboard;
