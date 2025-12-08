import React, { useMemo } from "react";
import { Users, Briefcase, TrendingUp, AlertTriangle, FileText, UserCheck } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { RecentActivityFeed } from "@/components/RecentActivityFeed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Dashboard() {
  const { data: employeeStats = {} } = useQuery({
    queryKey: ["/api/employees/stats"],
    refetchInterval: 5000,
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
      .sort((a, b) => (b.fitmentScore || 0) - (a.fitmentScore || 0))
      .slice(0, 3);
  }, [employees]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Here's an overview of your workforce.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild data-testid="button-upload-data">
            <Link href="/upload">Upload Data</Link>
          </Button>
          <Button asChild data-testid="button-view-analytics">
            <Link href="/analytics">View Analytics</Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          trend={{ value: 0, isPositive: true }}
        />
        <KPICard
          title="High Performers"
          value={stats.highPerformers}
          icon={TrendingUp}
          trend={{ value: 0, isPositive: true }}
        />
        <KPICard
          title="Avg Productivity"
          value={`${Math.round(stats.avgProductivity || 0)}%`}
          icon={Briefcase}
          trend={{ value: 0, isPositive: true }}
        />
        <KPICard
          title="Low Utilization"
          value={stats.lowUtilization}
          icon={AlertTriangle}
          subtitle="Below 50%"
        />
      </div>

      {/* Quick Stats and Top Performers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">CVs Uploaded</span>
              <span className="text-2xl font-bold">
                {uploadStats?.filter?.((s) => s.type === "cv").length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Job Descriptions</span>
              <span className="text-2xl font-bold">
                {uploadStats?.filter?.((s) => s.type === "jd").length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Employees</span>
              <span className="text-2xl font-bold">{stats.totalEmployees}</span>
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
          <CardContent className="space-y-3">
            {topPerformers.length > 0 ? (
              topPerformers.map((emp, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm">{emp.name}</span>
                  <span className="text-sm font-medium">
                    {emp.fitmentScore?.toFixed(1) || "N/A"} Score
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No employees yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <RecentActivityFeed />
    </div>
  );
}
