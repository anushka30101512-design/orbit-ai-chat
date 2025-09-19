import { useState, useEffect } from 'react';
import { 
  mockUser, 
  mockAssistants, 
  mockPhoneNumbers, 
  mockLeads, 
  mockCampaigns, 
  mockTemplates,
  mockDashboardMetrics,
  type User,
  type Assistant,
  type PhoneNumber,
  type Lead,
  type Campaign,
  type Template,
} from '@/data/mockData';

// Demo state management with localStorage persistence
export function useDemo() {
  const [user, setUser] = useState<User | null>(null);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize demo data
  useEffect(() => {
    const savedUser = localStorage.getItem('demo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(mockUser);
      localStorage.setItem('demo_user', JSON.stringify(mockUser));
    }

    setAssistants(mockAssistants);
    setPhoneNumbers(mockPhoneNumbers);
    setLeads(mockLeads);
    setCampaigns(mockCampaigns);
    setTemplates(mockTemplates);
  }, []);

  // Simulate API loading delay
  const simulateLoading = async (duration = 1000) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsLoading(false);
  };

  // User actions
  const updateUser = async (updates: Partial<User>) => {
    await simulateLoading(500);
    const updatedUser = { ...user!, ...updates };
    setUser(updatedUser);
    localStorage.setItem('demo_user', JSON.stringify(updatedUser));
  };

  const completeOnboarding = async () => {
    await updateUser({ onboardingCompleted: true });
  };

  // Assistant actions
  const createAssistant = async (assistantData: Omit<Assistant, 'id' | 'createdAt' | 'campaignCount'>) => {
    await simulateLoading();
    const newAssistant: Assistant = {
      ...assistantData,
      id: String(Date.now()),
      createdAt: new Date(),
      campaignCount: 0,
    };
    setAssistants(prev => [...prev, newAssistant]);
    return newAssistant;
  };

  const updateAssistant = async (id: string, updates: Partial<Assistant>) => {
    await simulateLoading(500);
    setAssistants(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAssistant = async (id: string) => {
    await simulateLoading(500);
    setAssistants(prev => prev.filter(a => a.id !== id));
  };

  // Phone number actions
  const createPhoneNumber = async (phoneData: Omit<PhoneNumber, 'id' | 'createdAt' | 'totalCalls'>) => {
    await simulateLoading();
    const newPhone: PhoneNumber = {
      ...phoneData,
      id: String(Date.now()),
      createdAt: new Date(),
      totalCalls: 0,
    };
    setPhoneNumbers(prev => [...prev, newPhone]);
    return newPhone;
  };

  const updatePhoneNumber = async (id: string, updates: Partial<PhoneNumber>) => {
    await simulateLoading(500);
    setPhoneNumbers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePhoneNumber = async (id: string) => {
    await simulateLoading(500);
    setPhoneNumbers(prev => prev.filter(p => p.id !== id));
  };

  // Lead actions
  const createLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'score'>) => {
    await simulateLoading();
    const newLead: Lead = {
      ...leadData,
      id: String(Date.now()),
      createdAt: new Date(),
      score: Math.floor(Math.random() * 100) + 1,
    };
    setLeads(prev => [...prev, newLead]);
    return newLead;
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    await simulateLoading(500);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const deleteLead = async (id: string) => {
    await simulateLoading(500);
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const bulkUpdateLeads = async (ids: string[], updates: Partial<Lead>) => {
    await simulateLoading();
    setLeads(prev => prev.map(l => ids.includes(l.id) ? { ...l, ...updates } : l));
  };

  // Campaign actions
  const createCampaign = async (campaignData: Omit<Campaign, 'id' | 'createdAt' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed'>) => {
    await simulateLoading();
    const newCampaign: Campaign = {
      ...campaignData,
      id: String(Date.now()),
      createdAt: new Date(),
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      failed: 0,
    };
    setCampaigns(prev => [...prev, newCampaign]);
    return newCampaign;
  };

  const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
    await simulateLoading(500);
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCampaign = async (id: string) => {
    await simulateLoading(500);
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const startCampaign = async (id: string) => {
    await simulateLoading();
    setCampaigns(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'running' as const, startedAt: new Date() } : c
    ));
  };

  const pauseCampaign = async (id: string) => {
    await simulateLoading();
    setCampaigns(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'paused' as const } : c
    ));
  };

  // Template actions
  const createTemplate = async (templateData: Omit<Template, 'id' | 'createdAt' | 'usageCount'>) => {
    await simulateLoading();
    const newTemplate: Template = {
      ...templateData,
      id: String(Date.now()),
      createdAt: new Date(),
      usageCount: 0,
    };
    setTemplates(prev => [...prev, newTemplate]);
    return newTemplate;
  };

  const updateTemplate = async (id: string, updates: Partial<Template>) => {
    await simulateLoading(500);
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTemplate = async (id: string) => {
    await simulateLoading(500);
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  return {
    // State
    user,
    assistants,
    phoneNumbers,
    leads,
    campaigns,
    templates,
    isLoading,
    metrics: mockDashboardMetrics,

    // User actions
    updateUser,
    completeOnboarding,

    // Assistant actions
    createAssistant,
    updateAssistant,
    deleteAssistant,

    // Phone number actions
    createPhoneNumber,
    updatePhoneNumber,
    deletePhoneNumber,

    // Lead actions
    createLead,
    updateLead,
    deleteLead,
    bulkUpdateLeads,

    // Campaign actions
    createCampaign,
    updateCampaign,
    deleteCampaign,
    startCampaign,
    pauseCampaign,

    // Template actions
    createTemplate,
    updateTemplate,
    deleteTemplate,

    // Utility
    simulateLoading,
  };
}