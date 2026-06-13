import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppShell } from "@/components/layout/AppShell";

import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import JourneyPage from "@/pages/JourneyPage";
import SchemesPage from "@/pages/SchemesPage";
import DocumentsPage from "@/pages/DocumentsPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import BuildersPage from "@/pages/BuildersPage";
import MessagesPage from "@/pages/MessagesPage";
import AdminPage from "@/pages/AdminPage";
import KnowledgePage from "@/pages/KnowledgePage";
import ImpactPage from "@/pages/ImpactPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route Component
function ProtectedRoute({ component: Component, adminOnly = false, ...rest }: any) {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return <Redirect to="/login" />;
  }

  if (adminOnly && session.role !== "admin" && session.role !== "superadmin") {
    return <Redirect to="/journey" />;
  }

  return (
    <AppShell>
      <Component {...rest} />
    </AppShell>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      
      <Route path="/journey">
        <ProtectedRoute component={JourneyPage} />
      </Route>
      <Route path="/schemes">
        <ProtectedRoute component={SchemesPage} />
      </Route>
      <Route path="/documents">
        <ProtectedRoute component={DocumentsPage} />
      </Route>
      <Route path="/applications">
        <ProtectedRoute component={ApplicationsPage} />
      </Route>
      <Route path="/builders">
        <ProtectedRoute component={BuildersPage} />
      </Route>
      <Route path="/messages">
        <ProtectedRoute component={MessagesPage} />
      </Route>
      <Route path="/knowledge">
        <ProtectedRoute component={KnowledgePage} />
      </Route>
      <Route path="/impact">
        <ProtectedRoute component={ImpactPage} />
      </Route>
      <Route path="/settings">
        <ProtectedRoute component={SettingsPage} />
      </Route>

      <Route path="/admin">
        <ProtectedRoute component={AdminPage} adminOnly />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
