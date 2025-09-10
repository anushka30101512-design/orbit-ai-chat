import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, CheckCircle, AlertCircle } from 'lucide-react';
import { useNotifications } from '@/components/ui/notification-system';
import apiService from '@/lib/api';

interface VoiceOption {
  id: string;
  name: string;
  gender: 'male' | 'female';
  accent: string;
  description: string;
  previewUrl?: string;
}

interface AssistantFormData {
  name: string;
  type: 'inbound' | 'outbound';
  role: string;
  customRole?: string;
  tone: string;
  voiceId: string;
  phoneNumber: string;
  phoneProvider: 'twilio' | 'vapi' | 'byon';
  instructions: string;
  complexity: 'simple' | 'medium' | 'advanced';
  welcomeMessage?: string;
  endCallPhrase?: string;
}

const ROLES = [
  'Sales Representative',
  'Customer Support Agent',
  'Technical Support Specialist',
  'Appointment Scheduler',
  'Survey Conductor',
  'Lead Qualifier',
  'Order Processor',
  'Receptionist',
  'Other',
];

const TONES = [
  { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'assertive', label: 'Assertive', description: 'Confident and direct' },
  { value: 'empathetic', label: 'Empathetic', description: 'Understanding and supportive' },
  { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
];

const VOICES: VoiceOption[] = [
  { id: '9BWtsMINqrJLrRacOk9x', name: 'Aria', gender: 'female', accent: 'American', description: 'Professional and warm' },
  { id: 'CwhRBWXzGAHq8TQ4Fs17', name: 'Roger', gender: 'male', accent: 'American', description: 'Authoritative and clear' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah', gender: 'female', accent: 'British', description: 'Sophisticated and articulate' },
  { id: 'FGY2WhTYpPnrIDTdsKH5', name: 'Laura', gender: 'female', accent: 'American', description: 'Friendly and approachable' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', gender: 'male', accent: 'British', description: 'Calm and reassuring' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam', gender: 'male', accent: 'American', description: 'Energetic and persuasive' },
];

const STEPS = [
  { id: 'basic', title: 'Basic Information', description: 'Name, type, and role' },
  { id: 'voice', title: 'Voice Selection', description: 'Choose voice and tone' },
  { id: 'phone', title: 'Phone Setup', description: 'Number and provider' },
  { id: 'advanced', title: 'Advanced Settings', description: 'Instructions and complexity' },
  { id: 'review', title: 'Review & Create', description: 'Final review and creation' },
];

interface VoiceAssistantWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (assistant: any) => void;
}

export const VoiceAssistantWizard: React.FC<VoiceAssistantWizardProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<AssistantFormData>({
    name: '',
    type: 'inbound',
    role: '',
    tone: '',
    voiceId: '',
    phoneNumber: '',
    phoneProvider: 'twilio',
    instructions: '',
    complexity: 'medium',
  });
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  const updateFormData = (updates: Partial<AssistantFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Basic Information
        return formData.name && formData.type && formData.role;
      case 1: // Voice Selection
        return formData.voiceId && formData.tone;
      case 2: // Phone Setup
        return formData.phoneNumber && formData.phoneProvider;
      case 3: // Advanced Settings
        return formData.instructions;
      default:
        return true;
    }
  };

  const playVoicePreview = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
      // Stop audio playback
    } else {
      setPlayingVoice(voiceId);
      // Simulate audio playback
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  const handleCreateAssistant = async () => {
    setIsCreating(true);
    try {
      const assistantData = {
        ...formData,
        ...(formData.role === 'Other' && { role: formData.customRole }),
      };

      const response = await apiService.createAssistant(assistantData);
      
      addNotification({
        type: 'success',
        title: 'Assistant Created',
        message: `${formData.name} has been created successfully!`,
      });

      onSuccess?.(response);
      onClose();
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Creation Failed',
        message: error.message || 'Failed to create assistant. Please try again.',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Information
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Assistant Name</Label>
              <Input
                id="name"
                placeholder="e.g., Sales Assistant Pro"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="type">Assistant Type</Label>
              <Select value={formData.type} onValueChange={(value: 'inbound' | 'outbound') => updateFormData({ type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assistant type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbound">Inbound - Receives calls</SelectItem>
                  <SelectItem value="outbound">Outbound - Makes calls</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => updateFormData({ role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.role === 'Other' && (
              <div>
                <Label htmlFor="customRole">Custom Role</Label>
                <Input
                  id="customRole"
                  placeholder="Describe the custom role"
                  value={formData.customRole || ''}
                  onChange={(e) => updateFormData({ customRole: e.target.value })}
                />
              </div>
            )}
          </div>
        );

      case 1: // Voice Selection
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="tone">Assistant Tone</Label>
              <Select value={formData.tone} onValueChange={(value) => updateFormData({ tone: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      <div>
                        <div className="font-medium">{tone.label}</div>
                        <div className="text-xs text-muted-foreground">{tone.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Voice Selection</Label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {VOICES.map((voice) => (
                  <div
                    key={voice.id}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      formData.voiceId === voice.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => updateFormData({ voiceId: voice.id })}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{voice.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {voice.gender} • {voice.accent}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {voice.description}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          playVoicePreview(voice.id);
                        }}
                      >
                        {playingVoice === voice.id ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2: // Phone Setup
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneProvider">Phone Provider</Label>
              <Select value={formData.phoneProvider} onValueChange={(value: any) => updateFormData({ phoneProvider: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="vapi">VAPI</SelectItem>
                  <SelectItem value="byon">Bring Your Own Number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="+1 (555) 123-4567"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.phoneProvider === 'byon' 
                  ? 'Enter your existing phone number'
                  : 'Select or purchase a new number from available options'
                }
              </p>
            </div>
          </div>
        );

      case 3: // Advanced Settings
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="complexity">Script Complexity</Label>
              <Select value={formData.complexity} onValueChange={(value: any) => updateFormData({ complexity: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple - Basic Q&A</SelectItem>
                  <SelectItem value="medium">Medium - Structured conversations</SelectItem>
                  <SelectItem value="advanced">Advanced - Complex decision trees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="instructions">Assistant Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Provide detailed instructions for your assistant's behavior, responses, and goals..."
                value={formData.instructions}
                onChange={(e) => updateFormData({ instructions: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="welcomeMessage">Welcome Message (Optional)</Label>
              <Input
                id="welcomeMessage"
                placeholder="Hello! How can I assist you today?"
                value={formData.welcomeMessage || ''}
                onChange={(e) => updateFormData({ welcomeMessage: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="endCallPhrase">End Call Phrase (Optional)</Label>
              <Input
                id="endCallPhrase"
                placeholder="Thank you for calling. Have a great day!"
                value={formData.endCallPhrase || ''}
                onChange={(e) => updateFormData({ endCallPhrase: e.target.value })}
              />
            </div>
          </div>
        );

      case 4: // Review
        return (
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Assistant Summary</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-medium capitalize">{formData.type}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Role:</span>
                  <p className="font-medium">{formData.role === 'Other' ? formData.customRole : formData.role}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tone:</span>
                  <p className="font-medium capitalize">{formData.tone}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Voice:</span>
                  <p className="font-medium">{VOICES.find(v => v.id === formData.voiceId)?.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <p className="font-medium">{formData.phoneNumber}</p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border/50">
                <span className="text-muted-foreground text-sm">Instructions:</span>
                <p className="text-sm mt-1">{formData.instructions}</p>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-accent" />
                <p className="text-sm text-accent">
                  Review all settings before creating. You can edit these later from the assistant management page.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            Create Voice Assistant
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
              </span>
              <span className="text-xs text-muted-foreground">
                {Math.round(((currentStep + 1) / STEPS.length) * 100)}%
              </span>
            </div>
            <Progress value={((currentStep + 1) / STEPS.length) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {STEPS[currentStep].description}
            </p>
          </div>

          {/* Step Content */}
          <div className="min-h-[300px]">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            {currentStep === STEPS.length - 1 ? (
              <Button
                onClick={handleCreateAssistant}
                disabled={!canProceed() || isCreating}
                className="btn-hero"
              >
                {isCreating ? 'Creating...' : 'Create Assistant'}
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};