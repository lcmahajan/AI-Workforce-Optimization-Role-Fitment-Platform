import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

/* ---------------- DUMMY EMPLOYEE DATA ---------------- */
const EMPLOYEES = [
  {
    id: "EMP001",
    name: "Alice Johnson",
    role: "Senior Analyst",
    department: "Finance",
    fitment: 8.6,
    productivity: 82,
    utilization: 76,
    insights: {
      strengths: "Strong analytical skills, consistent productivity",
      risks: "Low automation exposure",
      actions: "Recommend RPA basics training",
    },
  },
  {
    id: "EMP002",
    name: "Bob Smith",
    role: "IT Specialist",
    department: "IT",
    fitment: 6.4,
    productivity: 68,
    utilization: 88,
    insights: {
      strengths: "High utilization, domain expertise",
      risks: "Risk of burnout",
      actions: "Workload redistribution + wellness check",
    },
  },
  {
    id: "EMP003",
    name: "Charlie Lee",
    role: "HR Executive",
    department: "HR",
    fitment: 9.1,
    productivity: 90,
    utilization: 72,
    insights: {
      strengths: "Excellent people skills, leadership ready",
      risks: "None critical",
      actions: "Consider for mentoring role",
    },
  },
];

/* ---------------- MAIN COMPONENT ---------------- */
export default function AiEmployeeAssistant() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const getFitmentLabel = (score) => {
    if (score >= 8.5) return "Fit";
    if (score >= 6) return "Train to Fit";
    return "Misfit";
  };

  const getFitmentColor = (score) => {
    if (score >= 8.5) return "default";
    if (score >= 6) return "secondary";
    return "destructive";
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">AI Assistant — Employee Insights</h1>
        <p className="text-sm text-muted-foreground">
          Select an employee to view AI-powered insights and recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Employee List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Employees
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {EMPLOYEES.map((emp) => (
              <button
                key={emp.id}
                onClick={() => setSelectedEmployee(emp)}
                className={`w-full text-left p-3 rounded-md border transition
                  ${selectedEmployee?.id === emp.id ? "bg-muted" : "hover:bg-muted/50"}`}
              >
                <div className="font-medium">{emp.name}</div>
                <div className="text-xs text-muted-foreground">
                  {emp.role} • {emp.department}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Employee Details */}
        <Card className="lg:col-span-3">
          {!selectedEmployee ? (
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Employee Selected</h3>
              <p className="text-sm text-muted-foreground">
                Choose an employee from the list to view insights.
              </p>
            </CardContent>
          ) : (
            <CardContent className="p-6 space-y-6">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    {selectedEmployee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-2xl font-bold">{selectedEmployee.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedEmployee.role} • {selectedEmployee.department}
                  </p>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Fitment</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">{selectedEmployee.fitment}</span>
                      <Badge variant={getFitmentColor(selectedEmployee.fitment)}>
                        {getFitmentLabel(selectedEmployee.fitment)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Productivity</p>
                    <p className="text-xl font-bold">{selectedEmployee.productivity}%</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Utilization</p>
                    <p className="text-xl font-bold">{selectedEmployee.utilization}%</p>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    {selectedEmployee.insights.strengths}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      Risks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    {selectedEmployee.insights.risks}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      Recommended Action
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    {selectedEmployee.insights.actions}
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4">
                <Button variant="outline">Generate Detailed AI Report</Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}