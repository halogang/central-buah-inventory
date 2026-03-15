import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

interface ChartBarProps {
  title: string;
  data: Record<string, any>[];
  bars: { dataKey: string; color: string; name: string }[];
  layout?: "vertical" | "horizontal";
}

export function ChartBar({ title, data, bars, layout = "horizontal" }: ChartBarProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        {layout === "vertical" ? (
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(215 14% 46%)" }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "hsl(215 14% 46%)" }} width={75} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220 13% 91%)", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {bars.map((bar) => (
              <Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.color} name={bar.name} barSize={14} radius={[0, 4, 4, 0]} />
            ))}
          </BarChart>
        ) : (
          <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(215 14% 46%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(215 14% 46%)" }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220 13% 91%)", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {bars.map((bar) => (
              <Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.color} name={bar.name} barSize={32} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
