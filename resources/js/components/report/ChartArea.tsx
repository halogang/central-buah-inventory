import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

interface ChartAreaProps {
  title: string;
  data: Record<string, any>[];
  areas: { dataKey: string; color: string; name: string }[];
}

export function ChartArea({ title, data, areas }: ChartAreaProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215 14% 46%)" }} />
          <YAxis tick={{ fontSize: 12, fill: "hsl(215 14% 46%)" }} tickFormatter={(v) => `${v / 1000000}`} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid hsl(220 13% 91%)", fontSize: 12 }}
            formatter={(value: number) => `Rp ${value.toLocaleString("id-ID")}`}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} iconType="square" />
          {areas.map((area) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              stroke={area.color}
              fill={area.color}
              fillOpacity={0.15}
              name={area.name}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
