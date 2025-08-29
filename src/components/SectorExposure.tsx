import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const sectorData = [
  { name: 'Technology', value: 35, color: 'hsl(200 100% 60%)' },
  { name: 'Healthcare', value: 22, color: 'hsl(120 60% 50%)' },
  { name: 'Financial', value: 18, color: 'hsl(180 100% 70%)' },
  { name: 'Consumer', value: 15, color: 'hsl(45 93% 58%)' },
  { name: 'Energy', value: 10, color: 'hsl(0 75% 60%)' },
];

export function SectorExposure() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sectorData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {sectorData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Allocation']}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
          />
          <Legend 
            wrapperStyle={{ 
              fontSize: '14px',
              color: 'hsl(var(--foreground))'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}