'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clapperboard } from 'lucide-react'

import BackgroundOrbs from './BackgroundOrbs'
import ModelLoader from './ModelLoader'
import DropZone from './DropZone'
import PredictionResult from './PredictionResult'
import StatsPanel from './StatsPanel'

interface Prediction {
  className: string
  probability: number
}

interface Stats {
  total: number
  correct: number
  incorrect: number
}

type ModelStatus = 'loading' | 'ready' | 'error'

export default function CineGuessApp() {
  const modelRef = useRef<{ predict: (el: HTMLImageElement) => Promise<Prediction[]> } | null>(null)
  const [modelStatus, setModelStatus] = useState<ModelStatus>('loading')

  const [imageURL, setImageURL] = useState<string | null>(null)
  const [predicting, setPredicting] = useState(false)
  const [predictions, setPredictions] = useState<Prediction[] | null>(null)
  const [stats, setStats] = useState<Stats>({ total: 0, correct: 0, incorrect: 0 })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const tmImage = await import('@teachablemachine/image')
        const model = await tmImage.load('/model/model.json', '/model/metadata.json')
        if (!cancelled) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          modelRef.current = model as any
          setModelStatus('ready')
        }
      } catch {
        if (!cancelled) setModelStatus('error')
      }
    })()
    return () => { cancelled = true }
  }, [])

  const handleFile = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file)
    setImageURL(url)
    setPredictions(null)
    setPredicting(true)

    try {
      const img = new Image()
      img.src = url
      await new Promise<void>((res, rej) => {
        img.onload = () => res()
        img.onerror = rej
      })

      const preds = await modelRef.current!.predict(img)
      setPredictions(preds)
    } catch {
      setPredictions(null)
    } finally {
      setPredicting(false)
    }
  }, [])

  const handleFeedback = useCallback((correct: boolean) => {
    setStats((s) => ({
      total: s.total + 1,
      correct: correct ? s.correct + 1 : s.correct,
      incorrect: correct ? s.incorrect : s.incorrect + 1,
    }))
  }, [])

  const handleReset = useCallback(() => {
    if (imageURL) URL.revokeObjectURL(imageURL)
    setImageURL(null)
    setPredictions(null)
  }, [imageURL])

  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 py-12">
      <BackgroundOrbs />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 mb-10 text-center"
      >
        <div className="flex items-center gap-3 mb-1">
          <Clapperboard className="w-8 h-8 text-violet-400" />
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            CineGuess
          </h1>
        </div>
        <p className="text-gray-400 text-base max-w-md">
          Envie um pôster de filme e desafie nossa IA a adivinhar o gênero
        </p>
      </motion.header>

      {/* Main card */}
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-xl flex flex-col gap-6"
      >
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 shadow-2xl">
          {modelStatus === 'loading' && <ModelLoader />}

          {modelStatus === 'error' && (
            <div className="text-center py-10 text-red-400">
              <p className="font-medium">Erro ao carregar o modelo.</p>
              <p className="text-sm text-gray-500 mt-1">Verifique se os arquivos em <code>/public/model/</code> estão presentes.</p>
            </div>
          )}

          {modelStatus === 'ready' && (
            <AnimatePresence mode="wait">
              {!predictions ? (
                <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <DropZone onFile={handleFile} disabled={predicting} />
                  {predicting && (
                    <p className="text-center text-sm text-violet-400 mt-4 animate-pulse">Analisando pôster…</p>
                  )}
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <PredictionResult
                    predictions={predictions}
                    imageURL={imageURL!}
                    onFeedback={handleFeedback}
                    onReset={handleReset}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Stats */}
        {stats.total > 0 && <StatsPanel stats={stats} />}
      </motion.main>

      {/* Genre legend */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10 flex flex-wrap gap-2 justify-center"
      >
        {['Action', 'Animation', 'Horror', 'Romance'].map((g) => (
          <span key={g} className="text-xs text-gray-600">{g}</span>
        ))}
      </motion.footer>
    </div>
  )
}
