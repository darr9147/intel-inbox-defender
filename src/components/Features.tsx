
import { Shield, Mail, Lock, Globe, Bell, FileText, Brain, Database, Fingerprint, Eye, Zap } from "lucide-react";

const features = [
  {
    name: "AI-Powered Threat Detection",
    description: "Advanced machine learning models detect phishing attempts, malware, and suspicious content in real-time.",
    icon: Brain,
  },
  {
    name: "Global Threat Map",
    description: "Visualize and track the origin of threats with our interactive global threat mapping system.",
    icon: Globe,
  },
  {
    name: "Real-time Monitoring",
    description: "Continuously scan and analyze emails as they arrive for immediate protection.",
    icon: Eye,
  },
  {
    name: "Email Integration",
    description: "Seamlessly connect your Gmail, Outlook, or Microsoft 365 inbox for continuous protection.",
    icon: Mail,
  },
  {
    name: "Instant Alerts",
    description: "Receive immediate notifications when suspicious activities are detected in your inbox.",
    icon: Bell,
  },
  {
    name: "Advanced Analytics",
    description: "Comprehensive security dashboards with actionable insights and threat analytics.",
    icon: Zap,
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-gray-900" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Advanced Email Security Features
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Protect your organization with our comprehensive suite of AI-powered security features.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
