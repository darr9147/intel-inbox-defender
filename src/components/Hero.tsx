
import { Button } from "@/components/ui/button";
import { Shield, Mail, Lock } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 pt-32 pb-20">
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-4xl font-bold tracking-tight sm:text-6xl">
              Protect Your Inbox from Advanced Threats
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Advanced AI-powered email security platform that detects and prevents phishing, spam, and malware attacks before they reach your inbox.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                Start Protecting Now
              </Button>
              <Button variant="ghost" className="text-gray-300">
                Learn more →
              </Button>
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
