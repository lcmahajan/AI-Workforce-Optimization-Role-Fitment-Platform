<<<<<<< HEAD
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, TrendingUp, CheckCircle, Users, Zap, Target } from "lucide-react";
=======
import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Users, AlertTriangle, TrendingUp, ArrowRight, GraduationCap, UserX, Zap, ChevronDown, ChevronUp } from "lucide-react";

/* ----------------------- MATRIX DEFINITIONS ----------------------- */
>>>>>>> backup-frontend-ui

const rows = [
  "Productivity",
  "Utilization",
  "Fitment",
  "Fatigue",
  "Automation Potential",
  "Business Criticality",
];

<<<<<<< HEAD
const cols = [
  "Very Low",
  "Low",
  "Moderate",
  "Good",
  "Very High",
  "Exceptional",
];

export default function SixBySixAnalysis() {
  const [selectedCell, setSelectedCell] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDummyEmployees = (row, col) => {
    // Dummy employee data
    return [
      { name: "John Doe", role: "Developer", department: "Engineering", score: Math.floor(Math.random() * 100) },
      { name: "Jane Smith", role: "Manager", department: "HR", score: Math.floor(Math.random() * 100) },
      { name: "Bob Johnson", role: "Analyst", department: "Finance", score: Math.floor(Math.random() * 100) },
    ];
  };
  return (
    <div className="p-8 lg:p-12 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">6×6 Workforce Analysis</h1>
        <p className="text-lg text-muted-foreground">
          Strategic workforce performance and optimization matrix for executive decision-making
        </p>
      </div>

      {/* Filters (UI only) */}
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Department:</label>
          <select className="border dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-w-[140px]">
            <option>All Departments</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Role:</label>
          <select className="border dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-w-[140px]">
            <option>All Roles</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Time Period:</label>
          <select className="border dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-w-[140px]">
            <option>Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Risk Areas</p>
                <p className="text-3xl font-bold text-red-600">12</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Critical workforce segments requiring immediate intervention</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Automation Opportunities</p>
                <p className="text-3xl font-bold text-blue-600">28</p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Processes identified for efficiency enhancement</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Roles at Risk</p>
                <p className="text-3xl font-bold text-orange-600">7</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Key positions with succession planning gaps</p>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm">Elevated fatigue levels in mission-critical functions</div>
              <div className="text-xs text-muted-foreground mt-1">Urgent executive attention warranted</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
            <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm">Significant automation potential in underperforming segments</div>
              <div className="text-xs text-muted-foreground mt-1">Operational efficiency gains achievable</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900">
            <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm">Strong alignment in senior leadership, gaps in emerging talent</div>
              <div className="text-xs text-muted-foreground mt-1">Strategic development priorities identified</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6x6 Matrix */}
      <Card className="shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl">Performance Matrix</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <TooltipProvider>
            <div className="grid grid-cols-7 gap-4 text-sm">
              <div className="h-12"></div>
              {cols.map((c) => (
                <div key={c} className="font-semibold text-center text-base py-3">
                  {c}
                </div>
              ))}

              {rows.map((row) => (
                <React.Fragment key={row}>
                  <div className="font-semibold text-base py-3 flex items-center">
                    {row}
                  </div>
                  {cols.map((col, i) => (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <div
                          className={`h-16 w-16 mx-auto rounded-lg text-center cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200 text-gray-900 dark:text-gray-100 flex items-center justify-center font-bold text-2xl shadow-sm border ${
                            i === 0
                              ? "bg-red-500 dark:bg-red-600 text-white border-red-600 dark:border-red-700"
                              : i === 5
                              ? "bg-green-500 dark:bg-green-600 text-white border-green-600 dark:border-green-700"
                              : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                          }`}
                          onClick={() => {
                            setSelectedCell({ row, col });
                            setIsModalOpen(true);
                          }}
                        >
                          {Math.floor(Math.random() * 10)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View impacted employees</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* Recommended Actions */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <Users className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm">Reallocate misaligned personnel</div>
              <div className="text-xs text-muted-foreground mt-1">Optimize organizational structure</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm">Deploy automation in manual processes</div>
              <div className="text-xs text-muted-foreground mt-1">Streamline operational workflows</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm">Invest in capability development programs</div>
              <div className="text-xs text-muted-foreground mt-1">Enhance workforce competencies</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-sm">Implement workload optimization measures</div>
              <div className="text-xs text-muted-foreground mt-1">Promote sustainable performance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal for Employee Details */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-xl flex items-center gap-2">
              <Users className="w-5 h-5" />
              Impacted Employees - {selectedCell?.row} / {selectedCell?.col}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedCell && getDummyEmployees(selectedCell.row, selectedCell.col).map((emp, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{emp.name}</div>
                    <div className="text-sm text-muted-foreground">{emp.role} • {emp.department}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{emp.score}</div>
                  <div className="text-xs text-muted-foreground">Fit Score</div>
=======
const cols = ["Critical", "High", "Medium", "Stable", "Strong", "Elite"];

const bucketRanges = [
  { name: "Critical", min: 0, max: 30 },
  { name: "High", min: 31, max: 45 },
  { name: "Medium", min: 46, max: 60 },
  { name: "Stable", min: 61, max: 75 },
  { name: "Strong", min: 76, max: 90 },
  { name: "Elite", min: 91, max: 100 },
];

/* ----------------------- SAMPLE WORKFORCE ----------------------- */

const employees = [
  {
    name: "Sarah Johnson",
    role: "Senior Accountant",
    dept: "Finance",
    productivity: 82,
    utilization: 91,
    fitment: 78,
    fatigue: 72,
    automation: 40,
    leadership: 85,
  },
  {
    name: "Michael Torres",
    role: "AP Processor",
    dept: "Finance",
    productivity: 54,
    utilization: 68,
    fitment: 45,
    fatigue: 83,
    automation: 78,
    leadership: 32,
  },
  {
    name: "David Chen",
    role: "R2R Analyst",
    dept: "Finance",
    productivity: 76,
    utilization: 84,
    fitment: 88,
    fatigue: 40,
    automation: 35,
    leadership: 64,
  },
  {
    name: "Priya Patel",
    role: "Treasury Specialist",
    dept: "Finance",
    productivity: 60,
    utilization: 72,
    fitment: 55,
    fatigue: 69,
    automation: 58,
    leadership: 48,
  },
];

/* ----------------------- HELPERS ----------------------- */

function bucket(score) {
  return bucketRanges.find(b => score >= b.min && score <= b.max)?.name || "Medium";
}

function getBusinessCriticality(e) {
  return (
    e.leadership * 0.45 +
    (e.role.includes("Senior") ? 80 : 60) * 0.25 +
    e.productivity * 0.15 +
    e.fitment * 0.15
  );
}

function aiRecommendation(e) {
  if (e.fatigue > 75) return "Reduce workload and rebalance tasks.";
  if (e.fitment < 50) return "Reskill or redeploy to better-fit role.";
  if (e.automation > 70) return "Target for automation or role redesign.";
  if (e.leadership > 80) return "Consider for leadership or strategic projects.";
  return "Maintain and monitor performance.";
}

/* ----------------------- COMPONENT ----------------------- */

export default function SixBySixAnalysis() {
  const [selected, setSelected] = useState(null);

  const enriched = useMemo(() => {
    return employees.map(e => ({
      ...e,
      "Business Criticality": Math.round(getBusinessCriticality(e)),
    }));
  }, []);

  const matrix = useMemo(() => {
    const m = {};
    rows.forEach(r => cols.forEach(c => (m[`${r}-${c}`] = [])));

    enriched.forEach(e => {
      rows.forEach(r => {
        const value = r === "Business Criticality" ? e[r] : e[r.toLowerCase()];
        const col = bucket(value);
        m[`${r}-${col}`].push(e);
      });
    });
    return m;
  }, [enriched]);

  return (
    <div className="p-10 bg-slate-50 min-h-screen space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">6×6 Workforce Intelligence Matrix</h1>
        <p className="text-slate-500">AI-driven segmentation of risk, fitment and performance</p>
      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-4 gap-6">
        <KPI title="Workforce at Risk" value="127 FTE" />
        <KPI title="Cost at Risk" value="$8.2M" />
        <KPI title="Automation Potential" value="$3.4M" />
        <KPI title="Productivity Leakage" value="21%" />
      </div>

      {/* MATRIX */}
      <Card className="p-6">
        <div className="grid grid-cols-7 gap-3">
          <div />
          {cols.map(c => (
            <div key={c} className="text-center text-sm font-semibold text-slate-600">
              {c}
            </div>
          ))}

          {rows.map(r => (
            <React.Fragment key={r}>
              <div className="text-sm font-semibold text-slate-700">{r}</div>
              {cols.map(c => {
                const list = matrix[`${r}-${c}`];
                return (
                  <div
                    key={c}
                    onClick={() => setSelected({ r, c, list })}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-3 cursor-pointer hover:bg-blue-100 transition"
                  >
                    <div className="text-lg font-bold text-blue-700">{list.length}</div>
                    <div className="text-xs text-slate-500">Employees</div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </Card>

      {/* MODAL */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selected?.r} → {selected?.c}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {selected?.list.map((e, i) => (
              <div key={i} className="p-4 border rounded-lg bg-slate-50">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{e.name}</div>
                    <div className="text-sm text-slate-500">{e.role} • {e.dept}</div>
                  </div>
                  <Badge>{e["Business Criticality"]}</Badge>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-3 text-sm">
                  <div>Fitment: {e.fitment}</div>
                  <div>Fatigue: {e.fatigue}</div>
                  <div>Automation: {e.automation}</div>
                  <div>Leadership: {e.leadership}</div>
                </div>

                <div className="mt-3 bg-blue-50 p-3 rounded text-sm text-blue-700 flex gap-2">
                  <Brain className="w-4 h-4" />
                  {aiRecommendation(e)}
>>>>>>> backup-frontend-ui
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
<<<<<<< HEAD
    </div>
  );
}
=======

    </div>
  );
}

/* ----------------------- SMALL UI ----------------------- */

function KPI({ title, value }) {
  return (
    <Card className="p-4">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-bold text-blue-700">{value}</div>
    </Card>
  );
}
>>>>>>> backup-frontend-ui
