
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Mail, 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Info 
} from "lucide-react";
import { EmailThreat } from "@/services/emailService";

interface EmailDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: EmailThreat | null;
}

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

const getAuthIndicator = (status: string) => {
  if (status.toLowerCase() === 'pass') {
    return <CheckCircle className="h-4 w-4 text-green-400" />;
  } else if (status.toLowerCase() === 'fail') {
    return <XCircle className="h-4 w-4 text-red-400" />;
  } else {
    return <Info className="h-4 w-4 text-gray-400" />;
  }
};

const EmailDetailsModal: React.FC<EmailDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  report 
}) => {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            <Mail className="mr-2 h-5 w-5 text-blue-400" />
            Email Threat Details
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Detailed analysis of the detected threat
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="p-4 rounded-md bg-gray-700/50">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <Mail className="mr-2 h-5 w-5 text-blue-400" />
              Email Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Subject:</p>
                <p className="text-white font-medium">{report.subject}</p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">Sender:</p>
                <p className="text-white font-medium">{report.sender}</p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">Date:</p>
                <p className="text-white font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  {formatDate(report.date)}
                </p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">Status:</p>
                <div>{getStatusBadge(report.status)}</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-md bg-gray-700/50">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-400" />
              Threat Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Type:</p>
                <p className="text-white font-medium">{report.threat}</p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">Severity:</p>
                <div>{getSeverityBadge(report.severity)}</div>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">Risk Score:</p>
                <p className="text-white font-medium">{report.risk_score || 'N/A'}/100</p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">Safe to Open:</p>
                <p className="font-medium flex items-center">
                  {report.is_safe ? (
                    <><CheckCircle className="h-4 w-4 mr-1 text-green-400" /> Yes</>
                  ) : (
                    <><XCircle className="h-4 w-4 mr-1 text-red-400" /> No</>
                  )}
                </p>
              </div>
            </div>
            
            {report.risk_reasons && report.risk_reasons.length > 0 && (
              <div className="mt-4">
                <p className="text-gray-400 text-sm mb-2">Risk Factors:</p>
                <ul className="list-disc pl-5 text-white">
                  {report.risk_reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="p-4 rounded-md bg-gray-700/50">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-red-400" />
              Sender Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">IP Address:</p>
                <p className="text-white font-medium">{report.senderIP}</p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">Location:</p>
                <p className="text-white font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-red-400" />
                  {report.country}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-md bg-gray-700/50">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-blue-400" />
              Authentication
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-sm">SPF:</p>
                <p className="text-white font-medium flex items-center">
                  {getAuthIndicator(report.spf)}
                  <span className="ml-1">{report.spf}</span>
                </p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">DKIM:</p>
                <p className="text-white font-medium flex items-center">
                  {getAuthIndicator(report.dkim)}
                  <span className="ml-1">{report.dkim}</span>
                </p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">DMARC:</p>
                <p className="text-white font-medium flex items-center">
                  {getAuthIndicator(report.dmarc)}
                  <span className="ml-1">{report.dmarc}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDetailsModal;
