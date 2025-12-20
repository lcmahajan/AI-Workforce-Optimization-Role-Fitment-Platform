import React, { useMemo } from "react";
import { useAuth } from "@/lib/auth";
import {
  Users,
  Briefcase,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  FileText,
  UserCheck,
  Activity,
  Zap,
  Award,
  Building2,
} from "lucide-react";
import { KPICard } from "@/components/KPICard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role || "employee";

  const employeeStats = {
    stats: {
      totalEmployees: 10,
      avgProductivity: 85,
      highPerformers: 3,
      lowUtilization: 2,
    },
    employees: [],
  };

  const stats = employeeStats.stats;
  const employees = employeeStats.employees;

  const topPerformers = useMemo(() => {
    return employees
      .slice()
      .sort((a, b) => (b.fitmentScore || 0) - (a.fitmentScore || 0))
      .slice(0, 3);
  }, [employees]);

  const workforceHealthScore =
    stats.totalEmployees > 0
      ? Math.round(stats.avgProductivity * 0.8)
      : 0;

  const fatigueAlertCount = Math.floor(stats.lowUtilization * 0.3);
  const productivityDip = stats.avgProductivity < 80 ? 5 : 0;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-extrabold">Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Workforce overview & insights
        </p>
      </div>

      {/* ================= ADMIN VIEW ================= */}
      {role === "admin" && (
        <>
          {/* Hero */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-800 dark:to-indigo-800">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 font-bold">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Workforce Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                  {workforceHealthScore}%
                </div>
                <Badge
                  className={
                    workforceHealthScore >= 70
                      ? "bg-green-500 text-white"
                      : workforceHealthScore >= 50
                      ? "bg-yellow-500 text-black"
                      : "bg-red-500 text-white"
                  }
                >
                  {workforceHealthScore >= 70 ? "Good" : workforceHealthScore >= 50 ? "Watch" : "Risk"}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {workforceHealthScore >= 70
                  ? "Overall workforce health is strong with minor optimization opportunities"
                  : workforceHealthScore >= 50
                  ? "Workforce health needs attention with some areas for improvement"
                  : "Workforce health is at risk, immediate action recommended"}
              </p>
            </CardContent>
          </Card>

          {/* KPI CARDS */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <KPICard title="Total Employees" value={stats.totalEmployees} icon={Users} subtitle="↑ Growing workforce" />
            <KPICard title="High Performers" value={stats.highPerformers} icon={TrendingUp} subtitle="↑ Improved vs last month" progress={stats.totalEmployees > 0 ? (stats.highPerformers / stats.totalEmployees) * 100 : 0} progressColor="green" />
            <KPICard
              title="Avg Productivity"
              value={`${stats.avgProductivity}%`}
              icon={Briefcase}
              subtitle="↑ Improved vs last month"
              progress={stats.avgProductivity}
              progressColor="blue"
            />
            <KPICard
              title="Low Utilization"
              value={stats.lowUtilization}
              icon={AlertTriangle}
              subtitle="↓ Needs attention"
              progress={stats.totalEmployees > 0 ? (stats.lowUtilization / stats.totalEmployees) * 100 : 0}
              progressColor="red"
            />
          </div>

          {/* ADVANCED KPIs */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <KPICard title="Avg Fitment Score" value="8.2/10" icon={UserCheck} subtitle="↑ Improved vs last month" />
            <KPICard title="Automation Potential" value="15%" icon={Zap} subtitle="↑ Improved vs last month" />
            <KPICard title="Skill Gaps" value="8 Employees" icon={Award} subtitle="↓ Needs attention" />
            <KPICard title="Org Efficiency" value="High" icon={Building2} subtitle="↑ Improved vs last month" />
          </div>

          {/* EXECUTIVE INSIGHT */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Optimization Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">15%</div>
              <p className="text-lg font-medium mb-1">potential efficiency gain</p>
              <p className="text-muted-foreground">Based on utilization and productivity patterns</p>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Key Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-800 dark:text-green-200">
                    {stats.highPerformers} high performers identified → Consider leadership pipeline
                  </span>
                </div>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="font-medium text-red-800 dark:text-red-200">
                    {stats.lowUtilization} employees underutilized → Review task allocation
                  </span>
                </div>
              </div>
              {fatigueAlertCount > 0 && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg dark:bg-orange-900/20 dark:border-orange-800">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <span className="font-medium text-orange-800 dark:text-orange-200">
                      {fatigueAlertCount} employees show high fatigue → Schedule wellness check-ins
                    </span>
                  </div>
                </div>
              )}
              {productivityDip > 0 && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">
                      Productivity dipped {productivityDip}% → Analyze bottlenecks
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* ================= EMPLOYEE VIEW ================= */}
      {role === "employee" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">My Fitment</CardTitle>
            </CardHeader>
            <CardContent>Personal role insights coming soon</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-bold">My Fatigue</CardTitle>
            </CardHeader>
            <CardContent>Fatigue trends coming soon</CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
