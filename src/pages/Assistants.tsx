import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Phone, Eye, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Assistant {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  dateCreated: string;
  totalCalls: number;
  linkedFiles: number;
}

const mockAssistants: Assistant[] = [
  {
    id: "1",
    name: "Sales Assistant",
    description: "Handles product inquiries and sales conversations",
    status: "active",
    dateCreated: "2024-01-15",
    totalCalls: 45,
    linkedFiles: 3,
  },
  {
    id: "2",
    name: "Customer Support",
    description: "Provides customer service and technical support",
    status: "active",
    dateCreated: "2024-01-10",
    totalCalls: 32,
    linkedFiles: 5,
  },
  {
    id: "3",
    name: "Technical Support",
    description: "Advanced technical assistance and troubleshooting",
    status: "inactive",
    dateCreated: "2024-01-08",
    totalCalls: 12,
    linkedFiles: 8,
  },
];

export default function Assistants() {
  const [assistants, setAssistants] = useState(mockAssistants);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const filteredAssistants = assistants.filter(
    (assistant) =>
      assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartCall = (assistant: Assistant) => {
    setSelectedAssistant(assistant);
    setIsCallDialogOpen(true);
  };

  const handleMakeCall = () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone Number Required",
        description: "Please enter a phone number to start the call.",
        variant: "destructive",
      });
      return;
    }

    // Mock API call
    toast({
      title: "Call Initiated",
      description: `Starting call to ${phoneNumber} with ${selectedAssistant?.name}`,
    });

    setIsCallDialogOpen(false);
    setPhoneNumber("");
    setPrompt("");
    setSelectedAssistant(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          Assistants
        </h1>
        <Button className="btn-hero">
          <Plus className="w-4 h-4 mr-2" />
          Create Assistant
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assistants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Assistants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssistants.map((assistant) => (
          <Card key={assistant.id} className="stat-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{assistant.name}</CardTitle>
                <Badge
                  variant={assistant.status === "active" ? "default" : "secondary"}
                  className={
                    assistant.status === "active"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {assistant.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{assistant.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Total Calls</div>
                    <div className="font-semibold">{assistant.totalCalls}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Linked Files</div>
                    <div className="font-semibold">{assistant.linkedFiles}</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-muted-foreground">Created</div>
                  <div>{new Date(assistant.dateCreated).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStartCall(assistant)}
                    disabled={assistant.status === "inactive"}
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Start Call Dialog */}
      <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Call with {selectedAssistant?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="prompt">Initial Prompt (Optional)</Label>
              <Input
                id="prompt"
                placeholder="Enter initial conversation prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleMakeCall} className="flex-1 btn-hero">
                <Phone className="w-4 h-4 mr-2" />
                Start Call
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCallDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}