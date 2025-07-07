"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend } from "recharts";

const dadosMock = [
  { mes: "janeiro", receitas: 0, despesas: 0, saldo: 0 },
  { mes: "fevereiro", receitas: 0, despesas: 0, saldo: 0 },
  { mes: "março", receitas: 0, despesas: 0, saldo: 0 },
  { mes: "abril", receitas: 5000, despesas: 50, saldo: 4950 },
  { mes: "maio", receitas: 0, despesas: 0, saldo: 0 },
  { mes: "junho", receitas: 0, despesas: 0, saldo: 0 },
  { mes: "julho", receitas: 0, despesas: 0, saldo: 0 },
  { mes: "agosto", receitas: 0, despesas: 0, saldo: 0 },
  { mes: "setembro", receitas: 0, despesas: 0, saldo: 0 },
  { mes: "outubro", receitas: 0, despesas: 0, saldo: 0 },
  { mes: "novembro", receitas: 0, despesas: 0, saldo: 0 },
  { mes: "dezembro", receitas: 0, despesas: 0, saldo: 0 },
];

const despesasPorCategoria = [
  { name: "Alimentação", value: 50, color: "#ef4444" },
];
const receitasPorCategoria = [
  { name: "Consultoria", value: 5000, color: "#22c55e" },
];

const lancamentosFuturosMock = {
  receitas: 0,
  receitasQtd: 0,
  despesas: 300,
  despesasQtd: 3,
  saldo: -300,
  saldoQtd: 3,
  categorias: [
    { name: "IPTU", value: 300, percent: 100, qtd: 3, color: "#22c55e" },
  ],
};

const tabs = [
  { label: "Balanço Mensal" },
  { label: "Categorias" },
  { label: "Fluxo de Caixa" },
  { label: "Lançamentos Futuro" },
];

