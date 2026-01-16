import React, { useState } from "react";
<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
=======
import {
  Card,
  CardContent,
} from "@/components/ui/card";
>>>>>>> backup-frontend-ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
<<<<<<< HEAD
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
=======
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
>>>>>>> backup-frontend-ui

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(usernameOrEmail, password);
      toast({
<<<<<<< HEAD
        title: "Success",
        description: "Logged in successfully",
=======
        title: "Login Successful",
        description: "Welcome back",
>>>>>>> backup-frontend-ui
      });
      setLocation("/");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!resetEmail) {
      toast({
<<<<<<< HEAD
        title: "Email Required",
=======
        title: "Email required",
>>>>>>> backup-frontend-ui
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    toast({
<<<<<<< HEAD
      title: "Reset Link Sent",
      description: "Password reset link has been sent to your email",
=======
      title: "Reset link sent",
      description: "Check your inbox for password reset instructions",
>>>>>>> backup-frontend-ui
    });

    setShowForgotPassword(false);
    setResetEmail("");
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-white" />
          </div>

          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Workforce Optimization Platform
            </CardTitle>
            <p className="text-sm text-white mt-2">
  Enterprise HR Analytics & Insights
</p>

          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
=======
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans">

      {/* LEFT BRAND SECTION */}
      <div className="hidden lg:flex flex-col justify-between px-16 py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center text-xl font-bold">
            QG
          </div>
          <span className="text-xl font-semibold">Quintess Global</span>
        </div>

        {/* Headline */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight">
            AI Workforce Optimization
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Enterprise intelligence to align people, roles, productivity and
            future workforce strategy.
          </p>

          <div className="mt-10 space-y-4">
            <div className="rounded-xl bg-white/10 p-5">
              <h3 className="font-semibold text-lg">AI-Powered Insights</h3>
              <p className="text-sm text-slate-300 mt-1">
                Real-time analytics on workforce performance, risk and efficiency.
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-5">
              <h3 className="font-semibold text-lg">
                Workforce Planning & Gap Analysis
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Detect skill gaps, role mismatches and future talent needs.
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-5">
              <h3 className="font-semibold text-lg">
                Growth & Productivity Analytics
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Track development readiness, utilization and career momentum.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          © 2026 Quintess Global · Secure Enterprise Access
        </p>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="flex items-center justify-center px-6 bg-white">
        <Card className="w-full max-w-md p-10 shadow-xl border">

          <h2 className="text-3xl font-bold">Sign In</h2>
          <p className="text-muted-foreground mt-2 text-base">
            Access your AI Workforce Management Console
          </p>

          {error && (
            <Alert variant="destructive" className="mt-6">
>>>>>>> backup-frontend-ui
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

<<<<<<< HEAD
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email / Username */}
            <div className="space-y-2">
              <Label htmlFor="usernameOrEmail">Email or Username</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="usernameOrEmail"
                  type="text"
                  placeholder="Enter your email or username"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="pl-10"
=======
          <form onSubmit={handleLogin} className="mt-8 space-y-5">

            <div className="space-y-2">
              <Label>Email or Username</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  className="pl-10 py-6 text-base"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="Enter your email or username"
>>>>>>> backup-frontend-ui
                  required
                />
              </div>
            </div>

<<<<<<< HEAD
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
=======
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10 py-6 text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
>>>>>>> backup-frontend-ui
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
<<<<<<< HEAD
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
=======
                  {showPassword ? <EyeOff /> : <Eye />}
>>>>>>> backup-frontend-ui
                </button>
              </div>
            </div>

<<<<<<< HEAD
            {/* Forgot Password */}
=======
>>>>>>> backup-frontend-ui
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
<<<<<<< HEAD
                className="text-sm text-white font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            >
              {isLoading ? "Signing in..." : "Login"}
            </Button>

            {/* Divider */}
            <div className="my-6 text-center">
              <span className="text-sm font-bold text-white">
                New User?
                </span> 
                </div>

            {/* Register Button */}
            <Button
  type="button"
  onClick={() => setLocation("/register")}
  data-testid="button-register"
  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
>
  Create Account
</Button>
          </form>
        </CardContent>
      </Card>
=======
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-lg"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm">
              New user?{" "}
              <button
                type="button"
                onClick={() => setLocation("/register")}
                className="font-semibold text-blue-600 hover:underline"
              >
                Create account
              </button>
            </div>
          </form>
        </Card>
      </div>
>>>>>>> backup-frontend-ui

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
<<<<<<< HEAD
              Enter your email address and we'll send you a reset link.
=======
              Enter your email and we’ll send a reset link.
>>>>>>> backup-frontend-ui
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
<<<<<<< HEAD
            <Label htmlFor="resetEmail">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="resetEmail"
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowForgotPassword(false)}
            >
=======
            <Label>Email Address</Label>
            <Input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForgotPassword(false)}>
>>>>>>> backup-frontend-ui
              Cancel
            </Button>
            <Button onClick={handleForgotPassword}>
              Send Reset Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> backup-frontend-ui
