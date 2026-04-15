'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, ImageIcon } from 'lucide-react'

interface DropZoneProps {
  onFile: (file: File) => void
  disabled?: boolean
}

export default function DropZone({ onFile, disabled }: DropZoneProps) {
  const [dragging, setDragging] = useState(false)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    onFile(file)
  }, [onFile])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }, [handleFile])

  return (
    <motion.label
      htmlFor="poster-input"
      whileHover={disabled ? {} : { scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.99 }}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={disabled ? undefined : onDrop}
      className={`
        relative flex flex-col items-center justify-center gap-4
        rounded-2xl border-2 border-dashed p-12 cursor-pointer
        transition-all duration-200 select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${dragging
          ? 'border-violet-400 bg-violet-500/10'
          : 'border-white/20 bg-white/5 hover:border-violet-500/50 hover:bg-white/8'}
      `}
    >
      <input
        id="poster-input"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onInputChange}
        disabled={disabled}
      />

      <div className="rounded-full bg-violet-500/15 p-4">
        {dragging ? (
          <ImageIcon className="w-8 h-8 text-violet-400" />
        ) : (
          <Upload className="w-8 h-8 text-violet-400" />
        )}
      </div>

      <div className="text-center">
        <p className="text-gray-200 font-medium">
          {dragging ? 'Solte o pôster aqui' : 'Arraste um pôster ou clique para enviar'}
        </p>
        <p className="text-gray-500 text-sm mt-1">PNG, JPG, WEBP — qualquer pôster de filme</p>
      </div>
    </motion.label>
  )
}
