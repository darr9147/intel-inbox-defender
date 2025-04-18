
import { Button } from "@/components/ui/button";
import { Shield, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 pt-32 pb-20">
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-4xl font-bold tracking-tight sm:text-6xl">
              Email Sentinel Vision Security
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Protect your inbox from advanced threats with our AI-powered email security platform. Real-time detection of phishing, spam, and malware attacks.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                  Get Started
                </Button>
              </Link>
              <a href="#features">
                <Button variant="ghost" className="text-gray-300">
                  Learn more →
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Abstract shapes in the background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-3xl" />
      </div>
    </div>
  );
};

export default Hero;
