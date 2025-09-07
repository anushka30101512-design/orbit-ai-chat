import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, PhoneCall, Clock, DollarSign, Eye } from "lucide-react";

interface Call {
  id: string;
  assistant: string;
  destination: string;
  status: "completed" | "failed" | "in-progress";
  duration: string;
  cost: string;
  timestamp: string;
  transcript?: string;
}

const mockCalls: Call[] = [
  {
    id: "1",
    assistant: "Sales Assistant",
    destination: "+1 (555) 123-4567",
    status: "completed",
    duration: "2:34",
    cost: "$0.12",
    timestamp: "2024-01-15 14:30",
    transcript: "Customer inquiry about product pricing and availability...",
  },
  {
    id: "2",
    assistant: "Customer Support",
    destination: "+1 (555) 987-6543",
    status: "failed",
    duration: "0:15",
    cost: "$0.02",
    timestamp: "2024-01-15 13:45",
  },
  {
    id: "3",
    assistant: "Technical Support",
    destination: "+1 (555) 555-0123",
    status: "completed",
    duration: "4:22",
    cost: "$0.25",
    timestamp: "2024-01-15 12:15",
    transcript: "Technical troubleshooting session for software installation...",
  },
  {
    id: "4",
    assistant: "Sales Assistant",
    destination: "+1 (555) 111-2222",
    status: "in-progress",
    duration: "1:45",
    cost: "$0.08",
    timestamp: "2024-01-15 15:00",
  },
];

export default function Calls() {
  const [calls, setCalls] = useState(mockCalls);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCalls = calls.filter((call) => {
    const matchesSearch = 
      call.assistant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.destination.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || call.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary/10 text-primary";
      case "failed":
        return "bg-destructive/10 text-destructive";
      case "in-progress":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTotalStats = () => {
    const total = calls.length;
    const completed = calls.filter(c => c.status === "completed").length;
    const failed = calls.filter(c => c.status === "failed").length;
    const totalCost = calls.reduce((sum, call) => sum + parseFloat(call.cost.replace("$", "")), 0);
    const totalDuration = calls.reduce((sum, call) => {
      const [minutes, seconds] = call.duration.split(":").map(Number);
      return sum + minutes * 60 + seconds;
    }, 0);

    return { total, completed, failed, totalCost, totalDuration };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <PhoneCall className="h-8 w-8 text-primary" />
          Calls
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Calls</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <PhoneCall className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                <PhoneCall className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">${stats.totalCost.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Duration</p>
                <p className="text-2xl font-bold">{Math.floor(stats.totalDuration / 60)}m</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search calls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calls List */}
      <Card>
        <CardHeader>
          <CardTitle>Call History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <div className="font-medium text-foreground">{call.assistant}</div>
                    <div className="text-sm text-muted-foreground">Assistant</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{call.destination}</div>
                    <div className="text-sm text-muted-foreground">Destination</div>
                  </div>
                  <div>
                    <Badge className={getStatusColor(call.status)}>
                      {call.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{call.duration}</div>
                    <div className="text-sm text-muted-foreground">{call.cost}</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {new Date(call.timestamp).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(call.timestamp).toLocaleTimeString([], { 
                        hour: "2-digit", 
                        minute: "2-digit" 
                      })}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}