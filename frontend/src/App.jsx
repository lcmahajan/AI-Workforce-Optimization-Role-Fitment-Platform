// App.jsx
<<<<<<< HEAD
import SixBySixAnalysis from "@/pages/SixBySixAnalysis";
import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.jsx";
import { TooltipProvider } from "./components/ui/tooltip.jsx";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar.jsx";
import { AppSidebar } from "./components/AppSidebar.jsx";
import { ThemeToggle } from "./components/ThemeToggle.jsx";
import { Bell } from "lucide-react";
import { Button } from "./components/ui/button.jsx";
import { Avatar, AvatarFallback } from "./components/ui/avatar.jsx";
import { AuthProvider, useAuth } from "./lib/auth.jsx";

import NotFound from "./pages/not-found.jsx";
=======
import GapAnalysis from "./pages/GapAnalysis.jsx";

import { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import { TooltipProvider } from "./components/ui/tooltip.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar.jsx";
import { AppSidebar } from "./components/AppSidebar.jsx";
import { ThemeToggle } from "./components/ThemeToggle.jsx";

import { Bell, Bot } from "lucide-react";
import { Button } from "./components/ui/button.jsx";
import { Avatar, AvatarFallback } from "./components/ui/avatar.jsx";

import { AuthProvider, useAuth } from "./lib/auth.jsx";
import { AIProvider } from "./contexts/AIContext.jsx";
import AIChat from "./components/AIChat.jsx";

/* ---------------- PAGES ---------------- */
>>>>>>> backup-frontend-ui
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import Employees from "./pages/Employees.jsx";
import FitmentAnalysis from "./pages/FitmentAnalysis.jsx";
<<<<<<< HEAD
import AiEmployeeAssistant from "./pages/AiEmployeeAssistant.jsx";
import UploadData from "./pages/UploadData.jsx";
import Optimization from "./pages/Optimization.jsx";
import Reports from "./pages/Reports.jsx";
import Softskills from "./pages/Softskills.jsx";
import Fatigue from "./pages/Fatigue.jsx";
import Settings from "./pages/Settings.jsx";
import Documentation from "./pages/Documentation.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

/* ------------------------------------------------ */
/* PROTECTED / ADMIN ROUTES */
/* ------------------------------------------------ */
function ProtectedRoute({ component: Component }) {
  const { user, isLoading } = useAuth();
  const [location, navigate] = useLocation();

  // Temporarily disabled redirect for testing
  // useEffect(() => {
  //   if (!isLoading && !user) navigate("/login");
  // }, [isLoading, user]);

  if (isLoading)
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  // if (!user) return null;

=======
import Softskills from "./pages/Softskills.jsx";
import Fatigue from "./pages/Fatigue.jsx";
import WorkforceIntelligence from "./pages/WorkforceIntelligence.jsx";
import SixBySixAnalysis from "./pages/SixBySixAnalysis.jsx";
import Optimization from "./pages/Optimization.jsx";
import Reports from "./pages/Reports.jsx";
import UploadData from "./pages/UploadData.jsx";
import Settings from "./pages/Settings.jsx";
import Documentation from "./pages/Documentation.jsx";
import AiEmployeeAssistant from "./pages/AiEmployeeAssistant.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/not-found.jsx";

/* ---------------- PROTECTED ROUTES ---------------- */

function ProtectedRoute({ component: Component }) {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();

  console.log("ProtectedRoute - user:", user, "isLoading:", isLoading);

  useEffect(() => {
    console.log("ProtectedRoute useEffect - isLoading:", isLoading, "user:", user);
    if (!isLoading && !user) {
      console.log("Redirecting to login");
      navigate("/login");
    }
  }, [isLoading, user]);

  if (isLoading) {
    console.log("Showing loading screen");
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    console.log("No user, returning null");
    return null;
  }

  console.log("Rendering component");
>>>>>>> backup-frontend-ui
  return <Component />;
}

function AdminRoute({ component: Component }) {
  const { user, isLoading } = useAuth();
<<<<<<< HEAD
  const [location, navigate] = useLocation();
=======
  const [, navigate] = useLocation();
>>>>>>> backup-frontend-ui

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [isLoading, user]);

  if (isLoading)
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
<<<<<<< HEAD
=======

>>>>>>> backup-frontend-ui
  if (!user) return null;

  if (user.role !== "admin") {
    return (
<<<<<<< HEAD
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You need administrator privileges to access this page.
=======
      <div className="flex items-center justify-center h-screen text-center">
        <div>
          <h1 className="text-2xl font-semibold">Access Denied</h1>
          <p className="text-muted-foreground">
            Admin access required
>>>>>>> backup-frontend-ui
          </p>
        </div>
      </div>
    );
  }

  return <Component />;
}

<<<<<<< HEAD
/* ------------------------------------------------ */
/* ROUTER FUNCTION */
/* ------------------------------------------------ */
function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      {/* Protected Routes */}
      <Route path="/" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/analytics" component={() => <ProtectedRoute component={Analytics} />} />
      <Route path="/employees" component={() => <ProtectedRoute component={Employees} />} />
      <Route path="/fitment" component={() => <ProtectedRoute component={FitmentAnalysis} />} />
      <Route path="/ai-assistant" component={() => <ProtectedRoute component={AiEmployeeAssistant} />} />
      <Route path="/upload" component={() => <AdminRoute component={UploadData} />} />
      <Route path="/optimization" component={() => <ProtectedRoute component={Optimization} />} />
      <Route path="/reports" component={() => <ProtectedRoute component={Reports} />} />
      <Route path="/softskills" component={() => <ProtectedRoute component={Softskills} />} />
      <Route path="/fatigue" component={() => <ProtectedRoute component={Fatigue} />} />
      <Route path="/settings" component={() => <ProtectedRoute component={Settings} />} />
      <Route path="/documentation" component={() => <ProtectedRoute component={Documentation} />} />
      <Route
  path="/six-by-six"
  component={() => <ProtectedRoute component={SixBySixAnalysis} />}
/>


      {/* Not Found */}
=======
/* ---------------- APP ROUTER ---------------- */

function AppRouter() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <Route path="/" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/employees" component={() => <ProtectedRoute component={Employees} />} />
      <Route path="/fitment" component={() => <ProtectedRoute component={FitmentAnalysis} />} />
      <Route path="/softskills" component={() => <ProtectedRoute component={Softskills} />} />
      <Route path="/fatigue" component={() => <ProtectedRoute component={Fatigue} />} />
      <Route path="/workforce-intelligence" component={() => <WorkforceIntelligence />} />

      {/* ✅ THIS ONE */}
      <Route
        path="/gap-analysis"
        component={() => <ProtectedRoute component={GapAnalysis} />}
      />

      <Route
        path="/ai-assistant"
        component={() => <ProtectedRoute component={AiEmployeeAssistant} />}
      />

      <Route
        path="/six-by-six"
        component={() => <ProtectedRoute component={SixBySixAnalysis} />}
      />

>>>>>>> backup-frontend-ui
      <Route component={NotFound} />
    </Switch>
  );
}

