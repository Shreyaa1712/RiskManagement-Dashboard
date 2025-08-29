import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, change, changeType = 'neutral', icon, className }: MetricCardProps) {
  return (
    <Card className={cn(
      "bg-gradient-card border-border/50 p-6 shadow-card transition-all duration-300 hover:shadow-glow",
      "animate-slide-up",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              changeType === 'positive' && "text-success",
              changeType === 'negative' && "text-destructive",
              changeType === 'neutral' && "text-muted-foreground"
            )}>
              {change}
            </div>
          )}
        </div>
        {icon && (
          <div className="text-primary opacity-80">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}