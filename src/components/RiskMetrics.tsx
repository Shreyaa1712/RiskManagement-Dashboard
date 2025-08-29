import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const riskMetrics = [
  {
    metric: "Portfolio VaR (95%)",
    value: "$12,450",
    description: "Maximum expected loss over 1 day",
    status: "moderate",
    percentage: "4.2%"
  },
  {
    metric: "Expected Shortfall",
    value: "$18,750",
    description: "Average loss beyond VaR threshold",
    status: "high",
    percentage: "6.8%"
  },
  {
    metric: "Sharpe Ratio",
    value: "1.42",
    description: "Risk-adjusted return measure",
    status: "good",
    percentage: "+0.15"
  },
  {
    metric: "Maximum Drawdown",
    value: "8.3%",
    description: "Largest peak-to-trough decline",
    status: "moderate",
    percentage: "-2.1%"
  },
  {
    metric: "Beta to Market",
    value: "0.85",
    description: "Portfolio sensitivity to market moves",
    status: "low",
    percentage: "-0.05"
  }
];

export function RiskMetrics() {
  return (
    <Card className="bg-gradient-card border-border/50 p-6 shadow-card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Risk Analytics</h3>
        <div className="space-y-4">
          {riskMetrics.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border/30 last:border-b-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{item.metric}</span>
                  <Badge variant={
                    item.status === 'good' ? 'default' : 
                    item.status === 'high' ? 'destructive' : 
                    'secondary'
                  } className="text-xs">
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{item.value}</p>
                <p className={`text-sm ${
                  item.percentage.startsWith('+') ? 'text-success' : 
                  item.percentage.startsWith('-') ? 'text-destructive' : 
                  'text-muted-foreground'
                }`}>
                  {item.percentage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}