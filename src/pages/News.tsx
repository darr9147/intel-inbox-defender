
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
  Newspaper, 
  BookOpen, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  ChevronRight,
  ArrowRight,
  User,
  Clock
} from "lucide-react";

// Mock news data
const newsArticles = [
  {
    id: 1,
    title: "New Phishing Campaign Targeting Financial Institutions",
    excerpt: "A sophisticated phishing campaign is currently targeting customers of major financial institutions, using spoofed emails that appear to come from legitimate bank domains.",
    category: "Threat Alerts",
    date: "April 15, 2025",
    readTime: "5 min read",
    author: "Security Team",
    image: "https://via.placeholder.com/800x450"
  },
  {
    id: 2,
    title: "How to Identify Business Email Compromise Attempts",
    excerpt: "Business Email Compromise (BEC) attacks continue to rise, with organizations losing millions to these sophisticated social engineering tactics. Learn how to identify and prevent these threats.",
    category: "Security Tips",
    date: "April 12, 2025",
    readTime: "8 min read",
    author: "Sarah Johnson",
    image: "https://via.placeholder.com/800x450"
  },
  {
    id: 3,
    title: "Weekly Threat Intelligence Bulletin",
    excerpt: "Our weekly roundup of the latest email security threats, including new malware variants, phishing techniques, and vulnerability exploits targeting inboxes worldwide.",
    category: "Threat Intelligence",
    date: "April 10, 2025",
    readTime: "10 min read",
    author: "Threat Research Team",
    image: "https://via.placeholder.com/800x450"
  },
  {
    id: 4,
    title: "Understanding Email Authentication: SPF, DKIM, and DMARC",
    excerpt: "A comprehensive guide to email authentication protocols and how they work together to protect your organization from spoofing and phishing attacks.",
    category: "Educational",
    date: "April 5, 2025",
    readTime: "12 min read",
    author: "Michael Chen",
    image: "https://via.placeholder.com/800x450"
  },
  {
    id: 5,
    title: "The Rise of AI-Powered Phishing: What You Need to Know",
    excerpt: "Artificial intelligence is revolutionizing phishing attacks, making them more personalized and harder to detect. Learn about the latest trends and defense strategies.",
    category: "Trends",
    date: "March 28, 2025",
    readTime: "7 min read",
    author: "Dr. Emily Richards",
    image: "https://via.placeholder.com/800x450"
  },
  {
    id: 6,
    title: "Ransomware Delivered via Email: Latest Tactics and Prevention",
    excerpt: "Email remains the primary vector for ransomware distribution. This article explores the latest ransomware campaigns and provides actionable prevention strategies.",
    category: "Threat Alerts",
    date: "March 22, 2025",
    readTime: "9 min read",
    author: "Cybersecurity Response Team",
    image: "https://via.placeholder.com/800x450"
  }
];

// Mock featured article
const featuredArticle = {
  id: 101,
  title: "Major Phishing Campaign Mimicking Microsoft 365 Login Pages",
  excerpt: "A large-scale phishing operation is currently active, targeting enterprises with convincing Microsoft 365 login page replicas. The attack leverages sophisticated social engineering techniques and exploits remote work vulnerabilities.",
  category: "Critical Alert",
  date: "April 18, 2025",
  readTime: "6 min read",
  author: "Threat Intelligence Team",
  image: "https://via.placeholder.com/1200x600"
};

// Mock upcoming webinars
const upcomingWebinars = [
  {
    id: 201,
    title: "Defending Against Email-Based Social Engineering",
    date: "April 25, 2025",
    time: "11:00 AM EST",
    presenter: "Alex Morgan, Chief Security Officer"
  },
  {
    id: 202,
    title: "Building a Multi-Layered Email Security Strategy",
    date: "May 3, 2025",
    time: "2:00 PM EST",
    presenter: "Dr. Lisa Chen, Security Architect"
  },
  {
    id: 203,
    title: "Email Threat Hunting Techniques for Security Teams",
    date: "May 10, 2025",
    time: "10:00 AM EST",
    presenter: "Marcus Johnson, Threat Hunter"
  }
];

