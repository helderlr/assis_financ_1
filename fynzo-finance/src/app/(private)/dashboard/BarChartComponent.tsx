'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

const data = [
  { categoria: "Gasto no mercado", valor: -2000 },
  { categoria: "Consultoria realizada", valor: 5000 },
];

export default function BarChartComponent() {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={40}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="categoria" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
          <Bar dataKey="valor" radius={[6, 6, 0, 0]} isAnimationActive>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.categoria === "Gasto no mercado" ? "#ef4444" : "#22c55e"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 