"use client";
import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";

const categoriasMock = [
  { id: 1, nome: "Alimentação" },
  { id: 2, nome: "Consultoria" },
  { id: 3, nome: "IPTU" },
];

export default function Categorias() {
  const [categorias, setCategorias] = useState(categoriasMock);
  const [modalAberto, setModalAberto] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");

  function adicionarCategoria(e: React.FormEvent) {
    e.preventDefault();
    if (!novaCategoria.trim()) return;
    setCategorias([...categorias, { id: Date.now(), nome: novaCategoria.trim() }]);
    setNovaCategoria("");
    setModalAberto(false);
  }

  return (
    <>
      {/* Modal Nova Categoria */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white dark:bg-[#13224a] rounded-xl shadow-xl p-8 w-full max-w-md relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600"
              onClick={() => setModalAberto(false)}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">Nova Categoria</h2>
            <p className="text-zinc-500 dark:text-zinc-300 mb-4">Adicione uma nova categoria para organizar suas transações</p>
            <form onSubmit={adicionarCategoria} className="flex flex-col gap-4">
              <div>
                <label htmlFor="nome-categoria" className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Nome da categoria</label>
                <input
                  id="nome-categoria"
                  type="text"
                  placeholder="Ex: Alimentação, Transporte, etc."
                  className="w-full border-2 border-green-400 dark:border-blue-400 rounded px-3 py-2 outline-none focus:border-green-600 dark:focus:border-blue-500 text-base bg-white dark:bg-[#223366] text-zinc-900 dark:text-zinc-100"
                  value={novaCategoria}
                  onChange={e => setNovaCategoria(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 dark:bg-blue-600 hover:bg-green-700 dark:hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
                >
                  Adicionar categoria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Conteúdo principal */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1 text-left">Categorias</h1>
        <p className="text-zinc-500 dark:text-zinc-300 mb-6 text-left">Gerencie as categorias para suas transações</p>
        <div className="bg-white dark:bg-[#13224a] rounded-2xl border border-zinc-100 dark:border-[#223366] p-6 shadow-sm w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 text-left">Suas Categorias</h2>
              <span className="text-zinc-500 dark:text-zinc-300 text-sm text-left">{categorias.length} categorias cadastradas</span>
            </div>
            <button
              className="bg-green-600 dark:bg-blue-600 hover:bg-green-700 dark:hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center gap-2 text-sm transition-colors"
              onClick={() => setModalAberto(true)}
            >
              + Nova Categoria
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {categorias.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between bg-zinc-50 dark:bg-[#223366] border border-zinc-100 dark:border-[#223366] rounded-lg px-6 py-4 hover:bg-zinc-100 dark:hover:bg-[#1a2540] transition cursor-pointer group">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg text-left">{cat.nome}</span>
                <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100">
                  <button className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-[#1a2540] transition" title="Editar">
                    <Pencil size={18} className="text-zinc-500 dark:text-zinc-300" />
                  </button>
                  <button className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition" title="Excluir">
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 