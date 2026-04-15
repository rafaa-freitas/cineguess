"use client";

import { TrendingUp, CheckCircle, XCircle, Target } from "lucide-react";

export interface SessionStats {
  total: number;
  correct: number;
  wrong: number;
  correctionsByGenre: Record<string, number>;
}

interface StatsPanelProps {
  stats: SessionStats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  const statItems = [
    {
      label: "Analisados",
      value: stats.total,
      icon: Target,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Acertos",
      value: stats.correct,
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Erros",
      value: stats.wrong,
      icon: XCircle,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      label: "Precisão",
      value: `${accuracy}%`,
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <div className="glass rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <TrendingUp size={14} className="text-purple-400" />
        <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Estatísticas da Sessão</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`${item.bg} rounded-xl p-3 flex items-center gap-2`}
            >
              <Icon size={14} className={item.color} />
              <div>
                <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                <div className="text-white/40 text-xs">{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accuracy bar */}
      {stats.total > 0 && (
        <div className="space-y-1">
          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${accuracy}%`,
                background: accuracy >= 70
                  ? "linear-gradient(90deg, #10b981, #059669)"
                  : accuracy >= 40
                  ? "linear-gradient(90deg, #f59e0b, #d97706)"
                  : "linear-gradient(90deg, #ef4444, #dc2626)",
              }}
            />
          </div>
          <p className="text-white/30 text-xs text-center">
            {accuracy >= 70 ? "Modelo indo bem!" : accuracy >= 40 ? "Há espaço para melhorar" : "Precisa de mais treino"}
          </p>
        </div>
      )}

      {/* Corrections by genre */}
      {Object.keys(stats.correctionsByGenre).length > 0 && (
        <div className="pt-1 border-t border-white/5">
          <p className="text-white/30 text-xs mb-2">Correções enviadas:</p>
          <div className="flex flex-wrap gap-1">
            {Object.entries(stats.correctionsByGenre).map(([genre, count]) => (
              <span
                key={genre}
                className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-white/40"
              >
                {genre}: {count}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