// Função para label customizado (usando trigonometria para centralizar)
const renderPieLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
  fill,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  percent: number;
  name: string;
  fill?: string;
}) => {
  const RADIAN = Math.PI / 180;
  // Se for 100%, centraliza o label no meio do gráfico
  if (percent === 1) {
    return (
      <text
        x={cx}
        y={cy - outerRadius - 16}
        fill={fill || "#222"}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={16}
        fontWeight={600}
      >
        {`${name}: 100%`}
      </text>
    );
  }
  // Para outros casos, mantém o label dentro do gráfico
  const radius = outerRadius * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={fill || "#222"}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
      fontWeight={500}
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Relatorios() {
  const [tab, setTab] = useState("Balanço Mensal");
  const [ano, setAno] = useState(2025);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Relatórios</h1>
        <p className="text-zinc-500 dark:text-zinc-300">Visualize seus relatórios financeiros e análises</p>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.label}
            className={`px-4 py-2 rounded font-medium transition-colors ${tab === t.label ? "bg-green-600 dark:bg-blue-600 text-white" : "bg-zinc-100 dark:bg-[#223366] text-zinc-700 dark:text-zinc-200"}`}
            onClick={() => setTab(t.label)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Conteúdo do Balanço Mensal */}
      {tab === "Balanço Mensal" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Balanço Mensal</h2>
            <p className="text-zinc-500 dark:text-zinc-300">Receitas, despesas e saldo por mês</p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <button className="px-2 py-1 rounded border border-zinc-200 dark:border-[#223366] bg-white dark:bg-[#223366] text-zinc-700 dark:text-zinc-200">&#60;</button>
            <select
              className="border border-zinc-200 dark:border-[#223366] rounded px-3 py-2 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-[#223366]"
              value={ano}
              onChange={e => setAno(Number(e.target.value))}
            >
              <option>2025</option>
              <option>2024</option>
            </select>
            <button className="px-2 py-1 rounded border border-zinc-200 dark:border-[#223366] bg-white dark:bg-[#223366] text-zinc-700 dark:text-zinc-200">&#62;</button>
          </div>
          <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-6 shadow-sm">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dadosMock} barCategoryGap={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="mes" tick={{ fontSize: 13, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 13, fill: '#64748b' }} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                    name.charAt(0).toUpperCase() + name.slice(1)
                  ]}
                  labelFormatter={label => `Mês: ${label}`}
                />
                <Legend formatter={v => {
                  if (v === 'receitas') return <span className="text-green-600">Receitas</span>;
                  if (v === 'despesas') return <span className="text-red-500">Despesas</span>;
                  if (v === 'saldo') return <span className="text-blue-600">Saldo</span>;
                  return v;
                }} />
                <Bar dataKey="receitas" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saldo" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-4 text-sm">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-600 inline-block" /> Receitas</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block" /> Despesas</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-600 inline-block" /> Saldo</span>
            </div>
          </div>
        </div>
      )}
      {tab === "Categorias" && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Distribuição por Categorias</h2>
              <p className="text-zinc-500 dark:text-zinc-300">Análise detalhada das suas transações por categoria</p>
            </div>
            <form className="flex flex-col md:flex-row gap-2 items-end">
              <div className="flex flex-col">
                <label className="text-xs text-zinc-500 dark:text-zinc-300 mb-1">Data Inicial</label>
                <input type="date" className="border border-zinc-200 dark:border-[#223366] rounded px-3 py-2 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-[#223366]" defaultValue="2025-04-01" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-zinc-500 dark:text-zinc-300 mb-1">Data Final</label>
                <input type="date" className="border border-zinc-200 dark:border-[#223366] rounded px-3 py-2 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-[#223366]" defaultValue="2025-04-02" />
              </div>
              <button type="submit" className="bg-green-600 dark:bg-blue-600 hover:bg-green-700 dark:hover:bg-blue-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors">Aplicar</button>
            </form>
          </div>
          <div className="text-center font-semibold text-zinc-900 dark:text-zinc-100 mt-4 mb-2">
            Distribuição por categoria no período de 01/04/2025 a 02/04/2025
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">Despesas por Categoria</h3>
              <PieChart width={300} height={240}>
                <Pie
                  data={despesasPorCategoria}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#ef4444"
                  label={renderPieLabel}
                  labelLine={false}
                >
                  {despesasPorCategoria.map((entry, idx) => (
                    <Cell key={`cell-desp-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <PieTooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
              </PieChart>
              <div className="mt-2 flex justify-center w-full">
                <span className="flex items-center gap-1 text-red-500 text-sm font-medium"><span className="w-3 h-3 rounded bg-red-500 inline-block" /> Alimentação</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">Receitas por Categoria</h3>
              <PieChart width={300} height={240}>
                <Pie
                  data={receitasPorCategoria}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#22c55e"
                  label={renderPieLabel}
                  labelLine={false}
                >
                  {receitasPorCategoria.map((entry, idx) => (
                    <Cell key={`cell-rec-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <PieTooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
              </PieChart>
              <div className="mt-2 flex justify-center w-full">
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium"><span className="w-3 h-3 rounded bg-green-600 inline-block" /> Consultoria</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === "Fluxo de Caixa" && (
        <div className="space-y-6">
          {/* Título e filtros na mesma linha */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-2">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Fluxo de Caixa</h2>
              <p className="text-zinc-500 dark:text-zinc-300">Análise detalhada do fluxo de caixa por período</p>
            </div>
            <form className="flex flex-col md:flex-row md:items-end gap-2">
              <div className="flex flex-col">
                <label className="text-xs text-zinc-500 dark:text-zinc-300 mb-1">Data Inicial</label>
                <input type="date" className="border border-zinc-200 dark:border-[#223366] rounded px-3 py-2 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-[#223366]" defaultValue="2025-03-03" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-zinc-500 dark:text-zinc-300 mb-1">Data Final</label>
                <input type="date" className="border border-zinc-200 dark:border-[#223366] rounded px-3 py-2 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-[#223366]" defaultValue="2025-06-30" />
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <input type="checkbox" id="incluirFuturos" className="accent-green-600 dark:accent-blue-600 w-4 h-4" defaultChecked />
                <label htmlFor="incluirFuturos" className="text-sm text-zinc-700 dark:text-zinc-200">Incluir lançamentos futuros</label>
              </div>
              <button type="submit" className="bg-green-600 dark:bg-blue-600 hover:bg-green-700 dark:hover:bg-blue-700 text-white font-medium px-6 py-2 rounded text-sm transition-colors">Aplicar</button>
            </form>
          </div>
          {/* Cards resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Receitas */}
            <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-5 shadow-sm flex flex-col gap-1">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Receitas no Período</span>
              <span className="text-2xl font-bold text-green-600">R$ 5.000,00</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-300">Média diária: R$ 1.250,00</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-300">Maior receita: <span className="font-medium text-zinc-700 dark:text-zinc-100">R$ 5.000,00 em 01/04/2025</span></span>
            </div>
            {/* Despesas */}
            <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-5 shadow-sm flex flex-col gap-1">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Despesas no Período</span>
              <span className="text-2xl font-bold text-red-500">R$ 350,00</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-300">Média diária: R$ 87,50</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-300">Maior despesa: <span className="font-medium text-zinc-700 dark:text-zinc-100">R$ 100,00 em 14/04/2025</span></span>
            </div>
            {/* Saldo */}
            <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-5 shadow-sm flex flex-col gap-1">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Saldo do Período</span>
              <span className="text-2xl font-bold text-blue-600">R$ 4.650,00</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-300">4 dias analisados</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-300">Situação: <span className="font-medium text-green-600">Positivo</span></span>
              <span className="flex items-center gap-1 text-xs text-orange-600 mt-1"><span className="text-lg">⚠️</span>Inclui lançamentos futuros</span>
            </div>
          </div>
          {/* Gráfico de evolução do saldo */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 mt-4">Evolução do Saldo no Período</h3>
            <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-4 shadow-sm">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[
                  { dia: "03/03", saldo: 5000 },
                  { dia: "04/03", saldo: 5000 },
                  { dia: "05/03", saldo: 5000 },
                  { dia: "14/04", saldo: 4650 },
                ]} barCategoryGap={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="dia" tick={{ fontSize: 13, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 13, fill: '#64748b' }} />
                  <Tooltip
                    formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    labelFormatter={label => `Dia: ${label}`}
                  />
                  <Bar dataKey="saldo" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      {tab === "Lançamentos Futuro" && (
        <div className="space-y-6">
          {/* Título e filtros na mesma linha */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Lançamentos Futuros por Período</h2>
              <p className="text-zinc-500 dark:text-zinc-300">Análise detalhada dos lançamentos futuros previstos</p>
            </div>
            <form className="flex flex-col md:flex-row md:items-end gap-2">
              <div className="flex flex-col">
                <label className="text-xs text-zinc-500 dark:text-zinc-300 mb-1">Data Inicial</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M7 4v2m10-2v2M3 8.5A2.5 2.5 0 0 1 5.5 6h13A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-9Z"/><rect width="5" height="5" x="7" y="10" fill="#fff" stroke="#fff" strokeWidth="0"/></svg>
                  </span>
                  <input type="date" className="pl-10 pr-3 py-2 border border-zinc-200 dark:border-[#223366] rounded text-zinc-700 dark:text-zinc-200 bg-white dark:bg-[#223366] w-[160px]" defaultValue="2025-04-02" />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-zinc-500 dark:text-zinc-300 mb-1">Data Final</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M7 4v2m10-2v2M3 8.5A2.5 2.5 0 0 1 5.5 6h13A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-9Z"/><rect width="5" height="5" x="7" y="10" fill="#fff" stroke="#fff" strokeWidth="0"/></svg>
                  </span>
                  <input type="date" className="pl-10 pr-3 py-2 border border-zinc-200 dark:border-[#223366] rounded text-zinc-700 dark:text-zinc-200 bg-white dark:bg-[#223366] w-[160px]" defaultValue="2025-07-01" />
                </div>
              </div>
              <button type="submit" className="bg-green-600 dark:bg-blue-600 hover:bg-green-700 dark:hover:bg-blue-700 text-white font-medium px-6 py-2 rounded text-sm transition-colors mt-4 md:mt-0">Aplicar</button>
            </form>
          </div>
          {/* Cards resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Receitas Futuras */}
            <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-5 shadow-sm flex flex-col gap-1">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Receitas Futuras</span>
              <span className="text-2xl font-bold text-green-600">R$ {lancamentosFuturosMock.receitas.toFixed(2).replace('.', ',')}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-300">{lancamentosFuturosMock.receitasQtd} lançamentos de entrada</span>
            </div>
            {/* Despesas Futuras */}
            <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-5 shadow-sm flex flex-col gap-1">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Despesas Futuras</span>
              <span className="text-2xl font-bold text-red-500">R$ {lancamentosFuturosMock.despesas.toFixed(2).replace('.', ',')}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-300">{lancamentosFuturosMock.despesasQtd} lançamentos de saída</span>
            </div>
            {/* Saldo Previsto */}
            <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-5 shadow-sm flex flex-col gap-1">
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Saldo Previsto</span>
              <span className="text-2xl font-bold text-red-500">-R$ {Math.abs(lancamentosFuturosMock.saldo).toFixed(2).replace('.', ',')}</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-300">Total de {lancamentosFuturosMock.saldoQtd} lançamentos</span>
            </div>
          </div>
          {/* Gráficos e detalhamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="flex flex-col items-start">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 text-left">Distribuição por Categoria</h3>
              <PieChart width={220} height={220} className="self-start">
                <Pie
                  data={lancamentosFuturosMock.categorias}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#22c55e"
                  label={({ cx, cy, percent, name }) => `${name}: ${percent * 100}%`}
                  labelLine={false}
                >
                  {lancamentosFuturosMock.categorias.map((entry, idx) => (
                    <Cell key={`cell-cat-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <PieTooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
              </PieChart>
              <div className="mt-2 flex justify-start w-full">
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium"><span className="w-3 h-3 rounded bg-green-600 inline-block" /> {lancamentosFuturosMock.categorias[0].name}</span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">Detalhamento por Categoria</h3>
              <div className="text-zinc-700 dark:text-zinc-200 text-sm">
                {lancamentosFuturosMock.categorias.map(cat => (
                  <div key={cat.name} className="mb-1">{cat.name}<span className="ml-2 text-zinc-500">{cat.qtd} lançamentos</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Outras abas podem ser implementadas depois */}
    </div>
  );
} 