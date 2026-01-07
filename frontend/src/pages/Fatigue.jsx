import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  BatteryCharging,
  BatteryWarning,
  Timer,
  Activity,
  HeartPulse,
} from "lucide-react";

/* ---------------- DEMO DATA ---------------- */
const fatigueHealth = 72;

const fatigueDrivers = [
  { label: "Workload Intensity", value: 78 },
  { label: "Overtime Frequency", value: 65 },
  { label: "Focus Consistency", value: 70 },
  { label: "Stress Signals", value: 60 },
];

const employees = [
  {
    name: "Sarah Johnson",
    role: "Senior Developer",
    fatigue: 68,
    status: "Moderate",
  },
  {
    name: "Mike Chen",
    role: "Product Manager",
    fatigue: 82,
    status: "High",
  },
  {
    name: "Emma Wilson",
    role: "HR Specialist",
    fatigue: 55,
    status: "Low",
  },
];

export default function FatigueAnalysis() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Fatigue Intelligence</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          AI-driven fatigue detection based on workload patterns, stress signals,
          and productivity consistency.
        </p>
      </div>

      {/* AI SUMMARY */}
      <Card className="bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-900/30 dark:to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-orange-600" />
            AI Fatigue Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Fatigue levels are moderate across the workforce. Product-facing and
          managerial roles show early burnout indicators due to sustained workload
          and decision fatigue. Preventive action is recommended.
        </CardContent>
      </Card>

      {/* FATIGUE HEALTH INDEX */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Fatigue Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-orange-600">
              {fatigueHealth}%
            </div>
            <Badge
              className={
                fatigueHealth >= 75
                  ? "bg-green-500 text-white"
                  : fatigueHealth >= 60
                  ? "bg-yellow-400 text-black"
                  : "bg-red-500 text-white"
              }
            >
              {fatigueHealth >= 75
                ? "Healthy"
                : fatigueHealth >= 60
                ? "Watch"
                : "Critical"}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Composite fatigue score derived from workload, overtime,
            focus stability, and stress indicators.
          </p>
        </CardContent>
      </Card>

      {/* FATIGUE DRIVERS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {fatigueDrivers.map((driver, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                {driver.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold mb-2">{driver.value}%</div>
              <Progress value={driver.value} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* INDIVIDUAL FATIGUE RISK */}
      <div className="space-y-6">
        {employees.map((emp, idx) => (
          <Card key={idx}>
            <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6">
              <div>
                <div className="font-semibold text-lg">{emp.name}</div>
                <div className="text-sm text-muted-foreground">{emp.role}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-orange-600">
                  {emp.fatigue}%
                </div>
                <Badge
                  className={
                    emp.status === "High"
                      ? "bg-red-500 text-white"
                      : emp.status === "Moderate"
                      ? "bg-yellow-400 text-black"
                      : "bg-green-500 text-white"
                  }
                >
                  {emp.status} Risk
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI RECOMMENDATIONS */}
      <div className="grid gap-6 md:grid-cols-3">
        <ActionCard
          icon={BatteryCharging}
          title="Recovery Opportunity"
          text="Introduce short recovery breaks and workload rebalancing for high-risk roles."
          color="border-green-500"
        />
        <ActionCard
          icon={Timer}
          title="Overtime Control"
          text="Limit consecutive high-intensity workdays for managerial roles."
          color="border-yellow-400"
        />
        <ActionCard
          icon={HeartPulse}
          title="Wellbeing Action"
          text="Schedule wellness check-ins and encourage focus-driven work blocks."
          color="border-red-500"
        />
      </div>

    </div>
  );
}

/* ---------------- COMPONENT ---------------- */

function ActionCard({ icon: Icon, title, text, color }) {
  return (
    <Card className={`border-l-4 ${color}`}>
      <CardContent className="pt-6">
        <h3 className="font-semibold flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{text}</p>
      </CardContent>
    </Card>
  );
}