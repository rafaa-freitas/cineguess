'use client'

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="animate-orb-pulse absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
      <div
        className="animate-orb-pulse absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full bg-indigo-500/15 blur-3xl"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="animate-orb-pulse absolute -bottom-48 left-1/3 w-[420px] h-[420px] rounded-full bg-pink-600/15 blur-3xl"
        style={{ animationDelay: '3s' }}
      />
    </div>
  )
}