const News = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Email Security News & Resources</h1>
          <p className="text-gray-400 mt-2">Stay informed about the latest email security threats, trends, and best practices</p>
        </div>
        
        <Tabs defaultValue="all" className="w-full mb-10">
          <TabsList className="w-full bg-gray-800 border border-gray-700 mb-6 max-w-2xl mx-auto">
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-blue-600 text-white">All</TabsTrigger>
            <TabsTrigger value="alerts" className="flex-1 data-[state=active]:bg-blue-600 text-white">Threat Alerts</TabsTrigger>
            <TabsTrigger value="guides" className="flex-1 data-[state=active]:bg-blue-600 text-white">Security Guides</TabsTrigger>
            <TabsTrigger value="webinars" className="flex-1 data-[state=active]:bg-blue-600 text-white">Webinars</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-10">
            {/* Featured Article */}
            <Card className="bg-gray-800 border border-gray-700 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className="px-2 py-1 text-xs font-semibold bg-red-900/70 text-red-200 rounded-full">{featuredArticle.category}</span>
                    <span className="text-gray-400 text-sm ml-3">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">{featuredArticle.title}</h2>
                  <p className="text-gray-300 mb-6">{featuredArticle.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <p className="text-white text-sm font-medium">{featuredArticle.author}</p>
                        <p className="text-gray-400 text-xs">{featuredArticle.date}</p>
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Read Full Alert <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-700 h-80 lg:h-auto flex items-center justify-center">
                  <AlertTriangle className="h-20 w-20 text-red-400" />
                </div>
              </div>
            </Card>
            
            {/* Article Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsArticles.map((article) => (
                  <Card key={article.id} className="bg-gray-800 border border-gray-700 overflow-hidden flex flex-col">
                    <div className="h-48 bg-gray-700 flex items-center justify-center">
                      {article.category === "Threat Alerts" ? (
                        <AlertTriangle className="h-12 w-12 text-red-400" />
                      ) : article.category === "Security Tips" ? (
                        <BookOpen className="h-12 w-12 text-green-400" />
                      ) : article.category === "Threat Intelligence" ? (
                        <FileText className="h-12 w-12 text-blue-400" />
                      ) : (
                        <Newspaper className="h-12 w-12 text-purple-400" />
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 text-xs font-medium bg-gray-700 text-blue-300 rounded-full">{article.category}</span>
                        <span className="text-gray-400 text-xs">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-white text-xl">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <p className="text-gray-400 text-sm line-clamp-3">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-2">
                      <div className="text-gray-400 text-xs">{article.date}</div>
                      <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                        Read more <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Upcoming Webinars */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Upcoming Webinars</h2>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {upcomingWebinars.map((webinar) => (
                  <Card key={webinar.id} className="bg-gray-800 border border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">{webinar.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-blue-400 mr-3" />
                          <span className="text-gray-300">{webinar.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-blue-400 mr-3" />
                          <span className="text-gray-300">{webinar.time}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-blue-400 mr-3" />
                          <span className="text-gray-300">{webinar.presenter}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Register Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <Card className="bg-gray-800 border border-gray-700">
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">Subscribe to our Security Newsletter</h2>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  Get the latest email security news, threat alerts, and best practices delivered straight to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
                <p className="text-gray-500 text-xs mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts">
            <div className="text-center py-20">
              <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Threat Alerts Section</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                This tab would contain the latest threat alerts and security bulletins.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="guides">
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Security Guides Section</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                This tab would contain educational resources and best practice guides.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="webinars">
            <div className="text-center py-20">
              <Calendar className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Webinars Section</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                This tab would contain upcoming and recorded webinar sessions.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default News;
