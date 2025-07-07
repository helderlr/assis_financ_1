import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import BarChartComponent from "./BarChartComponent";

const data = [
  { categoria: "Gasto no mercado", valor: -2000 },
  { categoria: "Consultoria realizada", valor: 5000 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Dashboard</h1>
        <p className="text-zinc-500 dark:text-zinc-300">Resumo das suas finanças – abril, 2025</p>
      </div>
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-[#13224a] rounded-xl border border-zinc-100 dark:border-[#223366] p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-zinc-500 dark:text-zinc-300 text-sm font-medium">Saldo do Mês</span>
          <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">R$ 4.950,00</span>
          <span className="text-zinc-400 dark:text-zinc-200 text-xs">Receitas e despesas do mês atual</span>
        </div>
        <div className="bg-white dark:bg-[#13224a] rounded-xl border border-zinc-100 dark:border-[#223366] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 dark:text-zinc-300 text-sm font-medium">Receitas</span>
            <ArrowUpRight className="text-green-600 dark:text-blue-400" size={18} />
          </div>
          <span className="text-3xl font-bold text-green-600 dark:text-blue-400">R$ 5.000,00</span>
          <span className="text-zinc-400 dark:text-zinc-200 text-xs">Total de entradas do mês</span>
        </div>
        <div className="bg-white dark:bg-[#13224a] rounded-xl border border-zinc-100 dark:border-[#223366] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 dark:text-zinc-300 text-sm font-medium">Despesas</span>
            <ArrowDownRight className="text-red-500" size={18} />
          </div>
          <span className="text-3xl font-bold text-red-500">R$ 50,00</span>
          <span className="text-zinc-400 dark:text-zinc-200 text-xs">Total de saídas do mês</span>
        </div>
        <div className="bg-white dark:bg-[#13224a] rounded-xl border border-zinc-100 dark:border-[#223366] p-6 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 dark:text-zinc-300 text-sm font-medium">Projeção</span>
            <TrendingUp className="text-green-500 dark:text-blue-400" size={18} />
          </div>
          <span className="text-3xl font-bold text-green-500 dark:text-blue-400">R$ 4.450,00</span>
          <span className="text-zinc-400 dark:text-zinc-200 text-xs">Saldo projetado com lançamentos futuros</span>
        </div>
      </div>
      {/* Transações Recentes */}
      <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-6 shadow-sm">
        <h2 className="text-lg font-bold dark:text-zinc-100 mb-1">Transações Recentes</h2>
        <p className="text-zinc-500 dark:text-zinc-300 text-sm mb-4">Últimas 5 transações registradas</p>
        <div className="h-56">
          <BarChartComponent />
        </div>
      </div>
    </div>
  );
} 