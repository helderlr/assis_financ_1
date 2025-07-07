"use client";
import { Calendar } from "lucide-react";

export default function CompromissosPage() {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow">
      <div className="flex items-center gap-3 mb-4">
        <Calendar size={28} className="text-green-600" />
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Compromissos</h1>
      </div>
      <p className="text-zinc-700 dark:text-zinc-300">
        Aqui você poderá visualizar e gerenciar seus compromissos financeiros.
      </p>
    </div>
  );
} 