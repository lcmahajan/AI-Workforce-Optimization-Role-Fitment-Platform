// App.jsx
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
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import Employees from "./pages/Employees.jsx";
import FitmentAnalysis from "./pages/FitmentAnalysis.jsx";
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

  return <Component />;
}

function AdminRoute({ component: Component }) {
  const { user, isLoading } = useAuth();
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [isLoading, user]);

  if (isLoading)
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return null;

  if (user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You need administrator privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <Component />;
}

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
      <Route component={NotFound} />
    </Switch>
  );
}

/* ------------------------------------------------ */
/* APP CONTENT WITH SIDEBAR LAYOUT */
/* ------------------------------------------------ */
function AppContent() {
  const { user } = useAuth();
  const [location] = useLocation();

  const isAuthPage = location === "/login" || location === "/register";

  // If login/register page → no sidebar
  if (isAuthPage) return <Router />;

  return (
    <SidebarProvider style={{ "--sidebar-width": "16rem" }}>
      <div className="flex h-screen w-full">
        <AppSidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
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



            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
              </Button>

              <ThemeToggle />

              {user && (
                <div className="flex items-center gap-2 pl-2 border-l">
                  <div className="text-right">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.username?.substring(0, 2).toUpperCase() || "??"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">
            <Router />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

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
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
