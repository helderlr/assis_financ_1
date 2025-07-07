"use client";
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Plus, Trash2, X } from "lucide-react";

const transacoesMock = [
  {
    id: 1,
    data: "02/04/2025",
    descricao: "Gasto no mercado",
    categoria: "Alimentação",
    valor: -50,
  },
  {
    id: 2,
    data: "02/04/2025",
    descricao: "Consultoria realizada",
    categoria: "Consultoria",
    valor: 5000,
  },
];

const categoriasMock = [
  { id: 1, nome: "Alimentação" },
  { id: 2, nome: "Consultoria" },
  { id: 3, nome: "IPTU" },
];

export default function Transacoes() {
  const [transacoes, setTransacoes] = useState(transacoesMock);
  const [modalTipo, setModalTipo] = useState<"entrada" | "saida" | null>(null);
  const [tipo, setTipo] = useState("Entrada");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("2025-04-02");
  const [categoria, setCategoria] = useState("");
  const [pagador, setPagador] = useState("");

  const entradas = transacoes.filter(t => t.valor > 0).reduce((acc, t) => acc + t.valor, 0);
  const saidas = transacoes.filter(t => t.valor < 0).reduce((acc, t) => acc + t.valor, 0);
  const saldo = entradas + saidas;

  function salvarTransacao(e: React.FormEvent) {
    e.preventDefault();
    const isEntrada = modalTipo === "entrada";
    setTransacoes([
      ...transacoes,
      {
        id: Date.now(),
        data: data.split("-").reverse().join("/"),
        descricao,
        categoria: categoriasMock.find(c => c.id === Number(categoria))?.nome || "",
        valor: isEntrada ? Number(valor) : -Math.abs(Number(valor)),
      },
    ]);
    setModalTipo(null);
    setTipo("Entrada");
    setValor("");
    setDescricao("");
    setData("2025-04-02");
    setCategoria("");
    setPagador("");
  }

  return (
    <>
      {/* Modal Nova Entrada/Saída */}
      {modalTipo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white dark:bg-[#13224a] rounded-xl shadow-xl p-8 w-full max-w-md relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600"
              onClick={() => setModalTipo(null)}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              {modalTipo === "entrada" ? "Nova Entrada" : "Nova Saída"}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-300 mb-4">Adicione uma nova transação financeira</p>
            <form onSubmit={salvarTransacao} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Tipo</label>
                <select
                  className="w-full border-2 border-green-400 dark:border-blue-400 rounded px-3 py-2 outline-none focus:border-green-600 dark:focus:border-blue-500 text-base bg-white dark:bg-[#223366] text-zinc-900 dark:text-zinc-100"
                  value={modalTipo === "entrada" ? "Entrada" : "Saída"}
                  disabled
                >
                  <option>Entrada</option>
                  <option>Saída</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Valor</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                  className="w-full border-2 border-green-400 dark:border-blue-400 rounded px-3 py-2 outline-none focus:border-green-600 dark:focus:border-blue-500 text-base bg-white dark:bg-[#223366] text-zinc-900 dark:text-zinc-100"
                  value={valor}
                  onChange={e => setValor(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Descrição</label>
                <input
                  type="text"
                  placeholder="Descreva a transação"
                  className="w-full border-2 border-green-400 dark:border-blue-400 rounded px-3 py-2 outline-none focus:border-green-600 dark:focus:border-blue-500 text-base bg-white dark:bg-[#223366] text-zinc-900 dark:text-zinc-100"
                  value={descricao}
                  onChange={e => setDescricao(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Data</label>
                  <input
                    type="date"
                    className="w-full border-2 border-green-400 dark:border-blue-400 rounded px-3 py-2 outline-none focus:border-green-600 dark:focus:border-blue-500 text-base bg-white dark:bg-[#223366] text-zinc-900 dark:text-zinc-100"
                    value={data}
                    onChange={e => setData(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Categoria</label>
                  <select
                    className="w-full border-2 border-green-400 dark:border-blue-400 rounded px-3 py-2 outline-none focus:border-green-600 dark:focus:border-blue-500 text-base bg-white dark:bg-[#223366] text-zinc-900 dark:text-zinc-100"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                    required
                  >
                    <option value="">Selecione uma...</option>
                    {categoriasMock.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                  {modalTipo === "entrada" ? "Pagador" : "Recebedor"}
                </label>
                <input
                  type="text"
                  placeholder={modalTipo === "entrada" ? "Quem pagou?" : "Para quem foi pago?"}
                  className="w-full border-2 border-green-400 dark:border-blue-400 rounded px-3 py-2 outline-none focus:border-green-600 dark:focus:border-blue-500 text-base bg-white dark:bg-[#223366] text-zinc-900 dark:text-zinc-100"
                  value={pagador}
                  onChange={e => setPagador(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="bg-zinc-100 dark:bg-[#223366] hover:bg-zinc-200 dark:hover:bg-[#1a2540] text-zinc-700 dark:text-zinc-200 font-semibold px-6 py-2 rounded transition-colors"
                  onClick={() => setModalTipo(null)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 dark:bg-blue-600 hover:bg-green-700 dark:hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Transações</h1>
          <p className="text-zinc-500 dark:text-zinc-300">Gerencie suas entradas e saídas financeiras</p>
        </div>
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white dark:bg-[#13224a] rounded-xl border border-zinc-100 dark:border-[#223366] p-6 flex flex-col gap-2 shadow-sm">
            <span className="text-zinc-500 dark:text-zinc-300 text-sm font-medium flex items-center gap-1">Entradas <ArrowUpRight className="text-green-600 dark:text-blue-400" size={16} /></span>
            <span className="text-3xl font-bold text-green-600 dark:text-blue-400">R$ {entradas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
          </div>
          <div className="bg-white dark:bg-[#13224a] rounded-xl border border-zinc-100 dark:border-[#223366] p-6 flex flex-col gap-2 shadow-sm">
            <span className="text-zinc-500 dark:text-zinc-300 text-sm font-medium flex items-center gap-1">Saídas <ArrowDownRight className="text-red-500" size={16} /></span>
            <span className="text-3xl font-bold text-red-500">R$ {Math.abs(saidas).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
          </div>
          <div className="bg-white dark:bg-[#13224a] rounded-xl border border-zinc-100 dark:border-[#223366] p-6 flex flex-col gap-2 shadow-sm">
            <span className="text-zinc-500 dark:text-zinc-300 text-sm font-medium flex items-center gap-1">Saldo <Plus className="text-green-600 dark:text-blue-400" size={16} /></span>
            <span className="text-3xl font-bold text-green-600 dark:text-blue-400">R$ {saldo.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
          </div>
        </div>
        {/* Filtros */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
          <select className="border border-zinc-200 dark:border-[#223366] rounded px-3 py-2 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-[#223366] w-full md:w-auto">
            <option>abr 2025</option>
          </select>
          <button className="border border-zinc-200 dark:border-[#223366] rounded px-3 py-2 text-zinc-700 dark:text-zinc-200 bg-white dark:bg-[#223366] w-full md:w-auto">Mês Atual</button>
          <div className="flex-1" />
          <button
            className="bg-green-600 dark:bg-blue-600 hover:bg-green-700 dark:hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center gap-2 text-sm transition-colors"
            onClick={() => setModalTipo("entrada")}
          >
            + Nova Entrada
          </button>
          <button
            className="bg-zinc-100 dark:bg-[#223366] hover:bg-zinc-200 dark:hover:bg-[#1a2540] text-zinc-700 dark:text-zinc-200 font-medium px-4 py-2 rounded flex items-center gap-2 text-sm border border-zinc-200 dark:border-[#223366] transition-colors"
            onClick={() => setModalTipo("saida")}
          >
            + Nova Saída
          </button>
        </div>
        {/* Tabela de transações */}
        <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold dark:text-zinc-100">Transações</h2>
            <span className="text-zinc-400 dark:text-zinc-300 text-sm">{transacoes.length} transações</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-zinc-500 dark:text-zinc-300 border-b border-zinc-100 dark:border-[#223366]">
                  <th className="py-2 px-2 font-semibold">Data</th>
                  <th className="py-2 px-2 font-semibold">Descrição</th>
                  <th className="py-2 px-2 font-semibold">Categoria</th>
                  <th className="py-2 px-2 font-semibold">Valor</th>
                  <th className="py-2 px-2 font-semibold text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map((t) => (
                  <tr key={t.id} className="border-b border-zinc-100 dark:border-[#223366] hover:bg-zinc-50 dark:hover:bg-[#1a2540] transition">
                    <td className="py-2 px-2 whitespace-nowrap">{t.data}</td>
                    <td className="py-2 px-2">{t.descricao}</td>
                    <td className="py-2 px-2">{t.categoria}</td>
                    <td className={`py-2 px-2 font-semibold ${t.valor < 0 ? "text-red-500" : "text-green-600 dark:text-blue-400"}`}>
                      {t.valor < 0 ? "- " : "+ "}R$ {Math.abs(t.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </td>
                    <td className="py-2 px-2 text-center">
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
      </div>
    </>
  );
} 