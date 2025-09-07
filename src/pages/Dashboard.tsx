import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Phone, PhoneCall, Files, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    title: "Active Assistants",
    value: "3",
    change: "+1 this week",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Total Calls",
    value: "147",
    change: "+12 today",
    icon: PhoneCall,
    color: "text-accent",
  },
  {
    title: "Phone Numbers",
    value: "2",
    change: "No change",
    icon: Phone,
    color: "text-muted-foreground",
  },
  {
    title: "Files Uploaded",
    value: "28",
    change: "+5 this week",
    icon: Files,
    color: "text-primary",
  },
];

const recentCalls = [
  {
    id: "1",
    assistant: "Sales Assistant",
    destination: "+1 (555) 123-4567",
    duration: "2:34",
    status: "Completed",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    assistant: "Customer Support",
    destination: "+1 (555) 987-6543",
    duration: "1:15",
    status: "Failed",
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    assistant: "Technical Support",
    destination: "+1 (555) 555-0123",
    duration: "4:22",
    status: "Completed",
    timestamp: "3 hours ago",
  },
];

const recentFiles = [
  {
    id: "1",
    name: "Product_Catalog_2024.pdf",
    size: "2.4 MB",
    assistant: "Sales Assistant",
    timestamp: "1 hour ago",
  },
  {
    id: "2",
    name: "Customer_FAQ.docx",
    size: "156 KB",
    assistant: "Customer Support",
    timestamp: "2 hours ago",
  },
  {
    id: "3",
    name: "Technical_Manual.pdf",
    size: "5.1 MB",
    assistant: "Technical Support",
    timestamp: "1 day ago",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Calls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-primary" />
              Recent Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{call.assistant}</div>
                    <div className="text-sm text-muted-foreground">{call.destination}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          call.status === "Completed"
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {call.status}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {call.duration} • {call.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Files */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Files className="h-5 w-5 text-primary" />
              Recent Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Files className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{file.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {file.size} • {file.assistant}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{file.timestamp}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}