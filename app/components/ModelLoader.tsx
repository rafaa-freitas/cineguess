'use client'

export default function ModelLoader() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-violet-500/20" />
        <div className="absolute inset-0 rounded-full border-4 border-t-violet-500 animate-spin" />
      </div>
      <p className="text-gray-400 text-sm tracking-wide">Carregando modelo de IA…</p>
    </div>
  )
}
