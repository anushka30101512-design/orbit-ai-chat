import { useState } from "react";
import { FileText, Download, Filter, Calendar, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/ui/date-picker";

interface Report {
  id: string;
  name: string;
  type: "campaign" | "compliance" | "performance" | "audit";
  generatedDate: string;
  status: "ready" | "generating" | "failed";
  size: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: "success" | "failed";
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      name: "Q4 Campaign Performance",
      type: "campaign",
      generatedDate: "2024-01-15 14:30",
      status: "ready",
      size: "2.3 MB"
    },
    {
      id: "2",
      name: "SMS Compliance Report",
      type: "compliance", 
      generatedDate: "2024-01-14 09:15",
      status: "ready",
      size: "856 KB"
    },
    {
      id: "3",
      name: "Monthly Performance Analysis",
      type: "performance",
      generatedDate: "2024-01-13 16:45",
      status: "generating",
      size: "—"
    }
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: "1",
      timestamp: "2024-01-15 10:30:25",
      user: "admin@company.com",
      action: "Campaign Created",
      resource: "Dental Q4 Campaign", 
      status: "success"
    },
    {
      id: "2",
      timestamp: "2024-01-15 10:25:12",
      user: "user@company.com", 
      action: "Lead Import",
      resource: "dental_leads.csv",
      status: "success"
    },
    {
      id: "3",
      timestamp: "2024-01-15 10:20:08",
      user: "admin@company.com",
      action: "Template Modified",
      resource: "Prescription Reminder",
      status: "success"
    }
  ]);

  const [filterType, setFilterType] = useState<string>("all");
  
  const filteredReports = reports.filter(report => 
    filterType === "all" || report.type === filterType
  );

  const getTypeColor = (type: Report["type"]) => {
    const colors = {
      campaign: "bg-blue-100 text-blue-800",
      compliance: "bg-red-100 text-red-800",
      performance: "bg-green-100 text-green-800",
      audit: "bg-purple-100 text-purple-800"
    };
    return colors[type];
  };

  const getStatusColor = (status: Report["status"]) => {
    const colors = {
      ready: "bg-green-100 text-green-800",
      generating: "bg-yellow-100 text-yellow-800", 
      failed: "bg-red-100 text-red-800"
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and download comprehensive reports for campaigns and compliance</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          <TabsTrigger value="campaign-history">Campaign History</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="stat-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reports.length}</div>
                <div className="text-xs text-muted-foreground">
                  {reports.filter(r => r.status === "ready").length} ready to download
                </div>
              </CardContent>
            </Card>
            
            <Card className="stat-card cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <BarChart3 className="w-4 h-4" />
                  Campaign Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reports.filter(r => r.type === "campaign").length}
                </div>
                <div className="text-xs text-muted-foreground">Performance data</div>
              </CardContent>
            </Card>
            
            <Card className="stat-card cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <PieChart className="w-4 h-4" />
                  Compliance Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reports.filter(r => r.type === "compliance").length}
                </div>
                <div className="text-xs text-muted-foreground">Regulatory compliance</div>
              </CardContent>
            </Card>
            
            <Card className="stat-card cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Performance Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reports.filter(r => r.type === "performance").length}
                </div>
                <div className="text-xs text-muted-foreground">Analytics & insights</div>
              </CardContent>
            </Card>
          </div>

          <Card className="stat-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>Download and view your generated reports</CardDescription>
                </div>
                <div className="flex gap-3">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="campaign">Campaign</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="audit">Audit</SelectItem>
                    </SelectContent>
                  </Select>
                  <DatePickerWithRange 
                    date={undefined} 
                    setDate={(range) => console.log(range)} 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Generated Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(report.type)}>
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.generatedDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {report.status === "ready" && (
                            <>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </>
                          )}
                          {report.status === "generating" && (
                            <Badge variant="outline">Generating...</Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaign-history">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Campaign History</CardTitle>
              <CardDescription>Complete history of all your communication campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="font-medium">Dental Q4 Promotion</div>
                    <div className="text-sm text-muted-foreground">Voice calls • 150 leads • 8.5% conversion</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    <Button variant="outline" size="sm">View Report</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="font-medium">Pharmacy SMS Campaign</div>
                    <div className="text-sm text-muted-foreground">SMS messages • 300 leads • 12.3% conversion</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                    <Button variant="outline" size="sm">View Report</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>Regulatory compliance and opt-out management reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">SMS Compliance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total SMS Sent</span>
                      <span className="font-medium">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Opt-outs Received</span>
                      <span className="font-medium">23 (0.8%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance Score</span>
                      <span className="font-medium text-green-600">98.2%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Call Compliance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Calls Made</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Do Not Call Requests</span>
                      <span className="font-medium">8 (0.6%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance Score</span>
                      <span className="font-medium text-green-600">99.4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit-logs">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>System Audit Logs</CardTitle>
              <CardDescription>Track all user actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>
                        <Badge className={log.status === "success" ? 
                          "bg-green-100 text-green-800" : 
                          "bg-red-100 text-red-800"
                        }>
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}