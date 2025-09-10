import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  PhoneCall,
  Clock,
  DollarSign,
  Heart,
  AlertTriangle,
  Download,
  Filter,
} from 'lucide-react';
import { DateRange } from 'react-day-picker';
import apiService from '@/lib/api';

interface AnalyticsData {
  callVolume: Array<{ date: string; inbound: number; outbound: number; total: number }>;
  callOutcomes: Array<{ name: string; value: number; color: string }>;
  assistantPerformance: Array<{
    name: string;
    calls: number;
    successRate: number;
    avgDuration: number;
    satisfaction: number;
  }>;
  sentimentAnalysis: Array<{ date: string; positive: number; neutral: number; negative: number }>;
  hourlyDistribution: Array<{ hour: string; calls: number }>;
  costAnalysis: Array<{ date: string; cost: number; revenue: number }>;
}

interface AnalyticsSummary {
  totalCalls: number;
  callsTrend: number;
  successRate: number;
  successTrend: number;
  avgDuration: string;
  durationTrend: number;
  totalCost: number;
  costTrend: number;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--destructive))', 'hsl(var(--muted))'];

export const AnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [selectedAssistant, setSelectedAssistant] = useState<string>('all');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with real API calls
  useEffect(() => {
    const loadAnalyticsData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData: AnalyticsData = {
          callVolume: [
            { date: '2024-01-01', inbound: 45, outbound: 32, total: 77 },
            { date: '2024-01-02', inbound: 52, outbound: 28, total: 80 },
            { date: '2024-01-03', inbound: 38, outbound: 35, total: 73 },
            { date: '2024-01-04', inbound: 61, outbound: 42, total: 103 },
            { date: '2024-01-05', inbound: 49, outbound: 38, total: 87 },
            { date: '2024-01-06', inbound: 55, outbound: 45, total: 100 },
            { date: '2024-01-07', inbound: 43, outbound: 31, total: 74 },
          ],
          callOutcomes: [
            { name: 'Successful', value: 68, color: COLORS[0] },
            { name: 'Failed', value: 15, color: COLORS[2] },
            { name: 'Abandoned', value: 12, color: COLORS[3] },
            { name: 'Transferred', value: 5, color: COLORS[1] },
          ],
          assistantPerformance: [
            { name: 'Sales Assistant', calls: 245, successRate: 85, avgDuration: 3.2, satisfaction: 4.5 },
            { name: 'Support Agent', calls: 189, successRate: 92, avgDuration: 4.8, satisfaction: 4.7 },
            { name: 'Tech Support', calls: 156, successRate: 78, avgDuration: 6.1, satisfaction: 4.2 },
            { name: 'Scheduler', calls: 134, successRate: 95, avgDuration: 2.1, satisfaction: 4.8 },
          ],
          sentimentAnalysis: [
            { date: '2024-01-01', positive: 65, neutral: 25, negative: 10 },
            { date: '2024-01-02', positive: 72, neutral: 20, negative: 8 },
            { date: '2024-01-03', positive: 58, neutral: 30, negative: 12 },
            { date: '2024-01-04', positive: 75, neutral: 18, negative: 7 },
            { date: '2024-01-05', positive: 68, neutral: 22, negative: 10 },
            { date: '2024-01-06', positive: 80, neutral: 15, negative: 5 },
            { date: '2024-01-07', positive: 63, neutral: 27, negative: 10 },
          ],
          hourlyDistribution: [
            { hour: '00:00', calls: 5 }, { hour: '01:00', calls: 3 }, { hour: '02:00', calls: 2 },
            { hour: '03:00', calls: 1 }, { hour: '04:00', calls: 2 }, { hour: '05:00', calls: 4 },
            { hour: '06:00', calls: 8 }, { hour: '07:00', calls: 15 }, { hour: '08:00', calls: 25 },
            { hour: '09:00', calls: 35 }, { hour: '10:00', calls: 42 }, { hour: '11:00', calls: 38 },
            { hour: '12:00', calls: 45 }, { hour: '13:00', calls: 48 }, { hour: '14:00', calls: 52 },
            { hour: '15:00', calls: 49 }, { hour: '16:00', calls: 44 }, { hour: '17:00', calls: 36 },
            { hour: '18:00', calls: 28 }, { hour: '19:00', calls: 22 }, { hour: '20:00', calls: 18 },
            { hour: '21:00', calls: 12 }, { hour: '22:00', calls: 8 }, { hour: '23:00', calls: 6 },
          ],
          costAnalysis: [
            { date: '2024-01-01', cost: 125.50, revenue: 450.00 },
            { date: '2024-01-02', cost: 138.75, revenue: 520.00 },
            { date: '2024-01-03', cost: 115.20, revenue: 380.00 },
            { date: '2024-01-04', cost: 165.40, revenue: 680.00 },
            { date: '2024-01-05', cost: 142.30, revenue: 580.00 },
            { date: '2024-01-06', cost: 155.80, revenue: 620.00 },
            { date: '2024-01-07', cost: 118.60, revenue: 410.00 },
          ],
        };

        const mockSummary: AnalyticsSummary = {
          totalCalls: 594,
          callsTrend: 12.5,
          successRate: 85.2,
          successTrend: 3.2,
          avgDuration: '3:45',
          durationTrend: -5.1,
          totalCost: 961.55,
          costTrend: 8.7,
        };

        setAnalyticsData(mockData);
        setSummary(mockSummary);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalyticsData();
  }, [dateRange, selectedAssistant]);

  const exportData = () => {
    const csvContent = analyticsData ? JSON.stringify(analyticsData, null, 2) : '';
    const blob = new Blob([csvContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading || !analyticsData || !summary) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="stat-card">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-8 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          Analytics Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          <Select value={selectedAssistant} onValueChange={setSelectedAssistant}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter assistant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assistants</SelectItem>
              <SelectItem value="sales">Sales Assistant</SelectItem>
              <SelectItem value="support">Support Agent</SelectItem>
              <SelectItem value="tech">Tech Support</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportData} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Calls</p>
                <p className="text-2xl font-bold">{summary.totalCalls.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {summary.callsTrend > 0 ? (
                    <TrendingUp className="h-3 w-3 text-primary" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  )}
                  <span className={`text-xs ${summary.callsTrend > 0 ? 'text-primary' : 'text-destructive'}`}>
                    {Math.abs(summary.callsTrend)}%
                  </span>
                </div>
              </div>
              <PhoneCall className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{summary.successRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-primary" />
                  <span className="text-xs text-primary">+{summary.successTrend}%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
                <p className="text-2xl font-bold">{summary.avgDuration}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-accent" />
                  <span className="text-xs text-accent">{Math.abs(summary.durationTrend)}%</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">${summary.totalCost.toFixed(2)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-destructive" />
                  <span className="text-xs text-destructive">+{summary.costTrend}%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Volume Over Time */}
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Call Volume Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.callVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="inbound" stroke={COLORS[0]} strokeWidth={2} name="Inbound" />
                <Line type="monotone" dataKey="outbound" stroke={COLORS[1]} strokeWidth={2} name="Outbound" />
                <Line type="monotone" dataKey="total" stroke={COLORS[2]} strokeWidth={2} name="Total" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Call Outcomes */}
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Call Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.callOutcomes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.callOutcomes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData.sentimentAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="positive" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} name="Positive" />
                <Area type="monotone" dataKey="neutral" stackId="1" stroke={COLORS[3]} fill={COLORS[3]} name="Neutral" />
                <Area type="monotone" dataKey="negative" stackId="1" stroke={COLORS[2]} fill={COLORS[2]} name="Negative" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hourly Distribution */}
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Hourly Call Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.hourlyDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="calls" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Assistant Performance */}
      <Card className="stat-card">
        <CardHeader>
          <CardTitle>Assistant Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.assistantPerformance.map((assistant) => (
              <div key={assistant.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <h4 className="font-medium">{assistant.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{assistant.calls} calls</span>
                    <span>•</span>
                    <span>{assistant.avgDuration} min avg</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="font-bold text-primary">{assistant.successRate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Satisfaction</p>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-primary" />
                      <span className="font-bold">{assistant.satisfaction}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};