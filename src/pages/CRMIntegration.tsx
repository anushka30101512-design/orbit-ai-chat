import { useState } from "react";
import { Database, RefreshCw, Settings, CheckCircle, AlertCircle, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CRMConnection {
  id: string;
  name: string;
  type: "salesforce" | "hubspot" | "zoho";
  status: "connected" | "disconnected" | "syncing" | "error";
  lastSync: string;
  recordsSynced: number;
  autoSync: boolean;
}

interface FieldMapping {
  crmField: string;
  platformField: string;
  type: "text" | "email" | "phone" | "date";
  required: boolean;
}

export default function CRMIntegration() {
  const [connections, setConnections] = useState<CRMConnection[]>([
    {
      id: "1",
      name: "Salesforce Production",
      type: "salesforce",
      status: "connected",
      lastSync: "5 minutes ago",
      recordsSynced: 1247,
      autoSync: true
    },
    {
      id: "2",
      name: "HubSpot Marketing",
      type: "hubspot", 
      status: "syncing",
      lastSync: "Syncing now...",
      recordsSynced: 890,
      autoSync: true
    }
  ]);

  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([
    { crmField: "FirstName", platformField: "name", type: "text", required: true },
    { crmField: "Email", platformField: "email", type: "email", required: true },
    { crmField: "Phone", platformField: "phone", type: "phone", required: false },
    { crmField: "Company", platformField: "business", type: "text", required: false }
  ]);

  const toggleAutoSync = (id: string) => {
    setConnections(connections.map(conn => 
      conn.id === id ? { ...conn, autoSync: !conn.autoSync } : conn
    ));
  };

  const getStatusColor = (status: CRMConnection["status"]) => {
    const colors = {
      connected: "bg-green-100 text-green-800",
      disconnected: "bg-red-100 text-red-800",
      syncing: "bg-blue-100 text-blue-800",
      error: "bg-red-100 text-red-800"
    };
    return colors[status];
  };

  const getCRMIcon = (type: CRMConnection["type"]) => {
    // In real implementation, these would be proper logo components
    const icons = {
      salesforce: "🏢",
      hubspot: "🧡", 
      zoho: "🔶"
    };
    return icons[type];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">CRM Integration</h1>
          <p className="text-muted-foreground">Connect and sync data with your existing CRM systems</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Link className="w-4 h-4 mr-2" />
              Add CRM Connection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect New CRM</DialogTitle>
              <DialogDescription>
                Choose your CRM platform to set up integration
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>CRM Platform</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select CRM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salesforce">Salesforce</SelectItem>
                    <SelectItem value="hubspot">HubSpot</SelectItem>
                    <SelectItem value="zoho">Zoho CRM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Connection Name</Label>
                <Input placeholder="Enter a name for this connection" />
              </div>
              <div>
                <Label>API Key / Token</Label>
                <Input type="password" placeholder="Enter your CRM API key" />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Connect CRM</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList>
          <TabsTrigger value="connections">Active Connections</TabsTrigger>
          <TabsTrigger value="field-mapping">Field Mapping</TabsTrigger>
          <TabsTrigger value="sync-settings">Sync Settings</TabsTrigger>
          <TabsTrigger value="sync-history">Sync History</TabsTrigger>
        </TabsList>

        <TabsContent value="connections">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="stat-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{connections.length}</div>
                <div className="text-xs text-muted-foreground">
                  {connections.filter(c => c.status === "connected").length} connected
                </div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Records Synced</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {connections.reduce((sum, conn) => sum + conn.recordsSynced, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total records</div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Now</div>
                <div className="text-xs text-muted-foreground">Auto-sync active</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {connections.map((connection) => (
              <Card key={connection.id} className="stat-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-lg">
                        {getCRMIcon(connection.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{connection.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="capitalize">{connection.type}</span>
                          <span>•</span>
                          <span>Last sync: {connection.lastSync}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(connection.status)}>
                        {connection.status}
                      </Badge>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold">{connection.recordsSynced}</div>
                        <div className="text-xs text-muted-foreground">records synced</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={connection.autoSync}
                        onCheckedChange={() => toggleAutoSync(connection.id)}
                      />
                      <Label className="text-sm">Auto-sync enabled</Label>
                    </div>
                    
                    {connection.status === "connected" && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Sync healthy</span>
                      </div>
                    )}
                    
                    {connection.status === "error" && (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span>Sync failed - check credentials</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="field-mapping">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Field Mapping Configuration
              </CardTitle>
              <CardDescription>
                Map your CRM fields to platform fields for seamless data sync
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CRM Field</TableHead>
                    <TableHead>Platform Field</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fieldMappings.map((mapping, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{mapping.crmField}</TableCell>
                      <TableCell>{mapping.platformField}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {mapping.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {mapping.required ? (
                          <Badge className="bg-red-100 text-red-800">Required</Badge>
                        ) : (
                          <Badge variant="outline">Optional</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-4">
                <Button variant="outline">
                  Add Field Mapping
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync-settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="stat-card">
              <CardHeader>
                <CardTitle>Sync Frequency</CardTitle>
                <CardDescription>Configure how often data syncs between systems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Sync Interval</Label>
                  <Select defaultValue="15min">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5min">Every 5 minutes</SelectItem>
                      <SelectItem value="15min">Every 15 minutes</SelectItem>
                      <SelectItem value="30min">Every 30 minutes</SelectItem>
                      <SelectItem value="1hour">Every hour</SelectItem>
                      <SelectItem value="manual">Manual only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="bidirectional">Bidirectional Sync</Label>
                  <Switch id="bidirectional" />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="realtime">Real-time Updates</Label>
                  <Switch id="realtime" defaultChecked />
                </div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardHeader>
                <CardTitle>Data Filters</CardTitle>
                <CardDescription>Choose which data to sync</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="leads">Sync Leads</Label>
                  <Switch id="leads" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="contacts">Sync Contacts</Label>
                  <Switch id="contacts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="activities">Sync Activities</Label>
                  <Switch id="activities" />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="campaigns">Sync Campaigns</Label>
                  <Switch id="campaigns" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sync-history">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Sync History</CardTitle>
              <CardDescription>View recent sync activities and any issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Salesforce sync completed</div>
                      <div className="text-sm text-muted-foreground">234 records updated</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">2 minutes ago</div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">HubSpot sync in progress</div>
                      <div className="text-sm text-muted-foreground">Processing 145 records</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Now</div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-medium">Zoho sync failed</div>
                      <div className="text-sm text-muted-foreground">Authentication error</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">1 hour ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}