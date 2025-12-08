import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Building2, Users } from "lucide-react";
import { WorkDistributionChart } from "@/components/WorkDistributionChart";
import { ProductivityChart } from "@/components/ProductivityChart";
import { FitmentScoreChart } from "@/components/FitmentScoreChart";
import { useQuery } from "@tanstack/react-query";

export default function Analytics() {
  const { data: employeeStats = {} } = useQuery({
    queryKey: ["/api/employees/stats"],
    refetchInterval: 5000,
  });

  const stats = employeeStats.stats || {
    totalEmployees: 0,
    avgProductivity: 0,
    avgUtilization: 0,
    highPerformers: 0,
  };

  const employees = employeeStats.employees || [];

  const departmentCount = useMemo(() => {
    const departments = new Set(employees.map(e => e.department).filter(Boolean));
    return departments.size;
  }, [employees]);

  const consolidationRate = useMemo(() => {
    if (employees.length === 0) return 0;
    const consolidated = employees.filter(e => e.consolidatedCount > 0).length;
    return Math.round((consolidated / employees.length) * 100);
  }, [employees]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor key workforce metrics and process performance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover-elevate transition-all">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold" data-testid="text-total-process">{stats.totalEmployees}</div>
            <Progress value={Math.min(stats.totalEmployees * 10, 100)} className="mt-3" />
            <p className="text-xs text-muted-foreground mt-2">Active workforce</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Productivity
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold" data-testid="text-consolidation-rate">
              {Math.round(stats.avgProductivity || 0)}%
            </div>
            <Progress value={stats.avgProductivity || 0} className="mt-3" />
            <p className="text-xs text-muted-foreground mt-2">Performance metric</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-all">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Department
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold" data-testid="text-department-count">
              {departmentCount} <span className="text-xl font-normal text-muted-foreground">Active</span>
            </div>
            <Progress value={Math.min(departmentCount * 25, 100)} className="mt-3" />
            <p className="text-xs text-muted-foreground mt-2">Departments operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <WorkDistributionChart />
        <FitmentScoreChart />
      </div>

      <ProductivityChart />
    </div>
  );
}
