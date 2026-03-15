import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

interface ChartDonutProps {
  title: string;
  data: { name: string; value: number; color: string }[];
}

export function ChartDonut({ title, data }: ChartDonutProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid hsl(220 13% 91%)", fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} iconType="square" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
