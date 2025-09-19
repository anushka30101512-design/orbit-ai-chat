import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { useDemo } from "@/hooks/useDemo";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Campaigns from "./pages/Campaigns";
import Templates from "./pages/Templates";
import WebsiteConnect from "./pages/WebsiteConnect";
import CRMIntegration from "./pages/CRMIntegration";
import Reports from "./pages/Reports";
import Subscription from "./pages/Subscription";
import Assistants from "./pages/Assistants";
import Calls from "./pages/Calls";
import PhoneNumbers from "./pages/PhoneNumbers";
import Files from "./pages/Files";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Main App Component with Demo State
function AppContent() {
  const { user } = useDemo();
  const isAuthenticated = !!user;
  const needsOnboarding = isAuthenticated && !user.onboardingCompleted;

  // Show onboarding if user is authenticated but hasn't completed onboarding
  if (needsOnboarding) {
    return <OnboardingWizard onComplete={() => window.location.reload()} />;
  }

  // Protected Route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/leads" element={
          <ProtectedRoute>
            <Leads />
          </ProtectedRoute>
        } />
        <Route path="/campaigns" element={
          <ProtectedRoute>
            <Campaigns />
          </ProtectedRoute>
        } />
        <Route path="/templates" element={
          <ProtectedRoute>
            <Templates />
          </ProtectedRoute>
        } />
        <Route path="/website-connect" element={
          <ProtectedRoute>
            <WebsiteConnect />
          </ProtectedRoute>
        } />
        <Route path="/crm-integration" element={
          <ProtectedRoute>
            <CRMIntegration />
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />
        <Route path="/subscription" element={
          <ProtectedRoute>
            <Subscription />
          </ProtectedRoute>
        } />
        <Route path="/assistants" element={
          <ProtectedRoute>
            <Assistants />
          </ProtectedRoute>
        } />
        <Route path="/calls" element={
          <ProtectedRoute>
            <Calls />
          </ProtectedRoute>
        } />
        <Route path="/phone-numbers" element={
          <ProtectedRoute>
            <PhoneNumbers />
          </ProtectedRoute>
        } />
        <Route path="/files" element={
          <ProtectedRoute>
            <Files />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
