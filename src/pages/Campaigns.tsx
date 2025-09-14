import { useState } from "react";
import { Play, Pause, Square, Settings, BarChart3, Users, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface Campaign {
  id: string;
  name: string;
  type: "calls" | "sms" | "email";
  status: "draft" | "active" | "paused" | "completed";
  leads: number;
  contacted: number;
  converted: number;
  schedule: string;
  hourlyLimit: number;
  template: string;
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Dental Q4 Promotion",
      type: "calls",
      status: "active", 
      leads: 150,
      contacted: 45,
      converted: 12,
      schedule: "9:00 AM - 5:00 PM",
      hourlyLimit: 15,
      template: "Dental Cleaning Reminder"
    },
    {
      id: "2",
      name: "Pharmacy SMS Campaign",
      type: "sms",
      status: "paused",
      leads: 300,
      contacted: 180,
      converted: 22,
      schedule: "10:00 AM - 6:00 PM", 
      hourlyLimit: 30,
      template: "Prescription Reminder"
    }
  ]);

  const [activeChannel, setActiveChannel] = useState<"calls" | "sms" | "email">("calls");
  const [hourlyLimit, setHourlyLimit] = useState([15]);

  const toggleCampaign = (id: string) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        return {
          ...campaign,
          status: campaign.status === "active" ? "paused" : "active"
        };
      }
      return campaign;
    }));
  };

  const getStatusColor = (status: Campaign["status"]) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800"
    };
    return colors[status];
  };

  const getChannelIcon = (type: Campaign["type"]) => {
    const icons = {
      calls: Play,
      sms: MessageSquare,
      email: MessageSquare
    };
    const IconComponent = icons[type];
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaign Management</h1>
          <p className="text-muted-foreground">Control and monitor your communication campaigns</p>
        </div>
        <Button>
          Create Campaign
        </Button>
      </div>

      <Tabs defaultValue="active-campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active-campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="channel-controls">Channel Controls</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
        </TabsList>

        <TabsContent value="active-campaigns">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="stat-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground">4 active, 3 paused</div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Leads Contacted Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <div className="text-xs text-muted-foreground">+12% from yesterday</div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.5%</div>
                <div className="text-xs text-muted-foreground">Above average</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="stat-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getChannelIcon(campaign.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="capitalize">{campaign.type}</span>
                          <span>•</span>
                          <span>{campaign.schedule}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCampaign(campaign.id)}
                        >
                          {campaign.status === "active" ? 
                            <Pause className="w-4 h-4" /> : 
                            <Play className="w-4 h-4" />
                          }
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Square className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Total Leads</div>
                      <div className="text-xl font-semibold">{campaign.leads}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Contacted</div>
                      <div className="text-xl font-semibold">{campaign.contacted}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Converted</div>
                      <div className="text-xl font-semibold">{campaign.converted}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Rate Limit</div>
                      <div className="text-xl font-semibold">{campaign.hourlyLimit}/hr</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{Math.round((campaign.contacted / campaign.leads) * 100)}%</span>
                    </div>
                    <Progress value={(campaign.contacted / campaign.leads) * 100} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="channel-controls">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Communication Channel Control</CardTitle>
              <CardDescription>
                Only one outbound channel can be active at a time to ensure compliance and focus
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Voice Calls</div>
                      <div className="text-sm text-muted-foreground">Direct phone outreach</div>
                    </div>
                  </div>
                  <Switch checked={activeChannel === "calls"} onCheckedChange={() => setActiveChannel("calls")} />
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5" />
                    <div>
                      <div className="font-medium">SMS Messages</div>
                      <div className="text-sm text-muted-foreground">Text message campaigns</div>
                    </div>
                  </div>
                  <Switch checked={activeChannel === "sms"} onCheckedChange={() => setActiveChannel("sms")} />
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Email Campaigns</div>
                      <div className="text-sm text-muted-foreground">Email marketing outreach</div>
                    </div>
                  </div>
                  <Switch checked={activeChannel === "email"} onCheckedChange={() => setActiveChannel("email")} />
                </div>
              </div>

              {activeChannel && (
                <div className="p-4 bg-accent/10 rounded-lg">
                  <h4 className="font-medium mb-2">Active Channel: {activeChannel.toUpperCase()}</h4>
                  <p className="text-sm text-muted-foreground">
                    All campaigns will use this channel. Switch channels to change communication method.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduling">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Campaign Scheduling & Rate Limits
              </CardTitle>
              <CardDescription>
                Set per-hour lead limits and campaign schedules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="hourly-limit">Hourly Lead Limit</Label>
                <div className="mt-2 space-y-3">
                  <Slider
                    value={hourlyLimit}
                    onValueChange={setHourlyLimit}
                    max={100}
                    min={1}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 lead/hour</span>
                    <span className="font-medium">{hourlyLimit[0]} leads/hour</span>
                    <span>Unlimited</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time">Campaign Start Time</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8am">8:00 AM</SelectItem>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="10am">10:00 AM</SelectItem>
                      <SelectItem value="11am">11:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="end-time">Campaign End Time</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4pm">4:00 PM</SelectItem>
                      <SelectItem value="5pm">5:00 PM</SelectItem>
                      <SelectItem value="6pm">6:00 PM</SelectItem>
                      <SelectItem value="7pm">7:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Quick Settings</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  <Button variant="outline" onClick={() => setHourlyLimit([15])}>
                    15/hour
                  </Button>
                  <Button variant="outline" onClick={() => setHourlyLimit([30])}>
                    30/hour
                  </Button>
                  <Button variant="outline" onClick={() => setHourlyLimit([50])}>
                    50/hour
                  </Button>
                  <Button variant="outline" onClick={() => setHourlyLimit([100])}>
                    Unlimited
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}