// Mock data for the multi-tenant SaaS platform
import { faker } from '@faker-js/faker';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user';
  company: string;
  vertical: 'dentist' | 'pharmacy' | 'real-estate' | 'insurance';
  onboardingCompleted: boolean;
  trialDaysLeft: number;
  plan: 'starter' | 'professional' | 'enterprise';
  createdAt: Date;
}

export interface Assistant {
  id: string;
  name: string;
  description: string;
  voice: string;
  language: string;
  instructions: string;
  isActive: boolean;
  phoneNumberId?: string;
  campaignCount: number;
  lastUsed?: Date;
  createdAt: Date;
}

export interface PhoneNumber {
  id: string;
  number: string;
  type: 'local' | 'toll-free';
  area_code: string;
  country: string;
  status: 'active' | 'inactive';
  assignedAssistant?: string;
  totalCalls: number;
  monthlyCost: number;
  capabilities: string[];
  createdAt: Date;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  title?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'opted-out';
  source: string;
  tags: string[];
  lastContacted?: Date;
  isOptedOut: boolean;
  customFields: Record<string, any>;
  score: number;
  createdAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  channel: 'calls' | 'sms' | 'email';
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed';
  templateId: string;
  assistantId?: string;
  phoneNumberId?: string;
  targets: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
  hourlyLimit: number;
  schedule: {
    startDate: Date;
    endDate?: Date;
    timeWindows: { start: string; end: string }[];
    timezone: string;
  };
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface Template {
  id: string;
  name: string;
  type: 'call' | 'sms' | 'email';
  vertical: string;
  subject?: string;
  content: string;
  placeholders: string[];
  isActive: boolean;
  usageCount: number;
  createdAt: Date;
}

export interface Call {
  id: string;
  campaignId?: string;
  leadId: string;
  assistantId: string;
  phoneNumberId: string;
  destination: string;
  status: 'completed' | 'failed' | 'busy' | 'no-answer';
  duration: number;
  cost: number;
  transcript?: string;
  summary?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  outcome?: string;
  recordingUrl?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  campaignId?: string;
  leadId: string;
  type: 'sms' | 'email';
  direction: 'inbound' | 'outbound';
  subject?: string;
  content: string;
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed';
  fromAddress: string;
  toAddress: string;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  leadId: string;
  assistantId?: string;
  subject: string;
  status: 'open' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high';
  lastMessageAt: Date;
  messageCount: number;
  type: 'support' | 'sales' | 'follow-up';
  assignedTo?: string;
  createdAt: Date;
}

// Generate mock data
export const mockUser: User = {
  id: '1',
  email: 'demo@autonyze.com',
  name: 'Dr. Sarah Johnson',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
  role: 'admin',
  company: 'Modern Dental Care',
  vertical: 'dentist',
  onboardingCompleted: true,
  trialDaysLeft: 14,
  plan: 'professional',
  createdAt: new Date('2024-01-15'),
};

export const mockAssistants: Assistant[] = [
  {
    id: '1',
    name: 'Sarah - Appointment Scheduler',
    description: 'Friendly assistant for scheduling dental appointments',
    voice: 'sarah',
    language: 'en-US',
    instructions: 'You are a helpful dental office assistant. Be warm, professional, and help patients schedule appointments.',
    isActive: true,
    phoneNumberId: '1',
    campaignCount: 3,
    lastUsed: new Date('2024-09-18'),
    createdAt: new Date('2024-08-15'),
  },
  {
    id: '2',
    name: 'Mike - Insurance Verifier',
    description: 'Specialized in insurance verification calls',
    voice: 'mike',
    language: 'en-US',
    instructions: 'You help verify insurance coverage and explain benefits to patients.',
    isActive: true,
    campaignCount: 1,
    lastUsed: new Date('2024-09-17'),
    createdAt: new Date('2024-08-20'),
  },
  {
    id: '3',
    name: 'Emma - Follow-up Specialist',
    description: 'Post-treatment follow-up and care reminders',
    voice: 'emma',
    language: 'en-US',
    instructions: 'You conduct post-treatment follow-ups and remind patients about care instructions.',
    isActive: false,
    campaignCount: 0,
    createdAt: new Date('2024-09-01'),
  },
];

export const mockPhoneNumbers: PhoneNumber[] = [
  {
    id: '1',
    number: '+1 (555) 123-4567',
    type: 'local',
    area_code: '555',
    country: 'US',
    status: 'active',
    assignedAssistant: 'Sarah - Appointment Scheduler',
    totalCalls: 847,
    monthlyCost: 15.00,
    capabilities: ['voice', 'sms'],
    createdAt: new Date('2024-08-15'),
  },
  {
    id: '2',
    number: '+1 (888) 555-0123',
    type: 'toll-free',
    area_code: '888',
    country: 'US',
    status: 'active',
    assignedAssistant: 'Mike - Insurance Verifier',
    totalCalls: 234,
    monthlyCost: 25.00,
    capabilities: ['voice', 'sms'],
    createdAt: new Date('2024-08-20'),
  },
  {
    id: '3',
    number: '+1 (555) 987-6543',
    type: 'local',
    area_code: '555',
    country: 'US',
    status: 'inactive',
    totalCalls: 0,
    monthlyCost: 15.00,
    capabilities: ['voice', 'sms'],
    createdAt: new Date('2024-09-01'),
  },
];

// Generate dynamic mock data
export const generateMockLeads = (count: number = 50): Lead[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    company: faker.company.name(),
    title: faker.person.jobTitle(),
    status: faker.helpers.arrayElement(['new', 'contacted', 'qualified', 'converted', 'opted-out']),
    source: faker.helpers.arrayElement(['Website', 'Google Ads', 'Referral', 'Social Media', 'Cold Outreach']),
    tags: faker.helpers.arrayElements(['High Priority', 'Insurance', 'Emergency', 'Routine', 'Consultation'], { min: 0, max: 3 }),
    lastContacted: faker.helpers.maybe(() => faker.date.recent({ days: 30 })),
    isOptedOut: faker.datatype.boolean({ probability: 0.05 }),
    customFields: {
      preferredTime: faker.helpers.arrayElement(['Morning', 'Afternoon', 'Evening']),
      insuranceProvider: faker.helpers.arrayElement(['Blue Cross', 'Aetna', 'UnitedHealth', 'Cigna', 'None']),
    },
    score: faker.number.int({ min: 1, max: 100 }),
    createdAt: faker.date.recent({ days: 60 }),
  }));
};

