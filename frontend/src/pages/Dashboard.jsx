import React, { useMemo } from "react";
import { useAuth } from "@/lib/auth";
import {
  Users,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  FileText,
  UserCheck,
} from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { RecentActivityFeed } from "@/components/RecentActivityFeed";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role || "employee";

  const { data: employeeStats = {} } = useQuery({
    queryKey: ["/api/employees/stats"],
  });

  const { data: uploadStats = [] } = useQuery({
    queryKey: ["/api/uploads"],
  });

  const stats = employeeStats.stats || {
    totalEmployees: 0,
    avgProductivity: 0,
    highPerformers: 0,
    lowUtilization: 0,
  };

  const employees = employeeStats.employees || [];

  const topPerformers = useMemo(() => {
    return employees
      .slice()
      .sort((a, b) => (b.fitmentScore || 0) - (a.fitmentScore || 0))
      .slice(0, 3);
  }, [employees]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Here's an overview of your workforce.
          </p>
        </div>

        {role === "admin" && (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/upload">Upload Data</Link>
            </Button>
            <Button asChild>
              <Link href="/analytics">View Analytics</Link>
            </Button>
          </div>
        )}
      </div>

      {/* ================= ADMIN VIEW ================= */}
      {role === "admin" && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <KPICard title="Total Employees" value={stats.totalEmployees} icon={Users} />
            <KPICard title="High Performers" value={stats.highPerformers} icon={TrendingUp} />
            <KPICard
              title="Avg Productivity"
              value={`${Math.round(stats.avgProductivity || 0)}%`}
              icon={Briefcase}
            />
            <KPICard title="Low Utilization" value={stats.lowUtilization} icon={AlertTriangle} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>CVs Uploaded</span>
                  <span>{uploadStats.filter((s) => s.type === "cv").length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Job Descriptions</span>
                  <span>{uploadStats.filter((s) => s.type === "jd").length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Employees</span>
                  <span>{stats.totalEmployees}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {topPerformers.length ? (
                  topPerformers.map((e, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{e.name}</span>
                      <span>{e.fitmentScore}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No employees yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          <RecentActivityFeed />
        </>
      )}

      {/* ================= EMPLOYEE VIEW ================= */}
      {role === "employee" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>My Fitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your role fitment score will appear here.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Fatigue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your fatigue insights will appear here.
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>How This Platform Works</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Admin uploads company-wide data</p>
              <p>• AI processes workforce analytics</p>
              <p>• You receive personalized insights</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
