import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Users, Phone, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNotifications } from '@/components/ui/notification-system';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: {
    assistants: number;
    callMinutes: number;
    phoneNumbers: number;
    support: string;
  };
}

interface UsageStats {
  assistants: { used: number; limit: number };
  callMinutes: { used: number; limit: number };
  phoneNumbers: { used: number; limit: number };
}

const PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    interval: 'monthly',
    features: {
      assistants: 3,
      callMinutes: 100,
      phoneNumbers: 1,
      support: 'Email',
    },
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 99,
    interval: 'monthly',
    features: {
      assistants: 10,
      callMinutes: 500,
      phoneNumbers: 5,
      support: 'Priority',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    interval: 'monthly',
    features: {
      assistants: -1, // Unlimited
      callMinutes: 2000,
      phoneNumbers: 20,
      support: 'Dedicated',
    },
  },
];

export default function Subscription() {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>(PLANS[0]);
  const [usageStats, setUsageStats] = useState<UsageStats>({
    assistants: { used: 2, limit: 3 },
    callMinutes: { used: 45, limit: 100 },
    phoneNumbers: { used: 1, limit: 1 },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotifications();

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-destructive';
    if (percentage >= 75) return 'text-accent';
    return 'text-primary';
  };

  const handlePlanUpgrade = async (planId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPlan = PLANS.find(p => p.id === planId);
      if (newPlan) {
        setCurrentPlan(newPlan);
        addNotification({
          type: 'success',
          title: 'Plan Updated',
          message: `Successfully upgraded to ${newPlan.name} plan!`,
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Upgrade Failed',
        message: 'Failed to upgrade plan. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addNotification({
        type: 'warning',
        title: 'Subscription Canceled',
        message: 'Your subscription will be canceled at the end of the current billing period.',
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Cancellation Failed',
        message: 'Failed to cancel subscription. Please contact support.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check for usage alerts
  useEffect(() => {
    Object.entries(usageStats).forEach(([key, { used, limit }]) => {
      const percentage = getUsagePercentage(used, limit);
      if (percentage >= 90) {
        addNotification({
          type: 'warning',
          title: 'Usage Alert',
          message: `${key} usage is at ${percentage.toFixed(0)}% of your limit.`,
          persistent: true,
        });
      }
    });
  }, [usageStats, addNotification]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <CreditCard className="h-8 w-8 text-primary" />
          Subscription Management
        </h1>
      </div>

      {/* Current Plan */}
      <Card className="stat-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Plan</span>
            <Badge className="bg-primary/10 text-primary">{currentPlan.name}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-foreground">
                ${currentPlan.price}/{currentPlan.interval}
              </p>
              <p className="text-sm text-muted-foreground">
                Next billing: January 15, 2024
              </p>
            </div>
            <Button variant="outline" onClick={handleCancelSubscription} disabled={isLoading}>
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card className="stat-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Usage Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Assistants */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Assistants</span>
                </div>
                <span className={`text-sm font-bold ${getUsageColor(getUsagePercentage(usageStats.assistants.used, usageStats.assistants.limit))}`}>
                  {usageStats.assistants.used}/{usageStats.assistants.limit === -1 ? '∞' : usageStats.assistants.limit}
                </span>
              </div>
              <Progress 
                value={getUsagePercentage(usageStats.assistants.used, usageStats.assistants.limit)} 
                className="h-2"
              />
            </div>

            {/* Call Minutes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Call Minutes</span>
                </div>
                <span className={`text-sm font-bold ${getUsageColor(getUsagePercentage(usageStats.callMinutes.used, usageStats.callMinutes.limit))}`}>
                  {usageStats.callMinutes.used}/{usageStats.callMinutes.limit}
                </span>
              </div>
              <Progress 
                value={getUsagePercentage(usageStats.callMinutes.used, usageStats.callMinutes.limit)} 
                className="h-2"
              />
            </div>

            {/* Phone Numbers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Phone Numbers</span>
                </div>
                <span className={`text-sm font-bold ${getUsageColor(getUsagePercentage(usageStats.phoneNumbers.used, usageStats.phoneNumbers.limit))}`}>
                  {usageStats.phoneNumbers.used}/{usageStats.phoneNumbers.limit}
                </span>
              </div>
              <Progress 
                value={getUsagePercentage(usageStats.phoneNumbers.used, usageStats.phoneNumbers.limit)} 
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card className="stat-card">
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 rounded-lg border transition-all ${
                  plan.id === currentPlan.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <p className="text-2xl font-bold text-primary">
                    ${plan.price}
                    <span className="text-sm text-muted-foreground">/{plan.interval}</span>
                  </p>
                </div>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center justify-between text-sm">
                    <span>Assistants</span>
                    <span className="font-medium">
                      {plan.features.assistants === -1 ? 'Unlimited' : plan.features.assistants}
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>Call Minutes</span>
                    <span className="font-medium">{plan.features.callMinutes}/month</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>Phone Numbers</span>
                    <span className="font-medium">{plan.features.phoneNumbers}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>Support</span>
                    <span className="font-medium">{plan.features.support}</span>
                  </li>
                </ul>

                <Button
                  className="w-full"
                  variant={plan.id === currentPlan.id ? 'outline' : 'default'}
                  disabled={plan.id === currentPlan.id || isLoading}
                  onClick={() => handlePlanUpgrade(plan.id)}
                >
                  {plan.id === currentPlan.id ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}