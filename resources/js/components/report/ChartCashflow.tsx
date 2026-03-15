import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

interface ChartCashflowProps {
  title: string;
  data: Record<string, any>[];
  lines: { dataKey: string; color: string; name: string }[];
}

export function ChartCashflow({ title, data, lines }: ChartCashflowProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215 14% 46%)" }} />
          <YAxis tick={{ fontSize: 12, fill: "hsl(215 14% 46%)" }} tickFormatter={(v) => `${v / 1000000}`} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid hsl(220 13% 91%)",
              fontSize: 12,
            }}
            formatter={(value) => {
              const num = Number(value ?? 0);
              return `Rp ${num.toLocaleString("id-ID")}`;
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12 }}
            iconType="square"
          />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              name={line.name}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
