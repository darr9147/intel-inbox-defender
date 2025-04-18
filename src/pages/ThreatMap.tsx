
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Globe, Search, MapPin, AlertTriangle, Layers, Activity, Database } from "lucide-react";

const ThreatMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapView, setMapView] = useState("threats");
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Sample threat data for the map
  const threatData = [
    { id: 1, country: "Russia", countryCode: "RU", lat: 55.7558, lng: 37.6173, threats: 185, type: "Phishing" },
    { id: 2, country: "China", countryCode: "CN", lat: 39.9042, lng: 116.4074, threats: 142, type: "Malware" },
    { id: 3, country: "Nigeria", countryCode: "NG", lat: 9.0820, lng: 8.6753, threats: 98, type: "Scam" },
    { id: 4, country: "Brazil", countryCode: "BR", lat: -15.7801, lng: -47.9292, threats: 76, type: "Spam" },
    { id: 5, country: "Ukraine", countryCode: "UA", lat: 50.4501, lng: 30.5234, threats: 63, type: "BEC" },
    { id: 6, country: "India", countryCode: "IN", lat: 28.6139, lng: 77.2090, threats: 57, type: "Malware" },
    { id: 7, country: "Iran", countryCode: "IR", lat: 35.6892, lng: 51.3890, threats: 41, type: "Phishing" },
    { id: 8, country: "Romania", countryCode: "RO", lat: 44.4268, lng: 26.1025, threats: 32, type: "Scam" },
    { id: 9, country: "North Korea", countryCode: "KP", lat: 39.0392, lng: 125.7625, threats: 29, type: "Malware" },
    { id: 10, country: "Vietnam", countryCode: "VN", lat: 21.0278, lng: 105.8342, threats: 23, type: "Phishing" },
  ];
  
  // Map loading mock function
  useEffect(() => {
    // This is just a placeholder for where a real map library like Mapbox or Leaflet would be initialized
    if (mapContainerRef.current) {
      // In a real implementation, we would initialize the map here
      const mapElement = mapContainerRef.current;
      
      // Add a placeholder map visualization
      mapElement.innerHTML = `
        <div class="h-full w-full flex items-center justify-center bg-gray-700/50 rounded-lg">
          <div class="text-center">
            <Globe class="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <p class="text-white text-lg mb-2">Interactive Threat Map</p>
            <p class="text-gray-400">[Actual map implementation would go here]</p>
            <p class="text-gray-500 text-sm mt-6">In a production environment, this would be an interactive map showing threat origins</p>
          </div>
        </div>
      `;
    }
  }, [mapView]);
  
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Global Threat Map</h1>
          <p className="text-gray-400 mt-2">Visualize the geographic origin of email threats</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Filters & Controls */}
          <Card className="bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Layers className="mr-2 h-5 w-5" />
                Map Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search by IP, domain, or country"
                    className="bg-gray-700 border-gray-600 text-white pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-white text-sm font-medium mb-3">Map View</h3>
                <Tabs defaultValue="threats" onValueChange={setMapView} className="w-full">
                  <TabsList className="w-full bg-gray-700 border border-gray-600">
                    <TabsTrigger value="threats" className="flex-1 data-[state=active]:bg-blue-600">Threats</TabsTrigger>
                    <TabsTrigger value="heatmap" className="flex-1 data-[state=active]:bg-blue-600">Heatmap</TabsTrigger>
                    <TabsTrigger value="clusters" className="flex-1 data-[state=active]:bg-blue-600">Clusters</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div>
                <h3 className="text-white text-sm font-medium mb-3">Threat Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="phishing"
                      defaultChecked
                      className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                    />
                    <label htmlFor="phishing" className="ml-2 text-gray-300">Phishing</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="malware"
                      defaultChecked
                      className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                    />
                    <label htmlFor="malware" className="ml-2 text-gray-300">Malware</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="spam"
                      defaultChecked
                      className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                    />
                    <label htmlFor="spam" className="ml-2 text-gray-300">Spam</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="bec"
                      defaultChecked
                      className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                    />
                    <label htmlFor="bec" className="ml-2 text-gray-300">Business Email Compromise</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="scam"
                      defaultChecked
                      className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                    />
                    <label htmlFor="scam" className="ml-2 text-gray-300">Scam</label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-white text-sm font-medium mb-3">Time Range</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left border-gray-600 text-gray-300 bg-gray-700">Last 24 Hours</Button>
                  <Button variant="outline" className="w-full justify-start text-left border-gray-600 text-gray-300 bg-transparent">Last 7 Days</Button>
                  <Button variant="outline" className="w-full justify-start text-left border-gray-600 text-gray-300 bg-transparent">Last 30 Days</Button>
                  <Button variant="outline" className="w-full justify-start text-left border-gray-600 text-gray-300 bg-transparent">Last 90 Days</Button>
                  <Button variant="outline" className="w-full justify-start text-left border-gray-600 text-gray-300 bg-transparent">All Time</Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Map Area */}
          <Card className="bg-gray-800 border border-gray-700 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Global Email Threat Origins
              </CardTitle>
              <CardDescription className="text-gray-400">
                Showing {threatData.length} threat sources worldwide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] mb-4 rounded-lg overflow-hidden">
                <div ref={mapContainerRef} className="h-full w-full"></div>
              </div>
              
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <h3 className="text-white font-medium mb-3">Top Threat Origins</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {threatData.slice(0, 6).map((threat) => (
                    <div key={threat.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-red-500 mr-2" />
                        <div>
                          <p className="text-white font-medium">{threat.country}</p>
                          <p className="text-gray-400 text-sm">{threat.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{threat.threats}</p>
                        <p className="text-gray-400 text-sm">threats</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Threats</p>
                  <p className="text-3xl font-bold text-white mt-1">846</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Top Origin</p>
                  <p className="text-3xl font-bold text-white mt-1">Russia</p>
                </div>
                <Globe className="h-10 w-10 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Threat Type</p>
                  <p className="text-3xl font-bold text-white mt-1">Phishing</p>
                </div>
                <Activity className="h-10 w-10 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border border-gray-700">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active IPs</p>
                  <p className="text-3xl font-bold text-white mt-1">152</p>
                </div>
                <Database className="h-10 w-10 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;