<<<<<<< HEAD
/* ------------------------------------------------ */
/* APP CONTENT WITH SIDEBAR LAYOUT */
/* ------------------------------------------------ */
function AppContent() {
  const { user } = useAuth();
  const [location] = useLocation();

  const isAuthPage = location === "/login" || location === "/register";

  // If login/register page → no sidebar
  if (isAuthPage) return <Router />;
=======

/* ---------------- APP LAYOUT ---------------- */

function AppContent() {
  const { user } = useAuth();
  const [location] = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const isAuthPage = location === "/login" || location === "/register";

  if (isAuthPage) {
    return <AppRouter />;
  }
>>>>>>> backup-frontend-ui

  return (
    <SidebarProvider style={{ "--sidebar-width": "16rem" }}>
      <div className="flex h-screen w-full">
        <AppSidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
<<<<<<< HEAD
          {/* Top Header */}
          <header className="flex items-center justify-between px-4 py-2 border-b bg-background">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
             <div className="flex items-center gap-2">
  <div className="font-semibold text-sm">AI Workforce Optimization</div>

  {user && (
    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
      {user.role === "admin" ? "Manager Portal" : "Employee Portal"}
    </span>
  )}
</div>
</div>


=======
          {/* Header */}
          <header className="flex items-center justify-between px-4 py-2 border-b bg-background">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <div className="font-semibold text-sm">
                  AI Workforce Optimization
                </div>
                {user && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {user.role === "admin" ? "Manager Portal" : "Employee Portal"}
                  </span>
                )}
              </div>
            </div>
>>>>>>> backup-frontend-ui

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
<<<<<<< HEAD
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
=======
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={isChatOpen ? "bg-accent" : ""}
              >
                <Bot className="h-5 w-5" />
>>>>>>> backup-frontend-ui
              </Button>

              <ThemeToggle />

              {user && (
                <div className="flex items-center gap-2 pl-2 border-l">
                  <div className="text-right">
<<<<<<< HEAD
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.username?.substring(0, 2).toUpperCase() || "??"}
=======
                    <p className="text-sm font-medium leading-none">
                      {user.username}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user.role}
                    </p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.username?.slice(0, 2).toUpperCase()}
>>>>>>> backup-frontend-ui
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </header>

<<<<<<< HEAD
          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">
            <Router />
          </main>
        </div>
      </div>
=======
          {/* Page */}
          <main className="flex-1 overflow-auto p-6">
            <AppRouter />
          </main>
        </div>
      </div>

      {/* Floating AI Chat */}
      {!isAuthPage && <AIChat isFloating={true} isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />}
>>>>>>> backup-frontend-ui
    </SidebarProvider>
  );
}

<<<<<<< HEAD
/* ------------------------------------------------ */
/* APP ROOT */
/* ------------------------------------------------ */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
=======
/* ---------------- ROOT ---------------- */

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AIProvider>
          <TooltipProvider>
            <AppContent />
            <Toaster />
          </TooltipProvider>
        </AIProvider>
>>>>>>> backup-frontend-ui
      </AuthProvider>
    </QueryClientProvider>
  );
}
<<<<<<< HEAD

export default App;
=======
>>>>>>> backup-frontend-ui
