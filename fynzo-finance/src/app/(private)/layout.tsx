"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Repeat,
  Calendar,
  Clock,
  BarChart2,
  Tag,
  MessageCircle,
  LogOut,
  ExternalLink,
  Moon,
  Sun
} from "lucide-react";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

const menu = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transações", href: "/transacoes", icon: Repeat },
  { label: "Compromissos", href: "/compromissos", icon: Calendar },
  { label: "Lançamentos Futuros", href: "/lancamentos-futuros", icon: Clock },
  { label: "Relatórios", href: "/relatorios", icon: BarChart2 },
  { label: "Categorias", href: "/categorias", icon: Tag },
];

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  const pathname = usePathname();
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  function logout() {
    setUser(null);
    router.push("/login");
  }

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 min-h-screen flex">
      {/* Sidebar fixa */}
      <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 flex flex-col p-4 min-h-screen">
        <div className="flex flex-col items-center justify-center mb-8 w-full relative">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-2">
            <Image
              src="/logo-fynzo.png"
              alt="Logo Fynzo"
              width={84}
              height={28}
              className="object-contain w-full max-w-[98px] h-auto"
              priority
            />
          </div>
          <button
            className="absolute right-0 top-1 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            onClick={toggleTheme}
            title="Alternar tema"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? (
              <Sun size={22} className="text-yellow-400" />
            ) : (
              <Moon size={22} className="text-zinc-500" />
            )}
          </button>
        </div>
        {/* Usuário logado */}
        <div className="mb-8">
          <div className="font-semibold text-zinc-900 dark:text-zinc-100">{user?.name || "Usuário"}</div>
          <div className="text-xs text-zinc-500">{user?.email || "email@exemplo.com"}</div>
        </div>
        {/* Menu lateral */}
        <nav className="flex-1 flex flex-col gap-1">
          {menu.map((item) => {
            const selected = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded font-medium transition
                  ${selected ? "bg-green-600 text-white" : "text-zinc-700 hover:bg-zinc-100"}`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://wa.me/SEUNUMERO"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded font-medium text-zinc-700 hover:bg-zinc-100 mt-2"
          >
            <MessageCircle size={20} />
            Contato WhatsApp
            <ExternalLink size={16} className="ml-1" />
          </a>
        </nav>
        <button
          className="mt-8 px-3 py-2 rounded border border-zinc-200 text-zinc-700 flex items-center gap-2 w-full justify-center hover:bg-zinc-100"
          onClick={logout}
        >
          <LogOut size={20} />
          Sair
        </button>
      </aside>
      {/* Container principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 