"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface DropZoneProps {
  onImageSelected: (file: File, url: string) => void;
  imageUrl: string | null;
  onClear: () => void;
  disabled?: boolean;
}

export default function DropZone({ onImageSelected, imageUrl, onClear, disabled }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      onImageSelected(file, url);
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  return (
    <div className="relative w-full">
      {imageUrl ? (
        /* Preview state */
        <div className="relative rounded-2xl overflow-hidden group" style={{ aspectRatio: "2/3" }}>
          <Image
            src={imageUrl}
            alt="Pôster do filme"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
            {!disabled && (
              <button
                onClick={onClear}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <X size={14} />
                Trocar imagem
              </button>
            )}
          </div>
          {/* Corner badge */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-lg glass text-xs text-white/70 flex items-center gap-1">
            <ImageIcon size={10} />
            Pôster
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          className={`
            relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
            flex flex-col items-center justify-center gap-4 p-8
            ${isDragging ? "drop-zone-active" : "border-purple-800/40 hover:border-purple-600/60 hover:bg-purple-900/5"}
          `}
          style={{ aspectRatio: "2/3", minHeight: "320px" }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
        >
          {/* Animated upload icon */}
          <div
            className={`
              w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300
              ${isDragging ? "scale-110 animate-pulse-glow" : ""}
            `}
            style={{
              background: "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(168, 85, 247, 0.1))",
              border: "1px solid rgba(124, 58, 237, 0.3)",
            }}
          >
            <Upload
              size={32}
              className={`transition-colors duration-300 ${isDragging ? "text-purple-400" : "text-purple-500/70"}`}
            />
          </div>

          <div className="text-center space-y-2">
            <p className="text-white/80 font-semibold text-base">
              {isDragging ? "Solte aqui!" : "Arraste seu pôster aqui"}
            </p>
            <p className="text-white/40 text-sm">ou clique para buscar arquivos</p>
            <p className="text-white/25 text-xs">JPG, PNG, WEBP suportados</p>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-purple-600/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-purple-600/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-purple-600/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-purple-600/40 rounded-br-lg" />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
