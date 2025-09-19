import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useDemo } from '@/hooks/useDemo';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Key, 
  Palette, 
  Database,
  Mail,
  MessageCircle,
  Phone,
  Globe,
  Eye,
  EyeOff,
  Building
} from 'lucide-react';

export default function Settings() {
  const { user } = useDemo();
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    campaignAlerts: true,
    lowCreditsAlert: true,
    
    // Channels
    callsEnabled: true,
    smsEnabled: true,
    emailEnabled: true,
    
    // Compliance
    autoOptOut: true,
    requireDoubleOptIn: false,
    gdprCompliance: true,
    
    // Branding
    companyLogo: '',
    primaryColor: '#1882FF',
    secondaryColor: '#448AFF',
    
    // API
    webhookUrl: '',
    apiKeyVisible: false,
  });

  const handleSave = async (section: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'Settings saved',
      description: `${section} settings have been updated successfully.`,
    });
  };

  const generateApiKey = () => {
    const newKey = 'ak_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    toast({
      title: 'API Key Generated',
      description: 'New API key has been generated. Please save it securely.',
    });
    return newKey;
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and platform configuration
        </p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how and when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, smsNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Get weekly performance summaries</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, weeklyReports: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Campaign Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notifications when campaigns start, pause, or complete</p>
                  </div>
                  <Switch
                    checked={settings.campaignAlerts}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, campaignAlerts: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Low Credits Alert</Label>
                    <p className="text-sm text-muted-foreground">Get notified when credits are running low</p>
                  </div>
                  <Switch
                    checked={settings.lowCreditsAlert}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, lowCreditsAlert: checked })
                    }
                  />
                </div>
              </div>
              <Button onClick={() => handleSave('Notification')}>
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Channels */}
        <TabsContent value="channels">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Voice Calls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Voice Calls</Label>
                  <Switch
                    checked={settings.callsEnabled}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, callsEnabled: checked })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Default Voice</Label>
                  <Select defaultValue="sarah">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah (Female)</SelectItem>
                      <SelectItem value="mike">Mike (Male)</SelectItem>
                      <SelectItem value="emma">Emma (Female)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Call Recording</Label>
                  <Select defaultValue="enabled">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Always Record</SelectItem>
                      <SelectItem value="disabled">Never Record</SelectItem>
                      <SelectItem value="ask">Ask Permission</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  SMS Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable SMS</Label>
                  <Switch
                    checked={settings.smsEnabled}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, smsEnabled: checked })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Auto-Reply Keywords</Label>
                  <Input placeholder="STOP, UNSUBSCRIBE, QUIT" />
                </div>
                <div className="space-y-2">
                  <Label>Message Length Limit</Label>
                  <Select defaultValue="160">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="160">160 characters</SelectItem>
                      <SelectItem value="320">320 characters</SelectItem>
                      <SelectItem value="480">480 characters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Email</Label>
                  <Switch
                    checked={settings.emailEnabled}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, emailEnabled: checked })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>From Name</Label>
                  <Input defaultValue={user.company} />
                </div>
                <div className="space-y-2">
                  <Label>Reply-To Email</Label>
                  <Input defaultValue={user.email} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Compliance */}
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Compliance Settings
              </CardTitle>
              <CardDescription>
                Ensure your communications comply with regulations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Auto Opt-Out Processing</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically process STOP, UNSUBSCRIBE, and similar keywords
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoOptOut}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, autoOptOut: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Require Double Opt-In</Label>
                    <p className="text-sm text-muted-foreground">
                      Require confirmation before adding contacts to campaigns
                    </p>
                  </div>
                  <Switch
                    checked={settings.requireDoubleOptIn}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, requireDoubleOptIn: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">GDPR Compliance</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable GDPR compliance features for EU contacts
                    </p>
                  </div>
                  <Switch
                    checked={settings.gdprCompliance}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, gdprCompliance: checked })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Opt-Out Keywords</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['STOP', 'UNSUBSCRIBE', 'QUIT', 'CANCEL', 'OPT-OUT', 'REMOVE'].map((keyword) => (
                    <Badge key={keyword} variant="outline" className="justify-center py-2">
                      {keyword}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline">Manage Keywords</Button>
              </div>

              <Button onClick={() => handleSave('Compliance')}>
                Save Compliance Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Brand Customization
              </CardTitle>
              <CardDescription>
                Customize the appearance of your communications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Company Logo</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Upload company logo</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Primary Color</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input 
                        type="color" 
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input 
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        placeholder="#1882FF"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Secondary Color</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input 
                        type="color" 
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input 
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                        placeholder="#448AFF"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Preview</Label>
                    <Card className="mt-2">
                      <CardContent className="p-4">
                        <div 
                          className="h-4 rounded mb-2"
                          style={{ backgroundColor: settings.primaryColor }}
                        />
                        <div className="space-y-2">
                          <div className="h-2 bg-muted rounded w-3/4" />
                          <div className="h-2 bg-muted rounded w-1/2" />
                          <div 
                            className="h-8 rounded flex items-center justify-center text-white text-sm font-medium"
                            style={{ backgroundColor: settings.secondaryColor }}
                          >
                            Button Preview
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave('Branding')}>
                Save Branding Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  API Configuration
                </CardTitle>
                <CardDescription>
                  Manage API keys and webhook settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>API Key</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      type={showApiKey ? 'text' : 'password'}
                      value="ak_demo_1234567890abcdef"
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use this key to authenticate API requests
                  </p>
                </div>

                <div>
                  <Label>Webhook URL</Label>
                  <Input
                    placeholder="https://your-domain.com/webhook"
                    value={settings.webhookUrl}
                    onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Receive real-time notifications about campaign events
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={() => generateApiKey()}>
                    Generate New Key
                  </Button>
                  <Button variant="outline">
                    Test Webhook
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>
                  Manage your external integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Globe className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Google Workspace</p>
                        <p className="text-sm text-muted-foreground">Email integration</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Database className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Salesforce CRM</p>
                        <p className="text-sm text-muted-foreground">Lead management</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="Enter current password" className="mt-2" />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Enter new password" className="mt-2" />
                  </div>
                  <div>
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Confirm new password" className="mt-2" />
                  </div>
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">Use an app like Google Authenticator</p>
                  </div>
                  <Badge variant="outline">Not Enabled</Badge>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                  Monitor and manage your active sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on macOS • New York, NY</p>
                    </div>
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Mobile App</p>
                      <p className="text-sm text-muted-foreground">iPhone • 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}