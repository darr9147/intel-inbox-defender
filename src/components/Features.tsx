
import { Shield, Mail, Lock, Globe, Bell, FileText } from "lucide-react";

const features = [
  {
    name: "Real-time Threat Detection",
    description: "AI-powered scanning detects phishing attempts, malware, and suspicious content in real-time.",
    icon: Shield,
  },
  {
    name: "Global Threat Map",
    description: "Visualize and track the origin of threats with our interactive global threat map.",
    icon: Globe,
  },
  {
    name: "Detailed Reports",
    description: "Get comprehensive analysis reports with actionable insights and threat indicators.",
    icon: FileText,
  },
  {
    name: "Email Integration",
    description: "Seamlessly connect your Gmail or Outlook inbox for continuous protection.",
    icon: Mail,
  },
  {
    name: "Instant Alerts",
    description: "Receive real-time notifications when suspicious activities are detected.",
    icon: Bell,
  },
  {
    name: "Advanced Security",
    description: "Enterprise-grade security with end-to-end encryption and compliance features.",
    icon: Lock,
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-gray-900" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Comprehensive Email Security
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Protect your organization with our advanced threat detection and prevention features.
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
