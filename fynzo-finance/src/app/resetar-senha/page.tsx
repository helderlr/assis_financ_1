"use client";
import Image from "next/image";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function RedefinirSenhaPage() {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    // Pega o token da URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      setErro("Token inválido.");
      return;
    }
    try {
      const resp = await fetch("/api/resetar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, novaSenha: senha }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setSucesso(true);
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setErro(data.error || "Erro ao redefinir senha.");
      }
    } catch (err) {
      setErro("Erro ao redefinir senha.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 flex flex-col gap-8 items-center">
        {/* Logo Fynzo no topo do card */}
        <Image
          src="/logo-fynzo.png"
          alt="Logo Fynzo"
          width={80}
          height={80}
          className="object-contain mb-2"
          priority
        />
        <h1 className="text-2xl font-bold text-zinc-900 mb-2 text-center">Criar Senha</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div>
            <label className="block text-zinc-800 font-semibold mb-1" htmlFor="senha">Nova Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua nova senha"
              className="pl-3 pr-3 py-3 w-full border-2 border-zinc-200 focus:border-green-500 rounded transition outline-none text-base"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-zinc-800 font-semibold mb-1" htmlFor="confirmar">Confirmar Senha</label>
            <input
              id="confirmar"
              type="password"
              placeholder="Confirme a nova senha"
              className="pl-3 pr-3 py-3 w-full border-2 border-zinc-200 focus:border-green-500 rounded transition outline-none text-base"
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
              required
            />
          </div>
          {erro && <div className="text-red-600 text-sm text-center">{erro}</div>}
          {sucesso && <div className="text-green-600 text-sm text-center">Senha redefinida com sucesso! Redirecionando...</div>}
          <button
            type="submit"
            className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded flex items-center justify-center gap-2 text-lg transition-colors"
          >
            <FaLock /> Redefinir Senha
          </button>
        </form>
        <button
          type="button"
          className="mt-2 text-green-600 flex items-center gap-1 hover:underline"
          onClick={() => router.push("/login")}
        >
          <span className="text-lg">←</span> Voltar para Login
        </button>
      </div>
    </div>
  );
} 