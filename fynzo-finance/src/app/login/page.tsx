"use client";
import Image from "next/image";
import { FaLock, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [recuperarSenha, setRecuperarSenha] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (recuperarSenha) {
      try {
        const resp = await fetch("/api/recuperar-senha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await resp.json();
        if (resp.ok) {
          setEmailEnviado(true);
        } else {
          setErro(data.error || "Erro ao enviar e-mail de recuperação.");
        }
      } catch (err) {
        setErro("Erro ao enviar e-mail de recuperação.");
      }
      return;
    }
    const nomeExtraido = name || email.split("@")[0];
    setUser({ name: nomeExtraido, email });
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white py-8 px-4">
      {/* Card de login ampliado ou confirmação de recuperação */}
      {recuperarSenha && emailEnviado ? (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-12 flex flex-col gap-8 items-center">
          <div className="w-full text-center">
            <h1 className="text-2xl font-bold text-zinc-900 mb-1">Recuperar Senha</h1>
            <p className="text-zinc-500 text-base mb-6">Verifique seu e-mail para resetar sua senha</p>
            <div className="bg-green-100 text-green-800 rounded-lg p-4 mb-4 font-medium">
              E-mail de recuperação enviado para <span className="font-bold">{email}</span>.<br />
              Verifique sua caixa de entrada e spam.
            </div>
          </div>
          <button
            type="button"
            className="mt-2 text-green-600 flex items-center gap-1 hover:underline"
            onClick={() => { setRecuperarSenha(false); setEmailEnviado(false); }}
          >
            <span className="text-lg">←</span> Voltar para login
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-12 flex flex-col gap-8 items-center">
          {/* Logo dentro do card (apenas a imagem, sem fundo branco) */}
          <div className="flex justify-center">
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-2">
              <Image
                src="/logo-fynzo.png"
                alt="Logo Fynzo"
                width={120}
                height={120}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="w-full text-center">
            <h1 className="text-2xl font-bold text-zinc-900 mb-1">Entrar no Fynzo</h1>
            <p className="text-zinc-500 text-base">Gerencie suas finanças de forma simples e segura</p>
          </div>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            {/* E-mail */}
            <div>
              <label className="block text-zinc-700 text-sm mb-1" htmlFor="email">E-mail</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <FaEnvelope />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10 pr-3 py-3 w-full rounded border border-zinc-200 focus:border-green-500 outline-none bg-zinc-50 text-zinc-900 text-base"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* Senha */}
            {!recuperarSenha && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-zinc-700 text-sm" htmlFor="senha">Senha</label>
                  <a
                    href="#"
                    className="text-green-600 text-xs font-medium hover:underline"
                    onClick={e => { e.preventDefault(); setRecuperarSenha(true); }}
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <FaLock />
                  </span>
                  <input
                    id="senha"
                    type="password"
                    placeholder="********"
                    className="pl-10 pr-3 py-3 w-full rounded border border-zinc-200 focus:border-green-500 outline-none bg-zinc-50 text-zinc-900 text-base"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>
            )}
            {/* Verificação de segurança */}
            <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
              <FaCheckCircle />
              <span>Verificação de segurança</span>
            </div>
            {/* Botão Entrar ou Enviar link de recuperação */}
            <button
              type="submit"
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded flex items-center justify-center gap-2 text-lg transition-colors"
            >
              {recuperarSenha ? "Enviar link de recuperação" : "Entrar"}
            </button>
          </form>
          {/* Link Voltar para login */}
          {recuperarSenha && (
            <button
              type="button"
              className="mt-2 text-green-600 flex items-center gap-1 hover:underline"
              onClick={() => { setRecuperarSenha(false); setEmailEnviado(false); }}
            >
              <span className="text-lg">←</span> Voltar para login
            </button>
          )}
          {erro && <div className="text-red-600 text-sm text-center">{erro}</div>}
        </div>
      )}
      {/* Rodapé */}
      <footer className="mt-8 text-zinc-400 text-xs text-center">
        © 2025 Fynzo – Controle financeiro inteligente
      </footer>
    </div>
  );
} 