'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp, XCircle, CheckCircle } from 'lucide-react'

interface Stats {
  total: number
  correct: number
  incorrect: number
}

export default function StatsPanel({ stats }: { stats: Stats }) {
  const accuracy = stats.total === 0 ? 0 : Math.round((stats.correct / stats.total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3"
    >
      {[
        { icon: Target,       label: 'Análises',  value: stats.total,     color: 'text-violet-400' },
        { icon: CheckCircle,  label: 'Acertos',   value: stats.correct,   color: 'text-emerald-400' },
        { icon: XCircle,      label: 'Erros',     value: stats.incorrect, color: 'text-red-400' },
        { icon: TrendingUp,   label: 'Precisão',  value: `${accuracy}%`,  color: 'text-yellow-400' },
      ].map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="flex flex-col items-center gap-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className={`text-2xl font-bold ${color}`}>{value}</span>
          <span className="text-xs text-gray-500">{label}</span>
        </div>
      ))}
    </motion.div>
  )
}
