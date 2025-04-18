
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
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Switch
} from "@/components/ui/switch";
import { 
  User, 
  Mail, 
  Lock, 
  Key, 
  Bell, 
  Shield, 
  CreditCard,
  FileText,
  AlertTriangle,
  Check,
  X,
  Mail as MailIcon
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // API key states
  const [apiKey, setApiKey] = useState("sk_test_example123456789012345678901234567890");
  const [showApiKey, setShowApiKey] = useState(false);
  
  // Connected accounts
  const connectedAccounts = [
    { provider: "Google", email: "user@gmail.com", connected: true },
    { provider: "Microsoft", email: "user@outlook.com", connected: false },
    { provider: "Microsoft 365", email: null, connected: false },
  ];
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    weeklyDigests: true,
    criticalThreats: true,
    productUpdates: false,
    marketingEmails: false
  });
  
  const toggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };
  
  // Handle password update
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  // Handle API key regeneration
  const handleRegenerateApiKey = () => {
    // Mock API key generation
    const newKey = `sk_test_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    
    toast({
      title: "API key regenerated",
      description: "Your new API key has been generated. Make sure to save it.",
      variant: "default"
    });
  };
  
  // Handle notification settings update
  const handleNotificationUpdate = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved."
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          <p className="text-gray-400 mt-2">Manage your profile, security, and preferences</p>
        </div>
        
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-800 rounded-lg border border-gray-700">
            <Lock className="h-16 w-16 text-gray-600 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
            <p className="text-gray-400 text-center max-w-md mb-6">
              You need to be logged in to access your profile settings.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Log In
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full bg-gray-800 border border-gray-700 mb-6">
              <TabsTrigger value="profile" className="flex-1 data-[state=active]:bg-blue-600 text-white">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="flex-1 data-[state=active]:bg-blue-600 text-white">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="api" className="flex-1 data-[state=active]:bg-blue-600 text-white">
                <Key className="h-4 w-4 mr-2" />
                API Access
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex-1 data-[state=active]:bg-blue-600 text-white">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-gray-800 border border-gray-700 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your account profile details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate}>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-500" />
                            </div>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="pl-10 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-500" />
                            </div>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-10 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Connected Email Accounts</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your linked email accounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {connectedAccounts.map((account, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <MailIcon className="h-5 w-5 text-gray-500 mr-3" />
                            <div>
                              <p className="text-white font-medium">{account.provider}</p>
                              {account.email ? (
                                <p className="text-gray-400 text-sm">{account.email}</p>
                              ) : (
                                <p className="text-gray-500 text-sm">Not connected</p>
                              )}
                            </div>
                          </div>
                          <Button
                            variant={account.connected ? "destructive" : "outline"}
                            size="sm"
                          >
                            {account.connected ? "Disconnect" : "Connect"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between border-t border-gray-700 pt-6">
                    <p className="text-gray-400 text-sm">Connect additional email accounts to monitor</p>
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                      Manage connections
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-gray-800 border border-gray-700 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white">Change Password</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your account password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordUpdate}>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="current-password" className="text-gray-300">Current Password</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-500" />
                            </div>
                            <Input
                              id="current-password"
                              type="password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="pl-10 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-500" />
                            </div>
                            <Input
                              id="new-password"
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="pl-10 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password" className="text-gray-300">Confirm New Password</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-500" />
                            </div>
                            <Input
                              id="confirm-password"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="pl-10 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            Update Password
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Security Settings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage additional security features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-white">Two-Factor Authentication</p>
                            <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                          </div>
                          <Button variant="outline" className="border-gray-600 text-white">Enable</Button>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-white">Active Sessions</p>
                            <p className="text-gray-400 text-sm">Manage your active login sessions</p>
                          </div>
                          <Button variant="outline" className="border-gray-600 text-white">View</Button>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-white">Account Activity Log</p>
                            <p className="text-gray-400 text-sm">View recent account activity</p>
                          </div>
                          <Button variant="outline" className="border-gray-600 text-white">View Log</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="api">
              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">API Key Management</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your API keys for programmatic access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="api-key" className="text-gray-300">Your API Key</Label>
                      <div className="flex">
                        <div className="relative flex-grow">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-500" />
                          </div>
                          <Input
                            id="api-key"
                            type={showApiKey ? "text" : "password"}
                            value={apiKey}
                            readOnly
                            className="pl-10 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="ml-2 border-gray-600 text-white"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? "Hide" : "Show"}
                        </Button>
                      </div>
                      <p className="text-gray-500 text-sm">
                        This key provides full access to your account via the API. Keep it secret!
                      </p>
                    </div>
                    
                    <div className="bg-yellow-900/20 border border-yellow-900/30 rounded-md p-4 flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-yellow-300 font-medium">Security Notice</p>
                        <p className="text-yellow-200/70 text-sm">
                          Regenerating your API key will invalidate your existing key. Any applications or scripts using the old key will need to be updated.
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        type="button"
                        onClick={handleRegenerateApiKey}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Regenerate API Key
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border border-gray-700 mt-6">
                <CardHeader>
                  <CardTitle className="text-white">API Usage</CardTitle>
                  <CardDescription className="text-gray-400">
                    View your API usage statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-gray-700/30 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <p className="text-gray-400 text-sm">Total Requests</p>
                          <p className="text-3xl font-bold text-white mt-1">0</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400 text-sm">Rate Limit</p>
                          <p className="text-3xl font-bold text-white mt-1">1,000/day</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400 text-sm">Remaining</p>
                          <p className="text-3xl font-bold text-white mt-1">1,000</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-4">Recent API Requests</h3>
                      <div className="bg-gray-700/30 rounded-lg p-6 text-center">
                        <FileText className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">No API requests have been made yet</p>
                        <p className="text-gray-500 text-sm mt-2">API usage will appear here once you start making requests</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="outline" className="w-full border-gray-600 text-white">
                        View API Documentation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="bg-gray-800 border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Notification Preferences</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-white">Real-time threat alerts</p>
                            <p className="text-gray-400 text-sm">Receive immediate alerts for detected threats</p>
                          </div>
                          <Switch
                            checked={notificationSettings.emailAlerts}
                            onCheckedChange={() => toggleNotification('emailAlerts')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-white">Weekly security digest</p>
                            <p className="text-gray-400 text-sm">Summary of all activity from the past week</p>
                          </div>
                          <Switch
                            checked={notificationSettings.weeklyDigests}
                            onCheckedChange={() => toggleNotification('weeklyDigests')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-white">Critical severity only</p>
                            <p className="text-gray-400 text-sm">Only notify for critical-rated threats</p>
                          </div>
                          <Switch
                            checked={notificationSettings.criticalThreats}
                            onCheckedChange={() => toggleNotification('criticalThreats')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-white">Product updates</p>
                            <p className="text-gray-400 text-sm">New features and improvements</p>
                          </div>
                          <Switch
                            checked={notificationSettings.productUpdates}
                            onCheckedChange={() => toggleNotification('productUpdates')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-white">Marketing communications</p>
                            <p className="text-gray-400 text-sm">Promotional offers and news</p>
                          </div>
                          <Switch
                            checked={notificationSettings.marketingEmails}
                            onCheckedChange={() => toggleNotification('marketingEmails')}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-700">
                      <h3 className="text-white font-medium mb-4">Threat Severity Threshold</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="all-threats"
                            name="threat-threshold"
                            defaultChecked
                            className="text-blue-600 focus:ring-blue-500 h-4 w-4 bg-gray-700 border-gray-600"
                          />
                          <Label htmlFor="all-threats" className="text-gray-300">All threats (Low and above)</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="medium-threats"
                            name="threat-threshold"
                            className="text-blue-600 focus:ring-blue-500 h-4 w-4 bg-gray-700 border-gray-600"
                          />
                          <Label htmlFor="medium-threats" className="text-gray-300">Medium and above</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="high-threats"
                            name="threat-threshold"
                            className="text-blue-600 focus:ring-blue-500 h-4 w-4 bg-gray-700 border-gray-600"
                          />
                          <Label htmlFor="high-threats" className="text-gray-300">High and Critical only</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="critical-threats"
                            name="threat-threshold"
                            className="text-blue-600 focus:ring-blue-500 h-4 w-4 bg-gray-700 border-gray-600"
                          />
                          <Label htmlFor="critical-threats" className="text-gray-300">Critical threats only</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <Button
                        type="button"
                        onClick={handleNotificationUpdate}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Save Notification Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
