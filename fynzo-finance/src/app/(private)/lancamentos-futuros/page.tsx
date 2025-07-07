"use client";
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Plus, Trash2, Check } from "lucide-react";

const lancamentosMock = [
  { id: 1, data: "15/04/2025", descricao: "IPTU parcela 1 de 5", categoria: "IPTU", recorrente: false, valor: -100 },
  { id: 2, data: "15/05/2025", descricao: "IPTU parcela 2 de 5", categoria: "IPTU", recorrente: false, valor: -100 },
  { id: 3, data: "15/06/2025", descricao: "IPTU parcela 3 de 5", categoria: "IPTU", recorrente: false, valor: -100 },
  { id: 4, data: "15/07/2025", descricao: "IPTU parcela 4 de 5", categoria: "IPTU", recorrente: false, valor: -100 },
  { id: 5, data: "15/08/2025", descricao: "IPTU parcela 5 de 5", categoria: "IPTU", recorrente: false, valor: -100 },
];

export default function LancamentosFuturos() {
  const [tab, setTab] = useState("pendentes");
  const aReceber = 0;
  const aPagar = 500;
  const saldoPrevisto = aReceber - aPagar;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Lançamentos Futuros</h1>
        <p className="text-zinc-500 dark:text-zinc-300">Gerencie seus lançamentos futuros e recorrentes</p>
      </div>
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white dark:bg-[#13224a] rounded-xl border border-zinc-100 dark:border-[#223366] p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-zinc-500 dark:text-zinc-300 text-sm font-medium flex items-center gap-1">A Receber <ArrowUpRight className="text-green-600 dark:text-blue-400" size={16} /></span>
          <span className="text-3xl font-bold text-green-600 dark:text-blue-400">R$ {aReceber.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
        </div>
        <div className="bg-white dark:bg-[#13224a] rounded-xl border border-zinc-100 dark:border-[#223366] p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-zinc-500 dark:text-zinc-300 text-sm font-medium flex items-center gap-1">A Pagar <ArrowDownRight className="text-red-500" size={16} /></span>
          <span className="text-3xl font-bold text-red-500">R$ {aPagar.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
        </div>
        <div className="bg-white dark:bg-[#13224a] rounded-xl border border-zinc-100 dark:border-[#223366] p-6 flex flex-col gap-2 shadow-sm">
          <span className="text-zinc-500 dark:text-zinc-300 text-sm font-medium flex items-center gap-1">Saldo Previsto <Plus className="text-green-600 dark:text-blue-400" size={16} /></span>
          <span className={`text-3xl font-bold ${saldoPrevisto < 0 ? "text-red-500" : "text-green-600 dark:text-blue-400"}`}>{saldoPrevisto < 0 ? "-" : ""}R$ {Math.abs(saldoPrevisto).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-t-md font-medium border-b-2 transition-colors ${tab === "pendentes" ? "border-green-600 dark:border-blue-400 text-green-600 dark:text-blue-400 bg-white dark:bg-[#13224a]" : "border-transparent text-zinc-500 dark:text-zinc-300"}`}
          onClick={() => setTab("pendentes")}
        >
          Lançamentos Pendentes
        </button>
        <button
          className={`px-4 py-2 rounded-t-md font-medium border-b-2 transition-colors ${tab === "efetivados" ? "border-green-600 dark:border-blue-400 text-green-600 dark:text-blue-400 bg-white dark:bg-[#13224a]" : "border-transparent text-zinc-500 dark:text-zinc-300"}`}
          onClick={() => setTab("efetivados")}
        >
          Lançamentos Efetivados
        </button>
      </div>
      {/* Tabela de lançamentos pendentes */}
      {tab === "pendentes" && (
        <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold dark:text-zinc-100">Lançamentos Pendentes</h2>
            <span className="text-zinc-400 dark:text-zinc-300 text-sm">{lancamentosMock.length} lançamentos pendentes</span>
          </div>
          <div className="flex gap-2 mb-4 justify-end">
            <button className="bg-green-600 dark:bg-blue-600 hover:bg-green-700 dark:hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center gap-2 text-sm transition-colors">
              + Nova entrada
            </button>
            <button className="bg-zinc-100 dark:bg-[#223366] hover:bg-zinc-200 dark:hover:bg-[#1a2540] text-zinc-700 dark:text-zinc-200 font-medium px-4 py-2 rounded flex items-center gap-2 text-sm border border-zinc-200 dark:border-[#223366] transition-colors">
              + Nova saída
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-zinc-500 dark:text-zinc-300 border-b border-zinc-100 dark:border-[#223366]">
                  <th className="py-2 px-2 font-semibold">Data Prevista</th>
                  <th className="py-2 px-2 font-semibold">Descrição</th>
                  <th className="py-2 px-2 font-semibold">Categoria</th>
                  <th className="py-2 px-2 font-semibold">Recorrente</th>
                  <th className="py-2 px-2 font-semibold">Valor</th>
                  <th className="py-2 px-2 font-semibold text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {lancamentosMock.map((l) => (
                  <tr key={l.id} className="border-b border-zinc-100 dark:border-[#223366] hover:bg-zinc-50 dark:hover:bg-[#1a2540] transition">
                    <td className="py-2 px-2 whitespace-nowrap">{l.data}</td>
                    <td className="py-2 px-2">{l.descricao}</td>
                    <td className="py-2 px-2">{l.categoria}</td>
                    <td className="py-2 px-2">{l.recorrente ? "Sim" : "Não"}</td>
                    <td className={`py-2 px-2 font-semibold ${l.valor < 0 ? "text-red-500" : "text-green-600 dark:text-blue-400"}`}>{l.valor < 0 ? "-" : "+"}R$ {Math.abs(l.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                    <td className="py-2 px-2 text-center flex gap-2 justify-center">
                      <button className="p-1 rounded hover:bg-green-100 dark:hover:bg-blue-900 transition" title="Efetivar">
                        <Check size={18} className="text-green-600 dark:text-blue-400" />
                      </button>
                      <button className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition" title="Excluir">
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab === "efetivados" && (
        <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-8 shadow-sm flex flex-col items-start">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Lançamentos Efetivados</h2>
          <p className="text-zinc-500 dark:text-zinc-300 mb-8">Lançamentos futuros que já foram efetivados</p>
          <div className="w-full flex-1 flex items-center justify-center min-h-[120px]">
            <span className="text-zinc-700 dark:text-zinc-200 text-base mx-auto">Nenhum lançamento efetivado encontrado</span>
          </div>
        </div>
      )}
    </div>
  );
} 