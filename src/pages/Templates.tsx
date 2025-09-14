import { useState } from "react";
import { MessageSquare, Phone, Mail, Plus, Edit, Copy, Trash2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Template {
  id: string;
  name: string;
  type: "call" | "sms" | "email";
  vertical: "dental" | "pharmacy" | "real-estate" | "insurance" | "custom";
  content: string;
  variables: string[];
  isActive: boolean;
  lastUsed: string;
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Dental Cleaning Reminder",
      type: "call",
      vertical: "dental",
      content: "Hi {name}, this is {practice_name}. We wanted to remind you that it's time for your regular dental cleaning. Would you like to schedule an appointment?",
      variables: ["{name}", "{practice_name}"],
      isActive: true,
      lastUsed: "2024-01-15"
    },
    {
      id: "2", 
      name: "Prescription Ready SMS",
      type: "sms",
      vertical: "pharmacy",
      content: "Hello {name}, your prescription for {medication} is ready for pickup at {pharmacy_name}. Reply STOP to opt out.",
      variables: ["{name}", "{medication}", "{pharmacy_name}"],
      isActive: true,
      lastUsed: "2024-01-14"
    },
    {
      id: "3",
      name: "Property Viewing Follow-up", 
      type: "email",
      vertical: "real-estate",
      content: "Hi {name}, Thank you for viewing {property_address} yesterday. I wanted to follow up and see if you have any questions about the property. Best regards, {agent_name}",
      variables: ["{name}", "{property_address}", "{agent_name}"],
      isActive: false,
      lastUsed: "2024-01-10"
    }
  ]);

  const [selectedVertical, setSelectedVertical] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredTemplates = templates.filter(template => {
    const matchesVertical = selectedVertical === "all" || template.vertical === selectedVertical;
    const matchesType = selectedType === "all" || template.type === selectedType;
    return matchesVertical && matchesType;
  });

  const getTypeIcon = (type: Template["type"]) => {
    const icons = {
      call: Phone,
      sms: MessageSquare,
      email: Mail
    };
    const IconComponent = icons[type];
    return <IconComponent className="w-4 h-4" />;
  };

  const getVerticalColor = (vertical: Template["vertical"]) => {
    const colors = {
      dental: "bg-blue-100 text-blue-800",
      pharmacy: "bg-green-100 text-green-800", 
      "real-estate": "bg-purple-100 text-purple-800",
      insurance: "bg-orange-100 text-orange-800",
      custom: "bg-gray-100 text-gray-800"
    };
    return colors[vertical];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Template Library</h1>
          <p className="text-muted-foreground">Manage communication templates for all channels and verticals</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Design a new template for your campaigns
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="templateName">Template Name</Label>
                  <Input id="templateName" placeholder="Enter template name" />
                </div>
                <div>
                  <Label htmlFor="templateType">Communication Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Voice Call</SelectItem>
                      <SelectItem value="sms">SMS Message</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="templateVertical">Business Vertical</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vertical" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dental">Dental</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="templateContent">Template Content</Label>
                <Textarea 
                  id="templateContent"
                  placeholder="Enter your template content. Use {variable_name} for dynamic content."
                  rows={6}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Create Template</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all-templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all-templates">All Templates</TabsTrigger>
          <TabsTrigger value="starter-templates">Starter Templates</TabsTrigger>
          <TabsTrigger value="variables">Variable Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="all-templates">
          <div className="flex gap-4 mb-6">
            <Select value={selectedVertical} onValueChange={setSelectedVertical}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Verticals</SelectItem>
                <SelectItem value="dental">Dental</SelectItem>
                <SelectItem value="pharmacy">Pharmacy</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="call">Voice Calls</SelectItem>
                <SelectItem value="sms">SMS Messages</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="stat-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {getTypeIcon(template.type)}
                        {template.name}
                      </CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getVerticalColor(template.vertical)}>
                          {template.vertical.replace('-', ' ')}
                        </Badge>
                        <Badge variant="outline">
                          {template.type.toUpperCase()}
                        </Badge>
                        {template.isActive && (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">CONTENT PREVIEW</Label>
                      <div className="mt-1 p-3 bg-accent/10 rounded-lg text-sm">
                        {template.content}
                      </div>
                    </div>
                    
                    {template.variables.length > 0 && (
                      <div>
                        <Label className="text-xs text-muted-foreground">VARIABLES</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {template.variables.map((variable, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {variable}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground">
                      Last used: {template.lastUsed}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="starter-templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="stat-card cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  Dental Call Scripts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Pre-built call scripts for dental practices</p>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Browse Templates
                </Button>
              </CardContent>
            </Card>
            
            <Card className="stat-card cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <MessageSquare className="w-4 h-4" />
                  Pharmacy SMS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">SMS templates for prescription notifications</p>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Browse Templates
                </Button>
              </CardContent>
            </Card>
            
            <Card className="stat-card cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  Real Estate Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Email templates for property follow-ups</p>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Browse Templates
                </Button>
              </CardContent>
            </Card>
            
            <Card className="stat-card cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  Insurance Calls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Call scripts for insurance brokers</p>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Browse Templates
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="variables">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Dynamic Variables Guide</CardTitle>
              <CardDescription>
                Use these variables in your templates to personalize messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Lead Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <code className="bg-accent/10 px-2 py-1 rounded">{"{name}"}</code>
                      <span className="text-muted-foreground">Lead's full name</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-accent/10 px-2 py-1 rounded">{"{first_name}"}</code>
                      <span className="text-muted-foreground">Lead's first name</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-accent/10 px-2 py-1 rounded">{"{email}"}</code>
                      <span className="text-muted-foreground">Email address</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-accent/10 px-2 py-1 rounded">{"{phone}"}</code>
                      <span className="text-muted-foreground">Phone number</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Business Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <code className="bg-accent/10 px-2 py-1 rounded">{"{business_name}"}</code>
                      <span className="text-muted-foreground">Your business name</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-accent/10 px-2 py-1 rounded">{"{agent_name}"}</code>
                      <span className="text-muted-foreground">Agent/rep name</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-accent/10 px-2 py-1 rounded">{"{website}"}</code>
                      <span className="text-muted-foreground">Business website</span>
                    </div>
                    <div className="flex justify-between">
                      <code className="bg-accent/10 px-2 py-1 rounded">{"{address}"}</code>
                      <span className="text-muted-foreground">Business address</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}