
import { Button } from "@/components/ui/button";
import { Shield, Mail, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Email Security Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Emails Scanned</h3>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Protected</h3>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Threats Detected</h3>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>
        </div>

        {/* Connect Email Section */}
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Connect Your Email</h2>
          <p className="text-gray-300 mb-6">
            Get started by connecting your email account to enable AI-powered threat detection.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Connect Gmail
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Connect Outlook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
