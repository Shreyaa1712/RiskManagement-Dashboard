import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

const portfolioData = [
  { date: '01/23', value: 100000, var: 95000 },
  { date: '02/23', value: 105000, var: 98000 },
  { date: '03/23', value: 98000, var: 92000 },
  { date: '04/23', value: 110000, var: 103000 },
  { date: '05/23', value: 115000, var: 108000 },
  { date: '06/23', value: 108000, var: 101000 },
  { date: '07/23', value: 120000, var: 112000 },
  { date: '08/23', value: 118000, var: 110000 },
  { date: '09/23', value: 125000, var: 117000 },
  { date: '10/23', value: 122000, var: 114000 },
  { date: '11/23', value: 128000, var: 119000 },
  { date: '12/23', value: 132000, var: 123000 },
];

export function PortfolioChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={portfolioData}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(200 100% 60%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(200 100% 60%)" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="varGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(0 75% 60%)" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="hsl(0 75% 60%)" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Area
            type="monotone"
            dataKey="var"
            stroke="hsl(0 75% 60%)"
            fill="url(#varGradient)"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(200 100% 60%)"
            fill="url(#portfolioGradient)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}