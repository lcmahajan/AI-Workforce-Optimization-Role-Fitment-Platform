import React from "react";
import { useAuth } from "@/lib/auth";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Zap,
  Activity,
  UserCheck,
} from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ================== DEMO DATA ================== */
const adminKPIs = {
  totalEmployees: 120,
  avgProductivity: 82,
  highPerformers: 28,
  lowUtilization: 9,
  automationPotential: 18,
};

const productivityTrend = [
  { month: "Jan", value: 74 },
  { month: "Feb", value: 76 },
  { month: "Mar", value: 78 },
  { month: "Apr", value: 80 },
  { month: "May", value: 82 },
  { month: "Jun", value: 82 },
];

const utilizationSplit = [
  { name: "Optimized", value: 70 },
  { name: "Overloaded", value: 18 },
  { name: "Idle", value: 12 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role || "employee";

  const workforceHealth = Math.round(adminKPIs.avgProductivity * 0.85);
  const healthLabel =
    workforceHealth >= 75 ? "Healthy" : workforceHealth >= 60 ? "Watch" : "Critical";

  return (
    <div className="space-y-10">

      {/* ================= PAGE HEADER ================= */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Workforce Intelligence
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Actionable workforce insights for smarter decisions
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Last updated: 2 minutes ago • Source: Workforce Engine
        </p>
      </div>

      {/* ================= ADMIN DASHBOARD ================= */}
      {role === "admin" && (
        <>
          {/* HERO */}
          <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40">
            <CardContent className="p-8 flex flex-col md:flex-row justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Activity className="h-6 w-6 text-blue-600" />
                  Workforce Health Index
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xl">
                  Composite score based on productivity, utilization & role fitment.
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl font-extrabold text-blue-600">
                  {workforceHealth}%
                </div>
                <Badge
                  className={
                    workforceHealth >= 75
                      ? "bg-green-500 text-white"
                      : workforceHealth >= 60
                      ? "bg-yellow-400 text-black"
                      : "bg-red-500 text-white"
                  }
                >
                  {healthLabel}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* KPI SNAPSHOT */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <KPICard title="Total Employees" value={adminKPIs.totalEmployees} icon={Users} />
            <KPICard
              title="High Performers"
              value={adminKPIs.highPerformers}
              icon={TrendingUp}
              progress={(adminKPIs.highPerformers / adminKPIs.totalEmployees) * 100}
              progressColor="green"
            />
            <KPICard
              title="Low Utilization"
              value={adminKPIs.lowUtilization}
              icon={AlertTriangle}
              progress={(adminKPIs.lowUtilization / adminKPIs.totalEmployees) * 100}
              progressColor="red"
            />
            <KPICard
              title="Automation Potential"
              value={`${adminKPIs.automationPotential}%`}
              icon={Zap}
            />
          </div>

          {/* VISUAL INTELLIGENCE */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Productivity Momentum</CardTitle>
              </CardHeader>
              <CardContent className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productivityTrend}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workload Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={utilizationSplit}
                      dataKey="value"
                      innerRadius={45}
                      outerRadius={85}
                    >
                      {utilizationSplit.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* ================= EMPLOYEE DASHBOARD ================= */}
      {role === "employee" && (
        <div className="space-y-8">

          {/* HERO */}
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/30 dark:to-blue-900/30">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                My Workforce Health
              </h2>
              <div className="flex items-center gap-4 mt-4">
                <div className="text-5xl font-extrabold text-emerald-600">
                  78%
                </div>
                <Badge className="bg-green-500 text-white">Healthy</Badge>
              </div>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Based on your productivity, workload balance & role alignment.
              </p>
            </CardContent>
          </Card>

          {/* PERSONAL KPIs */}
          <div className="grid gap-6 md:grid-cols-3">
            <KPICard title="My Fitment Score" value="8.1 / 10" icon={UserCheck} progress={81} progressColor="green" />
            <KPICard title="Avg Productivity" value="84%" icon={TrendingUp} progress={84} progressColor="blue" />
            <KPICard title="Fatigue Risk" value="Low" icon={AlertTriangle} progress={25} progressColor="green" />
          </div>

          {/* PERSONAL INSIGHTS */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-l-4 border-green-500">
              <CardContent className="pt-6">
                <h3 className="font-semibold">Your Strength</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You consistently deliver quality work with balanced effort.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-yellow-400">
              <CardContent className="pt-6">
                <h3 className="font-semibold">Watch Area</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Workload spikes during peak weeks.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-blue-500">
              <CardContent className="pt-6">
                <h3 className="font-semibold">Recommendation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  You are eligible for higher responsibility roles.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      )}
    </div>
  );
}