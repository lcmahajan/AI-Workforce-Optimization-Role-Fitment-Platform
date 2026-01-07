import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  MessageCircle,
  Users,
  Shield,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";

/* ---------------- DEMO DATA ---------------- */
const teamAverages = {
  communication: 89,
  teamwork: 87,
  leadership: 82,
};

const teamHealthScore = 86;

const employees = [
  {
    name: "Sarah Johnson",
    role: "Senior Developer",
    skills: {
      communication: 92,
      teamwork: 88,
      leadership: 85,
      problemSolving: 95,
      empathy: 87,
      creativity: 90,
    },
  },
  {
    name: "Mike Chen",
    role: "Product Manager",
    skills: {
      communication: 85,
      teamwork: 90,
      leadership: 88,
      problemSolving: 82,
      empathy: 91,
      creativity: 84,
    },
  },
];

export default function Softskills() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Soft Skills Intelligence</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Behavioral analytics, collaboration patterns, and leadership potential —
          interpreted using AI-driven insights.
        </p>
      </div>

      {/* AI SUMMARY */}
      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Behavioral Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Overall team demonstrates strong communication and problem-solving abilities.
          Leadership capability is solid but varies across roles. Empathy and teamwork
          remain consistent strengths across the organization.
        </CardContent>
      </Card>

      {/* TEAM HEALTH */}
      <Card>
        <CardHeader>
          <CardTitle>Team Soft Skills Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-blue-600">
              {teamHealthScore}%
            </div>
            <Badge className="bg-green-500 text-white">Strong Capability</Badge>
          </div>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Composite score derived from communication, teamwork, leadership,
            empathy, and problem-solving signals.
          </p>
        </CardContent>
      </Card>

      {/* AVERAGE KPIs */}
      <div className="grid gap-6 md:grid-cols-3">
        <SkillKPI title="Communication" value={teamAverages.communication} icon={MessageCircle} />
        <SkillKPI title="Teamwork" value={teamAverages.teamwork} icon={Users} />
        <SkillKPI title="Leadership" value={teamAverages.leadership} icon={Shield} />
      </div>

      {/* EMPLOYEE SKILLS */}
      <div className="space-y-8">
        {employees.map((emp, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>
                {emp.name}
                <span className="block text-sm text-muted-foreground">
                  {emp.role}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              {Object.entries(emp.skills).map(([skill, value]) => (
                <div key={skill}>
                  <div className="flex justify-between text-sm mb-1 capitalize">
                    <span>{skill.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-medium">{value}%</span>
                  </div>
                  <Progress value={value} />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI COACHING */}
      <div className="grid gap-6 md:grid-cols-3">
        <InsightCard
          title="Strength"
          icon={HeartHandshake}
          text="High empathy and collaboration drive strong team cohesion."
          color="border-green-500"
        />
        <InsightCard
          title="Development Area"
          icon={Lightbulb}
          text="Leadership consistency can be improved through mentorship programs."
          color="border-yellow-400"
        />
        <InsightCard
          title="Recommendation"
          icon={Shield}
          text="Introduce cross-team leadership initiatives and peer coaching."
          color="border-blue-500"
        />
      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SkillKPI({ title, value, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Avg {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-blue-600">{value}%</div>
        <p className="text-xs text-muted-foreground mt-1">Across all employees</p>
      </CardContent>
    </Card>
  );
}

function InsightCard({ title, icon: Icon, text, color }) {
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