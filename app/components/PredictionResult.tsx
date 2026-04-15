'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import GenreBadge, { GENRE_STYLES } from './GenreBadge'

interface Prediction {
  className: string
  probability: number
}

interface PredictionResultProps {
  predictions: Prediction[]
  imageURL: string
  onFeedback: (correct: boolean, correctedGenre?: string) => void
  onReset: () => void
}

const GENRES = ['Action', 'Animation', 'Horror', 'Romance']

const BAR_COLORS: Record<string, string> = {
  Action:    'from-orange-500 to-orange-400',
  Animation: 'from-yellow-400 to-yellow-300',
  Horror:    'from-purple-600 to-purple-400',
  Romance:   'from-pink-500 to-pink-400',
}

export default function PredictionResult({ predictions, imageURL, onFeedback, onReset }: PredictionResultProps) {
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [showCorrection, setShowCorrection] = useState(false)

  const top = predictions.reduce((a, b) => a.probability > b.probability ? a : b)
  const sorted = [...predictions].sort((a, b) => b.probability - a.probability)

  const handleCorrect = () => {
    setFeedback('correct')
    onFeedback(true)
  }

  const handleIncorrect = () => {
    setFeedback('incorrect')
    setShowCorrection(true)
  }

  const handleCorrection = (genre: string) => {
    onFeedback(false, genre)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Poster preview */}
        <div className="relative shrink-0 w-full sm:w-36">
          <img
            src={imageURL}
            alt="Pôster enviado"
            className="w-full sm:w-36 h-48 sm:h-52 object-cover rounded-xl border border-white/10 shadow-lg"
          />
        </div>

        {/* Prediction details */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Predição principal</p>
            <div className="flex items-center gap-3">
              <GenreBadge genre={top.className} size="lg" />
              <span className="text-2xl font-bold text-white">{Math.round(top.probability * 100)}%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {sorted.map((pred) => (
              <div key={pred.className} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-20 shrink-0">{pred.className}</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pred.probability * 100}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${BAR_COLORS[pred.className] ?? 'from-gray-400 to-gray-300'}`}
                  />
                </div>
                <span className="text-xs text-gray-400 w-10 text-right shrink-0">
                  {Math.round(pred.probability * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback section */}
      <AnimatePresence mode="wait">
        {!feedback ? (
          <motion.div key="buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-sm text-gray-400 mb-3 text-center">A IA acertou o gênero?</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleCorrect}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-colors font-medium text-sm"
              >
                <CheckCircle className="w-4 h-4" /> Acertou!
              </button>
              <button
                onClick={handleIncorrect}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-colors font-medium text-sm"
              >
                <XCircle className="w-4 h-4" /> Errou
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
            {feedback === 'correct' ? (
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle className="w-5 h-5" /> Ótimo! A IA acertou.
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-red-400 font-medium">
                  <XCircle className="w-5 h-5" /> Que pena! Qual é o gênero correto?
                </div>
                {showCorrection && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {GENRES.filter((g) => g !== top.className).map((genre) => (
                      <button
                        key={genre}
                        onClick={() => { handleCorrection(genre); setShowCorrection(false) }}
                        className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${GENRE_STYLES[genre] ?? 'bg-gray-500/20 text-gray-300 border-gray-500/30'} hover:brightness-125`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            <button
              onClick={onReset}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mt-1"
            >
              <RotateCcw className="w-4 h-4" /> Testar outro pôster
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
