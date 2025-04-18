
import React from 'react';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
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
import { 
  FileText, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  ChevronRight, 
  BarChart, 
  Shield, 
  Search,
  Download
} from "lucide-react";

// Mock case studies data
const caseStudies = [
  {
    id: 1,
    title: "Anatomy of a Sophisticated Phishing Attack",
    excerpt: "A deep dive into a multi-stage phishing campaign that targeted a financial services company, including the technical details, attack timeline, and mitigation strategies.",
    date: "April 10, 2025",
    category: "Phishing",
    severity: "Critical",
    tags: ["spear-phishing", "credential-theft", "social-engineering"],
    impact: "Financial losses avoided: $1.2M",
    detection: "Detected by: Email authentication checks",
    image: "https://via.placeholder.com/600x400"
  },
  {
    id: 2,
    title: "Business Email Compromise: CEO Fraud Analysis",
    excerpt: "Analysis of a business email compromise attack where attackers impersonated the CEO to authorize fraudulent wire transfers to overseas accounts.",
    date: "March 28, 2025",
    category: "BEC",
    severity: "High",
    tags: ["impersonation", "wire-fraud", "executive-targeting"],
    impact: "Financial losses avoided: $850K",
    detection: "Detected by: Behavioral analysis",
    image: "https://via.placeholder.com/600x400"
  },
  {
    id: 3,
    title: "Malware Distribution via Macro-Enabled Documents",
    excerpt: "Detailed examination of a ransomware distribution campaign that used macro-enabled Microsoft Office documents to deploy payloads through targeted emails.",
    date: "March 15, 2025",
    category: "Malware",
    severity: "Critical",
    tags: ["ransomware", "macros", "document-analysis"],
    impact: "Protected systems: 230+",
    detection: "Detected by: Content scanning",
    image: "https://via.placeholder.com/600x400"
  },
  {
    id: 4,
    title: "Supply Chain Attack via Vendor Email Compromise",
    excerpt: "Case study of attackers who compromised a third-party vendor's email system to distribute malicious invoices to multiple customers in a coordinated supply chain attack.",
    date: "February 22, 2025",
    category: "Supply Chain",
    severity: "High",
    tags: ["vendor-fraud", "invoice-scam", "multi-target"],
    impact: "Organizations protected: 15",
    detection: "Detected by: Anomaly detection",
    image: "https://via.placeholder.com/600x400"
  },
  {
    id: 5,
    title: "Zero-Day Exploit in Email Attachment",
    excerpt: "Analysis of a targeted attack utilizing a previously unknown vulnerability in a PDF reader to deploy a backdoor through seemingly innocent email attachments.",
    date: "February 5, 2025",
    category: "Zero-Day",
    severity: "Critical",
    tags: ["zero-day", "targeted-attack", "pdf-exploit"],
    impact: "Protected organizations: 3 government agencies",
    detection: "Detected by: Sandboxing",
    image: "https://via.placeholder.com/600x400"
  },
  {
    id: 6,
    title: "Evasive Phishing Using Legitimate Cloud Services",
    excerpt: "Examination of an attack that leveraged legitimate cloud services to host phishing pages and bypass traditional security controls by hiding behind trusted domains.",
    date: "January 17, 2025",
    category: "Phishing",
    severity: "Medium",
    tags: ["cloud-phishing", "evasion-techniques", "brand-impersonation"],
    impact: "Credential theft attempts blocked: 1,200+",
    detection: "Detected by: URL analysis",
    image: "https://via.placeholder.com/600x400"
  }
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

// Featured case study (the first one)
const featuredCase = caseStudies[0];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Email Threat Case Studies</h1>
          <p className="text-gray-400 mt-2">In-depth analysis of real-world email threats and attack techniques</p>
        </div>

        {/* Featured Case Study */}
        <Card className="bg-gray-800 border border-gray-700 overflow-hidden mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 p-8">
              <div className="flex items-center mb-4 space-x-3">
                {getSeverityBadge(featuredCase.severity)}
                <span className="px-2 py-1 text-xs font-medium bg-gray-700 text-blue-300 rounded-full">{featuredCase.category}</span>
                <span className="text-gray-400 text-xs">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  {featuredCase.date}
                </span>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">{featuredCase.title}</h2>
              <p className="text-gray-300 mb-6">{featuredCase.excerpt}</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-green-400 text-sm font-medium">{featuredCase.impact}</p>
                </div>
                <div>
                  <p className="text-blue-400 text-sm font-medium">{featuredCase.detection}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {featuredCase.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Read Full Case Study <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="bg-gray-700 flex items-center justify-center p-8">
              <div className="text-center">
                <AlertTriangle className="h-20 w-20 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Featured Case Study</h3>
                <p className="text-gray-400">
                  A detailed breakdown of a sophisticated attack that evaded traditional security controls
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Case Studies Filters */}
        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="all" className="w-auto">
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 text-white">All</TabsTrigger>
              <TabsTrigger value="phishing" className="data-[state=active]:bg-blue-600 text-white">Phishing</TabsTrigger>
              <TabsTrigger value="malware" className="data-[state=active]:bg-blue-600 text-white">Malware</TabsTrigger>
              <TabsTrigger value="bec" className="data-[state=active]:bg-blue-600 text-white">BEC</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search case studies..." 
              className="pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {caseStudies.slice(1).map((study) => (
            <Card key={study.id} className="bg-gray-800 border border-gray-700 overflow-hidden flex flex-col">
              <div className="p-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2">
                    {getSeverityBadge(study.severity)}
                    <span className="px-2 py-1 text-xs font-medium bg-gray-700 text-blue-300 rounded-full">{study.category}</span>
                  </div>
                </div>
                <CardTitle className="text-white text-xl">{study.title}</CardTitle>
                <CardDescription className="text-gray-400 text-xs">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  {study.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">{study.excerpt}</p>
                <div>
                  <p className="text-green-400 text-xs font-medium">{study.impact}</p>
                  <p className="text-blue-400 text-xs font-medium mt-1">{study.detection}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-2">
                <div className="flex flex-wrap gap-1">
                  {study.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-0.5 bg-gray-700 text-gray-300 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                  {study.tags.length > 2 && (
                    <span className="px-2 py-0.5 bg-gray-700 text-gray-300 rounded-full text-xs">
                      +{study.tags.length - 2}
                    </span>
                  )}
                </div>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                  Read more <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Resource Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-blue-400" />
                Threat Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Gain insights into email threat trends based on our analysis of millions of emails.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Phishing attempts:</span>
                  <span className="text-white">65%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Malware distribution:</span>
                  <span className="text-white">22%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '22%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Business Email Compromise:</span>
                  <span className="text-white">8%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '8%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Other threats:</span>
                  <span className="text-white">5%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-transparent hover:bg-gray-700 border border-gray-600">
                View Full Statistics
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5 text-green-400" />
                Security Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Download our comprehensive guides and tools to enhance your email security posture.
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-left border-gray-600 text-gray-300">
                  <FileText className="mr-2 h-4 w-4 text-blue-400" />
                  Email Security Best Practices Guide
                  <Download className="ml-auto h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="w-full justify-start text-left border-gray-600 text-gray-300">
                  <FileText className="mr-2 h-4 w-4 text-blue-400" />
                  Phishing Response Playbook
                  <Download className="ml-auto h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="w-full justify-start text-left border-gray-600 text-gray-300">
                  <FileText className="mr-2 h-4 w-4 text-blue-400" />
                  Email Authentication Implementation Guide
                  <Download className="ml-auto h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="w-full justify-start text-left border-gray-600 text-gray-300">
                  <FileText className="mr-2 h-4 w-4 text-blue-400" />
                  Business Email Compromise Prevention
                  <Download className="ml-auto h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-transparent hover:bg-gray-700 border border-gray-600">
                View Resource Library
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Submit Your Case */}
        <Card className="bg-gray-800 border border-gray-700 mb-6">
          <div className="p-8 md:p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Submit Your Case for Analysis</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Have you encountered a sophisticated email threat? Our security researchers can analyze it and provide insights.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Submit a Case for Review
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CaseStudies;
