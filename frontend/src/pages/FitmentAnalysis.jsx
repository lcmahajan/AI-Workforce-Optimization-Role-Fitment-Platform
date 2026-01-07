import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Brain,
  Briefcase,
  TrendingUp,
  Activity,
  ShieldCheck,
} from "lucide-react";

export default function FitmentAnalysis() {
  const isLoading = false;

  /* DEMO EMPLOYEE DATA (later comes from backend) */
  const employee = {
    name: "You",
    fitmentScore: 8.2,
    fitmentStatus: "Fit",
    productivity: 84,
    fatigueRisk: "Low",
    recommendedRole: "Senior Analyst",
  };

  return (
    <div className="space-y-8 max-w-5xl">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold">My Fitment Overview</h1>
        <p className="text-muted-foreground mt-1">
          Personalized insights about how well your skills align with your role
        </p>
      </div>

      {/* ================= SKELETON ================= */}
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      )}

      {/* ================= AI SUMMARY ================= */}
      {!isLoading && (
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            Your current role aligns strongly with your skill profile. You show
            consistent productivity with healthy workload balance. Based on
            recent trends, you are well-positioned for advanced responsibilities
            or role growth opportunities.
          </CardContent>
        </Card>
      )}

      {/* ================= EXPERIENCE KPIs ================= */}
      <div className="grid gap-6 md:grid-cols-3">

        <Card>
          <CardContent className="p-6">
            <ShieldCheck className="h-5 w-5 text-green-600 mb-2" />
            <div className="text-3xl font-bold">{employee.fitmentScore}/10</div>
            <p className="text-sm text-muted-foreground">Fitment Score</p>
            <Badge className="mt-2">{employee.fitmentStatus}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <TrendingUp className="h-5 w-5 text-blue-600 mb-2" />
            <div className="text-3xl font-bold">{employee.productivity}%</div>
            <p className="text-sm text-muted-foreground">Avg Productivity</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Activity className="h-5 w-5 text-yellow-600 mb-2" />
            <div className="text-3xl font-bold">{employee.fatigueRisk}</div>
            <p className="text-sm text-muted-foreground">Fatigue Risk</p>
          </CardContent>
        </Card>

      </div>

      {/* ================= ROLE GUIDANCE ================= */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Role Guidance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Current Role:</strong> Aligned with your core strengths
          </p>
          <p>
            <strong>Suggested Growth Role:</strong> {employee.recommendedRole}
          </p>
          <p className="text-muted-foreground">
            Your profile indicates readiness for expanded scope or leadership
            responsibilities with minimal upskilling required.
          </p>
        </CardContent>
      </Card>

      {/* ================= ACTION RECOMMENDATIONS ================= */}
      <Card className="border-l-4 border-blue-500">
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Maintain current productivity rhythm</p>
          <p>• Explore stretch assignments or mentorship roles</p>
          <p>• Continue workload balance to avoid fatigue spikes</p>
        </CardContent>
      </Card>

    </div>
  );
}