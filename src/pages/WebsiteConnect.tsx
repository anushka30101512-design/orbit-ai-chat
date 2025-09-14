import { useState } from "react";
import { Globe, Link, CheckCircle, Copy, Code, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface ConnectedSite {
  id: string;
  domain: string;
  status: "verified" | "pending" | "failed";
  leads: number;
  lastSync: string;
}

export default function WebsiteConnect() {
  const [connectedSites, setConnectedSites] = useState<ConnectedSite[]>([
    {
      id: "1",
      domain: "smiledental.com",
      status: "verified",
      leads: 23,
      lastSync: "2 minutes ago"
    },
    {
      id: "2", 
      domain: "quickpharm.com",
      status: "pending",
      leads: 0,
      lastSync: "Never"
    }
  ]);

  const [newDomain, setNewDomain] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleDomainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain) return;

    setIsVerifying(true);
    try {
      // Simulate domain verification
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newSite: ConnectedSite = {
        id: Date.now().toString(),
        domain: newDomain,
        status: "verified",
        leads: 0,
        lastSync: "Just now"
      };
      
      setConnectedSites([...connectedSites, newSite]);
      setNewDomain("");
      
      toast({
        title: "Domain Connected",
        description: `${newDomain} has been successfully connected and verified.`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed", 
        description: "Could not verify domain. Please check your settings.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Code copied to clipboard",
    });
  };

  const getStatusColor = (status: ConnectedSite["status"]) => {
    const colors = {
      verified: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800"
    };
    return colors[status];
  };

  const widgetCode = `<!-- Lead Capture Widget -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://widget.yourplatform.com/'+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','YOUR-WIDGET-ID');
</script>`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Website Connection</h1>
          <p className="text-muted-foreground">Connect your business websites to capture leads automatically</p>
        </div>
      </div>

      <Tabs defaultValue="connected-sites" className="space-y-6">
        <TabsList>
          <TabsTrigger value="connected-sites">Connected Sites</TabsTrigger>
          <TabsTrigger value="add-domain">Add New Domain</TabsTrigger>
          <TabsTrigger value="widget-setup">Widget Setup</TabsTrigger>
          <TabsTrigger value="api-integration">API Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="connected-sites">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="stat-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Connected Domains</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{connectedSites.length}</div>
                <div className="text-xs text-muted-foreground">
                  {connectedSites.filter(s => s.status === "verified").length} verified
                </div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Leads Captured</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {connectedSites.reduce((sum, site) => sum + site.leads, 0)}
                </div>
                <div className="text-xs text-muted-foreground">This month</div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Active Widgets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {connectedSites.filter(s => s.status === "verified").length}
                </div>
                <div className="text-xs text-muted-foreground">Live and capturing</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {connectedSites.map((site) => (
              <Card key={site.id} className="stat-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{site.domain}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Last sync: {site.lastSync}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(site.status)}>
                        {site.status}
                      </Badge>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold">{site.leads}</div>
                        <div className="text-xs text-muted-foreground">leads captured</div>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {site.status === "verified" && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Widget is active and capturing leads</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add-domain">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                Connect New Domain
              </CardTitle>
              <CardDescription>
                Add your business website to start capturing leads automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleDomainSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="domain">Website Domain</Label>
                  <Input
                    id="domain"
                    placeholder="e.g., yourbusiness.com"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    required
                  />
                </div>
                
                <Alert>
                  <AlertDescription>
                    Make sure you have admin access to this domain to complete verification.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  type="submit" 
                  disabled={isVerifying || !newDomain}
                  className="w-full"
                >
                  {isVerifying ? "Verifying Domain..." : "Connect Domain"}
                </Button>
              </form>

              <div className="border-t border-border pt-6">
                <h4 className="font-medium mb-3">Verification Steps</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">1</div>
                    <span>Enter your domain name</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-medium">2</div>
                    <span>Add verification code to your website</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-medium">3</div>
                    <span>Install lead capture widget</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-medium">4</div>
                    <span>Start capturing leads automatically</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="widget-setup">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Lead Capture Widget
              </CardTitle>
              <CardDescription>
                Add this widget to your website to capture leads automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label>Widget Code</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(widgetCode)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
                <Textarea
                  value={widgetCode}
                  readOnly
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="chatbot">Enable Chat Widget</Label>
                  <Switch id="chatbot" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="forms">Enable Contact Forms</Label>
                  <Switch id="forms" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="popup">Enable Exit-Intent Popup</Label>
                  <Switch id="popup" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="analytics">Enable Analytics Tracking</Label>
                  <Switch id="analytics" defaultChecked />
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  Place this code in the &lt;head&gt; section of your website for optimal performance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-integration">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>
                Advanced integration for developers using REST API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>API Endpoint</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value="https://api.yourplatform.com/v1/leads"
                    readOnly
                    className="font-mono"
                  />
                  <Button 
                    variant="outline"
                    onClick={() => copyToClipboard("https://api.yourplatform.com/v1/leads")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>API Key</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value="sk_live_xxxxxxxxxxxxxxxxxxxx"
                    readOnly
                    type="password"
                    className="font-mono"
                  />
                  <Button variant="outline">
                    Regenerate
                  </Button>
                </div>
              </div>

              <div>
                <Label>Sample Request</Label>
                <Textarea
                  value={`curl -X POST https://api.yourplatform.com/v1/leads \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com", 
    "phone": "+1234567890",
    "business": "Acme Corp",
    "source": "website"
  }'`}
                  readOnly
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>

              <Button variant="outline" className="w-full">
                View Full API Documentation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}