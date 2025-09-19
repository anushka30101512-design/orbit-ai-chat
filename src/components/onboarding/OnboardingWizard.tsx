import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Building2, Stethoscope, Pill, Home, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { useDemo } from '@/hooks/useDemo';

const steps = [
  {
    title: 'Welcome',
    description: 'Let\'s get your account set up',
  },
  {
    title: 'Business Info',
    description: 'Tell us about your business',
  },
  {
    title: 'Industry Vertical',
    description: 'Choose your industry',
  },
  {
    title: 'Email Setup',
    description: 'Connect your email account',
  },
  {
    title: 'Plan Selection',
    description: 'Choose your plan',
  },
  {
    title: 'Complete',
    description: 'You\'re all set!',
  },
];

const verticals = [
  {
    id: 'dentist',
    name: 'Dental Practice',
    description: 'Appointment scheduling, reminders, and patient care',
    icon: Stethoscope,
    color: 'bg-blue-500',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    description: 'Prescription notifications and refill reminders',
    icon: Pill,
    color: 'bg-green-500',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Lead follow-up and property notifications',
    icon: Home,
    color: 'bg-orange-500',
  },
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Policy renewals and claim follow-ups',
    icon: Shield,
    color: 'bg-purple-500',
  },
];

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$49',
    period: 'month',
    features: ['Up to 500 calls/month', '2 AI assistants', 'Basic analytics', 'Email support'],
    recommended: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$149',
    period: 'month',
    features: ['Up to 2,000 calls/month', '5 AI assistants', 'Advanced analytics', 'Priority support', 'CRM integrations'],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$399',
    period: 'month',
    features: ['Unlimited calls', 'Unlimited assistants', 'Custom analytics', 'Dedicated support', 'White-label'],
    recommended: false,
  },
];

interface OnboardingWizardProps {
  onComplete: () => void;
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    phone: '',
    vertical: '',
    emailProvider: '',
    plan: 'professional',
  });
  const { updateUser, completeOnboarding, isLoading } = useDemo();

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    await updateUser({
      name: formData.fullName,
      company: formData.companyName,
      vertical: formData.vertical as any,
      plan: formData.plan as any,
    });
    await completeOnboarding();
    onComplete();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Autonyze</h2>
              <p className="text-muted-foreground">
                Let's set up your AI-powered communication platform in just a few steps.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Tell us about your business</h2>
              <p className="text-muted-foreground">
                This helps us customize your experience.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="fullName">Your Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose your industry</h2>
              <p className="text-muted-foreground">
                We'll customize templates and features for your specific needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verticals.map((vertical) => {
                const Icon = vertical.icon;
                return (
                  <Card
                    key={vertical.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.vertical === vertical.id
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setFormData({ ...formData, vertical: vertical.id })}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${vertical.color} text-white`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{vertical.name}</h3>
                          <p className="text-sm text-muted-foreground">{vertical.description}</p>
                        </div>
                        {formData.vertical === vertical.id && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Connect your email</h2>
              <p className="text-muted-foreground">
                Connect your email account to send campaigns (this is a demo - no real connection).
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="emailProvider">Email Provider</Label>
                <Select
                  value={formData.emailProvider}
                  onValueChange={(value) => setFormData({ ...formData, emailProvider: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your email provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gmail">Gmail</SelectItem>
                    <SelectItem value="outlook">Outlook</SelectItem>
                    <SelectItem value="yahoo">Yahoo Mail</SelectItem>
                    <SelectItem value="other">Other SMTP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Demo Note:</strong> In the full version, you would authenticate with your email provider here.
                  For this demo, just select your provider and continue.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose your plan</h2>
              <p className="text-muted-foreground">
                Start with a 14-day free trial. Change or cancel anytime.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all hover:shadow-md relative ${
                    formData.plan === plan.id
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setFormData({ ...formData, plan: plan.id })}
                >
                  {plan.recommended && (
                    <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
                      Recommended
                    </Badge>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">You're all set!</h2>
              <p className="text-muted-foreground">
                Your account has been configured. You can now start creating AI assistants and campaigns.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">What's next?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create your first AI assistant</li>
                <li>• Import your leads</li>
                <li>• Set up your first campaign</li>
                <li>• Configure phone numbers</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName && formData.fullName;
      case 2:
        return formData.vertical;
      case 3:
        return formData.emailProvider;
      case 4:
        return formData.plan;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        
        <CardContent className="min-h-[400px]">
          {renderStepContent()}
        </CardContent>

        <div className="p-6 border-t flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button onClick={handleComplete} disabled={isLoading}>
              Complete Setup
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}