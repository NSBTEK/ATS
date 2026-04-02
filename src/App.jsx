import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AppLayout from '@/components/layout/AppLayout';
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import Jobs from '@/pages/Jobs';
import Candidates from '@/pages/Candidates';
import Submissions from '@/pages/Submissions';
import Interviews from '@/pages/Interviews';
import Placements from '@/pages/Placements';
import Clients from '@/pages/Clients';
import Contacts from '@/pages/Contacts';
import Activities from '@/pages/Activities';
import Timesheets from '@/pages/workforce/Timesheets';
import Expenses from '@/pages/workforce/Expenses';
import Contracts from '@/pages/workforce/Contracts';
import Onboarding from '@/pages/workforce/Onboarding';
import UserManagement from '@/pages/admin/UserManagement';
import ColumnSettings from '@/pages/admin/ColumnSettings';
import Integrations from '@/pages/admin/Integrations';
import AIAssistant from '@/pages/AIAssistant';
import ResumeParser from '@/pages/ResumeParser';
import ClientBilling from '@/pages/ClientBilling';
import Payroll from '@/pages/workforce/Payroll';
import RequestAccess from '@/pages/RequestAccess';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workforce/timesheets" element={<Timesheets />} />
        <Route path="/workforce/expenses" element={<Expenses />} />
        <Route path="/workforce/contracts" element={<Contracts />} />
        <Route path="/workforce/onboarding" element={<Onboarding />} />
        <Route path="/workforce/payroll" element={<Payroll />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/columns" element={<ColumnSettings />} />
        <Route path="/admin/integrations" element={<Integrations />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/resume-parser" element={<ResumeParser />} />
        <Route path="/client-billing" element={<ClientBilling />} />
        <Route path="/request-access" element={<RequestAccess />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router basename="/ATS">
        <AuthProvider>
          <AuthenticatedApp />
          <Toaster />
        </AuthProvider>
          <SonnerToaster richColors position="top-right" />
      </Router>
    </QueryClientProvider>
  );
}
