import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function KPICard({ title, value, icon: Icon, trend, subtitle, color = "default", progress, progressColor = "primary" }) {
  const colorClasses = {
    green: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
    blue: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
    red: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
    orange: "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800",
    default: "",
  };

  const iconColorClasses = {
    green: "text-green-600 dark:text-green-400",
    blue: "text-blue-600 dark:text-blue-400",
    red: "text-red-600 dark:text-red-400",
    orange: "text-orange-600 dark:text-orange-400",
    default: "text-muted-foreground",
  };

  return (
    <Card className={`${colorClasses[color]} border`} data-testid={`card-kpi-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className={`h-5 w-5 ${iconColorClasses[color]}`} />
      </CardHeader>

      <CardContent>
        <div
          className="text-3xl font-bold font-mono"
          data-testid={`text-kpi-value-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {value}
        </div>

        {progress !== undefined && (
          <Progress value={Math.max(0, Math.min(100, progress))} className={cn("mt-2", progressColor === "blue" ? "[&>div]:bg-blue-500" : progressColor === "green" ? "[&>div]:bg-green-500" : progressColor === "red" ? "[&>div]:bg-red-500" : "")} />
        )}

        {trend && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3 text-green-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600" />
            )}

            <span className={trend.isPositive ? "text-green-600" : "text-red-600"}>
              {Math.abs(trend.value)}%
            </span>

            <span>vs last month</span>
          </div>
        )}

        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
