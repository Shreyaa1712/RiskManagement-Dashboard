import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, CartesianGrid } from 'recharts';

const stressScenarios = [
  { 
    name: 'Market Crash', 
    impact: -24500, 
    severity: 85, 
    probability: 0.05,
    color: '#ef4444',
    description: 'Global market downturn scenario'
  },
  { 
    name: 'Interest Rate Shock', 
    impact: -18200, 
    severity: 65, 
    probability: 0.15,
    color: '#f97316',
    description: 'Rapid interest rate increase'
  },
  { 
    name: 'Credit Crisis', 
    impact: -21000, 
    severity: 75, 
    probability: 0.08,
    color: '#eab308',
    description: 'Financial sector stress scenario'
  },
  { 
    name: 'Currency Devaluation', 
    impact: -12500, 
    severity: 45, 
    probability: 0.12,
    color: '#22c55e',
    description: 'Major currency depreciation'
  },
  { 
    name: 'Sector Rotation', 
    impact: -8900, 
    severity: 30, 
    probability: 0.25,
    color: '#3b82f6',
    description: 'Industry sector rebalancing'
  },
];

export function StressTesting() {
  const formatCurrency = (value: number) => {
    return `$${Math.abs(value).toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  return (
    <Card className="bg-gradient-card border-border/50 p-6 shadow-card">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Stress Test Results</h3>
            <p className="text-sm text-muted-foreground">Portfolio impact under adverse market scenarios</p>
          </div>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            High Risk
          </Badge>
        </div>

        {/* Chart Section */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={stressScenarios} 
              layout="horizontal"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                type="number" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${Math.abs(value / 1000).toFixed(0)}K`}
                domain={[-30000, 0]}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                width={100}
              />
              <Tooltip 
                formatter={(value, name) => [
                  formatCurrency(Number(value)), 
                  'Portfolio Impact'
                ]}
                labelFormatter={(label) => `${label} Scenario`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="impact" 
                radius={[0, 4, 4, 0]}
                barSize={20}
              >
                {stressScenarios.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-destructive">
              ${Math.abs(stressScenarios.reduce((sum, s) => sum + s.impact, 0)).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Potential Loss</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-warning">
              {Math.round(stressScenarios.reduce((sum, s) => sum + s.severity, 0) / stressScenarios.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Average Severity</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-2xl font-bold text-info">
              {stressScenarios.length}
            </div>
            <div className="text-sm text-muted-foreground">Scenarios Tested</div>
          </div>
        </div>

        {/* Risk Severity Levels */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Risk Severity Analysis</h4>
          <div className="space-y-3">
            {stressScenarios.map((scenario, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-foreground font-medium">{scenario.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {(scenario.probability * 100).toFixed(1)}% prob
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">{formatCurrency(scenario.impact)}</span>
                    <span className="text-muted-foreground">{formatPercentage(scenario.severity)}</span>
                  </div>
                </div>
                <Progress 
                  value={scenario.severity} 
                  className="h-2"
                  style={{
                    '--progress-background': scenario.color,
                  } as React.CSSProperties}
                />
                <p className="text-xs text-muted-foreground">{scenario.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Level Indicator */}
        <div className="p-4 bg-muted/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-foreground">Overall Risk Assessment</h5>
              <p className="text-sm text-muted-foreground">Based on stress test scenarios</p>
            </div>
            <Badge variant="destructive" className="text-sm">
              Elevated Risk Level
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}