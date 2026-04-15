'use client'

const GENRE_STYLES: Record<string, string> = {
  Action:    'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Animation: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
  Horror:    'bg-purple-600/20 text-purple-300 border-purple-500/30',
  Romance:   'bg-pink-500/20 text-pink-300 border-pink-500/30',
}

const GENRE_EMOJI: Record<string, string> = {
  Action:    '⚡',
  Animation: '✨',
  Horror:    '👻',
  Romance:   '💕',
}

interface GenreBadgeProps {
  genre: string
  size?: 'sm' | 'md' | 'lg'
}

export default function GenreBadge({ genre, size = 'md' }: GenreBadgeProps) {
  const style = GENRE_STYLES[genre] ?? 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  const emoji = GENRE_EMOJI[genre] ?? '🎬'

  const sizeClass = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  }[size]

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${style} ${sizeClass}`}>
      <span>{emoji}</span>
      {genre}
    </span>
  )
}

export { GENRE_STYLES, GENRE_EMOJI }