export const generateMockCampaigns = (count: number = 10): Campaign[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: faker.helpers.arrayElement([
      'Appointment Reminders',
      'Insurance Verification',
      'Follow-up Calls',
      'New Patient Welcome',
      'Treatment Plans',
      'Cleaning Reminders',
      'Emergency Availability',
      'Satisfaction Survey',
    ]),
    description: faker.lorem.sentence(),
    channel: faker.helpers.arrayElement(['calls', 'sms', 'email']),
    status: faker.helpers.arrayElement(['draft', 'scheduled', 'running', 'paused', 'completed']),
    templateId: String(faker.number.int({ min: 1, max: 5 })),
    assistantId: faker.helpers.maybe(() => String(faker.number.int({ min: 1, max: 3 }))),
    phoneNumberId: faker.helpers.maybe(() => String(faker.number.int({ min: 1, max: 3 }))),
    targets: faker.number.int({ min: 50, max: 500 }),
    sent: faker.number.int({ min: 0, max: 300 }),
    delivered: faker.number.int({ min: 0, max: 250 }),
    opened: faker.number.int({ min: 0, max: 150 }),
    clicked: faker.number.int({ min: 0, max: 50 }),
    failed: faker.number.int({ min: 0, max: 20 }),
    hourlyLimit: faker.helpers.arrayElement([15, 30, 50, 100]),
    schedule: {
      startDate: faker.date.future(),
      endDate: faker.helpers.maybe(() => faker.date.future()),
      timeWindows: [
        { start: '09:00', end: '17:00' },
      ],
      timezone: 'America/New_York',
    },
    createdAt: faker.date.recent({ days: 30 }),
    startedAt: faker.helpers.maybe(() => faker.date.recent({ days: 10 })),
    completedAt: faker.helpers.maybe(() => faker.date.recent({ days: 5 })),
  }));
};

export const generateMockTemplates = (vertical: string): Template[] => {
  const templates = {
    dentist: [
      {
        name: 'Appointment Reminder Call',
        type: 'call' as const,
        subject: '',
        content: 'Hi {{name}}, this is a reminder about your dental appointment tomorrow at {{time}} with Dr. {{doctor}}. Please call us at {{phone}} if you need to reschedule.',
        placeholders: ['name', 'time', 'doctor', 'phone'],
      },
      {
        name: 'Insurance Verification SMS',
        type: 'sms' as const,
        subject: '',
        content: 'Hi {{name}}, we need to verify your insurance before your appointment. Please reply with your insurance provider and member ID.',
        placeholders: ['name'],
      },
      {
        name: 'Welcome New Patient Email',
        type: 'email' as const,
        subject: 'Welcome to {{practice_name}}!',
        content: 'Dear {{name}}, welcome to our dental practice! We look forward to seeing you on {{appointment_date}}. Please bring your insurance card and a valid ID.',
        placeholders: ['name', 'practice_name', 'appointment_date'],
      },
    ],
    pharmacy: [
      {
        name: 'Prescription Ready Call',
        type: 'call' as const,
        subject: '',
        content: 'Hi {{name}}, your prescription for {{medication}} is ready for pickup at {{pharmacy_name}}. We are open until {{closing_time}}.',
        placeholders: ['name', 'medication', 'pharmacy_name', 'closing_time'],
      },
      {
        name: 'Refill Reminder SMS',
        type: 'sms' as const,
        subject: '',
        content: 'Hi {{name}}, your {{medication}} prescription is running low. Reply YES to request a refill or call us at {{phone}}.',
        placeholders: ['name', 'medication', 'phone'],
      },
    ],
  };

  const verticalTemplates = templates[vertical as keyof typeof templates] || templates.dentist;
  
  return verticalTemplates.map((template, i) => ({
    id: String(i + 1),
    name: template.name,
    type: template.type,
    vertical,
    subject: template.subject,
    content: template.content,
    placeholders: template.placeholders,
    isActive: true,
    usageCount: faker.number.int({ min: 0, max: 50 }),
    createdAt: faker.date.recent({ days: 30 }),
  }));
};

export const mockLeads = generateMockLeads(50);
export const mockCampaigns = generateMockCampaigns(10);
export const mockTemplates = generateMockTemplates(mockUser.vertical);

// Dashboard metrics
export const mockDashboardMetrics = {
  totalLeads: mockLeads.length,
  totalCampaigns: mockCampaigns.length,
  activeCampaigns: mockCampaigns.filter(c => c.status === 'running').length,
  totalCalls: 1847,
  totalSMS: 2456,
  totalEmails: 3921,
  conversionRate: 12.5,
  averageCallDuration: 285,
  trialDaysLeft: mockUser.trialDaysLeft,
  planUsage: {
    calls: { used: 1847, limit: 5000 },
    sms: { used: 2456, limit: 10000 },
    emails: { used: 3921, limit: 25000 },
    assistants: { used: 3, limit: 10 },
  },
};