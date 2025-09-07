import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Phone, Settings } from "lucide-react";

interface PhoneNumber {
  id: string;
  number: string;
  type: "local" | "toll-free" | "international";
  status: "active" | "inactive" | "pending";
  createdAt: string;
  assignedAssistant?: string;
  totalCalls: number;
}

const mockPhoneNumbers: PhoneNumber[] = [
  {
    id: "1",
    number: "+1 (555) 123-4567",
    type: "local",
    status: "active",
    createdAt: "2024-01-10",
    assignedAssistant: "Sales Assistant",
    totalCalls: 45,
  },
  {
    id: "2",
    number: "+1 (800) 555-0199",
    type: "toll-free",
    status: "active",
    createdAt: "2024-01-08",
    assignedAssistant: "Customer Support",
    totalCalls: 67,
  },
  {
    id: "3",
    number: "+1 (555) 987-6543",
    type: "local",
    status: "pending",
    createdAt: "2024-01-15",
    totalCalls: 0,
  },
];

export default function PhoneNumbers() {
  const [phoneNumbers, setPhoneNumbers] = useState(mockPhoneNumbers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNumbers = phoneNumbers.filter((number) =>
    number.number.includes(searchQuery) ||
    number.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    number.assignedAssistant?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary/10 text-primary";
      case "inactive":
        return "bg-muted text-muted-foreground";
      case "pending":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "local":
        return "bg-secondary/10 text-secondary-foreground";
      case "toll-free":
        return "bg-primary/10 text-primary";
      case "international":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Phone className="h-8 w-8 text-primary" />
          Phone Numbers
        </h1>
        <Button className="btn-hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Number
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search phone numbers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Phone Numbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNumbers.map((phoneNumber) => (
          <Card key={phoneNumber.id} className="stat-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-mono">{phoneNumber.number}</CardTitle>
                <Badge className={getStatusColor(phoneNumber.status)}>
                  {phoneNumber.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className={getTypeColor(phoneNumber.type)}>
                  {phoneNumber.type.replace("-", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  {phoneNumber.assignedAssistant && (
                    <div className="text-sm">
                      <div className="text-muted-foreground">Assigned Assistant</div>
                      <div className="font-medium">{phoneNumber.assignedAssistant}</div>
                    </div>
                  )}
                  <div className="text-sm">
                    <div className="text-muted-foreground">Total Calls</div>
                    <div className="font-medium">{phoneNumber.totalCalls}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-muted-foreground">Created</div>
                    <div>{new Date(phoneNumber.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="w-4 h-4 mr-1" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-1" />
                    Test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNumbers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No phone numbers found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search terms." : "Get started by adding your first phone number."}
            </p>
            {!searchQuery && (
              <Button className="btn-hero">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Number
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}