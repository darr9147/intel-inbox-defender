
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2 } from "lucide-react";
import { connectEmailAccount } from "@/services/emailService";
import { useToast } from "@/components/ui/use-toast";

interface ConnectEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ConnectEmailModal = ({ isOpen, onClose, onSuccess }: ConnectEmailModalProps) => {
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState("gmail");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConnectEmail = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await connectEmailAccount(provider, email);
      if (result) {
        toast({
          title: "Email Connected",
          description: `Successfully connected ${email}`,
        });
        onSuccess();
      } else {
        throw new Error("Failed to connect email");
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to email account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Connect Email Account</DialogTitle>
          <DialogDescription className="text-gray-400">
            Connect your email to scan for threats
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="col-span-3 bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="provider" className="text-right text-gray-300">
              Provider
            </Label>
            <select
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="col-span-3 bg-gray-700 border border-gray-600 text-white p-2 rounded-md"
            >
              <option value="gmail">Gmail</option>
              <option value="outlook">Outlook</option>
              <option value="office365">Microsoft 365</option>
              <option value="yahoo">Yahoo</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConnectEmail} 
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Connect
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectEmailModal;
