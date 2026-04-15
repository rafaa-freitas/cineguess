"use client";

import { Brain } from "lucide-react";

interface ModelLoaderProps {
  progress?: number;
  message?: string;
}

export default function ModelLoader({ progress, message }: ModelLoaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full animate-spin-slow"
          style={{
            background: "conic-gradient(from 0deg, rgba(124, 58, 237, 0.8) 0%, transparent 70%)",
          }}
        />
        {/* Inner circle */}
        <div
          className="absolute inset-1 rounded-full flex items-center justify-center"
          style={{ background: "var(--bg-card)" }}
        >
          <Brain size={22} className="text-purple-400" />
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-white/70 text-sm font-medium">{message || "Carregando modelo de IA..."}</p>
        {progress !== undefined && (
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #7c3aed, #a855f7)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
