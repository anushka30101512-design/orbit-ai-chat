import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Send, Upload, Bot, User, FileText, Phone, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const quickActions = [
  { label: "View Assistants", action: "list assistants", icon: Users },
  { label: "Recent Calls", action: "show recent calls", icon: Phone },
  { label: "Upload File", action: "upload file", icon: FileText },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Welcome to Autonyze Orbit! I'm your AI assistant. I can help you manage assistants, calls, phone numbers, and files. What would you like to do today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const processNaturalLanguage = async (input: string): Promise<string> => {
    // Mock natural language processing - replace with actual AI integration
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("list") && lowerInput.includes("assistant")) {
      return "I found 3 assistants in your account:\n• Sales Assistant (Active)\n• Customer Support (Active)\n• Technical Support (Inactive)";
    }
    
    if (lowerInput.includes("call") || lowerInput.includes("phone")) {
      return "Your recent calls:\n• Call to +1234567890 - 2 min ago (Completed)\n• Call to +1987654321 - 1 hour ago (Failed)\n• Call to +1555000111 - 3 hours ago (Completed)";
    }
    
    if (lowerInput.includes("upload") || lowerInput.includes("file")) {
      return "You can upload files by clicking the upload button or dragging files into this chat. Supported formats: PDF, TXT, CSV, DOCX.";
    }
    
    if (lowerInput.includes("dashboard") || lowerInput.includes("stats")) {
      return "Your dashboard overview:\n• 3 Active Assistants\n• 12 Total Calls Today\n• 2 Phone Numbers\n• 8 Files Uploaded";
    }
    
    return "I understand you want to: " + input + ". Let me help you with that! You can navigate to the relevant section using the sidebar, or ask me specific questions about your assistants, calls, phone numbers, or files.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Process natural language input
      const aiResponse = await processNaturalLanguage(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: `Uploaded file: ${file.name}`,
        timestamp: new Date(),
      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `File "${file.name}" uploaded successfully! I can now help you process this file. What would you like to do with it?`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage, aiMessage]);
      
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <Card className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className={message.type === "user" ? "bg-primary" : "bg-secondary"}>
                    {message.type === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`${
                    message.type === "user" ? "message-user" : "message-ai"
                  } whitespace-pre-wrap`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-secondary">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="message-ai">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4 space-y-4">
          {/* Quick Actions */}
          <div className="flex gap-2 flex-wrap">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.action)}
                className="text-xs"
              >
                <action.icon className="w-3 h-3 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your assistants, calls, or files..."
              className="flex-1"
              disabled={isLoading}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.txt,.csv,.docx"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4" />
            </Button>
            <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}