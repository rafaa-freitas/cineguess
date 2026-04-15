"use client";

import { useState } from "react";
import { CheckCircle, XCircle, RefreshCw, ChevronRight, Trophy, Brain } from "lucide-react";
import GenreBadge, { type Genre } from "./GenreBadge";

export interface Prediction {
  className: string;
  probability: number;
}

interface PredictionResultProps {
  predictions: Prediction[];
  onCorrect: () => void;
  onWrong: (selectedGenres: Genre[]) => void;
  onReset: () => void;
  feedbackSubmitted: boolean;
}

const GENRES: Genre[] = ["Action", "Animation", "Horror", "Romance"];

const genreBarClass: Record<string, string> = {
  Action: "result-bar-action",
  Animation: "result-bar-animation",
  Horror: "result-bar-horror",
  Romance: "result-bar-romance",
};

export default function PredictionResult({
  predictions,
  onCorrect,
  onWrong,
  onReset,
  feedbackSubmitted,
}: PredictionResultProps) {
  const [showGenreSelector, setShowGenreSelector] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const topPrediction = predictions[0];
  const confidence = Math.round(topPrediction.probability * 100);

  const toggleGenre = (genre: Genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSubmitCorrection = () => {
    if (selectedGenres.length > 0) {
      onWrong(selectedGenres);
    }
  };

  if (feedbackSubmitted) {
    return (
      <div className="glass rounded-2xl p-6 text-center space-y-4">
        <div
          className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(99, 102, 241, 0.2))" }}
        >
          <Trophy size={28} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Feedback Registrado!</h3>
          <p className="text-white/50 text-sm mt-1">
            Obrigado por ajudar a melhorar o modelo. Sua contribuição o torna mais inteligente!
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl shimmer-btn text-white text-sm font-semibold"
        >
          <RefreshCw size={14} />
          Tentar outro pôster
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top prediction card */}
      <div
        className="glass rounded-2xl p-5 space-y-4"
        style={{ border: "1px solid rgba(124, 58, 237, 0.3)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Brain size={16} className="text-purple-400" />
          <span className="text-white/50 text-xs font-medium uppercase tracking-wider">Previsão da IA</span>
        </div>

        {/* Main prediction */}
        <div className="flex items-center justify-between">
          <GenreBadge genre={topPrediction.className as Genre} size="lg" solid />
          <div className="text-right">
            <div className="text-2xl font-bold text-gradient-animated">
              {confidence}%
            </div>
            <div className="text-white/40 text-xs">confiança</div>
          </div>
        </div>

        {/* Confidence bars */}
        <div className="space-y-2">
          {predictions.map((pred) => (
            <div key={pred.className} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white/50">{pred.className}</span>
                <span className="text-white/70 font-medium">{Math.round(pred.probability * 100)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${genreBarClass[pred.className] || "bg-purple-500"}`}
                  style={{ width: `${Math.round(pred.probability * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback section */}
      {!showGenreSelector ? (
        <div className="glass rounded-2xl p-5">
          <p className="text-white/60 text-sm text-center mb-4">
            A IA acertou o gênero deste pôster?
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCorrect}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                bg-emerald-500/10 border border-emerald-500/30 text-emerald-400
                hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5"
            >
              <CheckCircle size={16} />
              Sim, acertou!
            </button>
            <button
              onClick={() => setShowGenreSelector(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                bg-rose-500/10 border border-rose-500/30 text-rose-400
                hover:bg-rose-500/20 hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-0.5"
            >
              <XCircle size={16} />
              Não, errou!
            </button>
          </div>
        </div>
      ) : (
        /* Genre correction selector */
        <div className="glass rounded-2xl p-5 space-y-4">
          <div>
            <h3 className="text-white font-semibold text-sm">Qual é o gênero real?</h3>
            <p className="text-white/40 text-xs mt-1">Selecione todos que se aplicam — isso ajuda a treinar o modelo</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200
                  ${selectedGenres.includes(genre)
                    ? "border-purple-500/60 bg-purple-500/15 text-purple-300 shadow-lg shadow-purple-500/10"
                    : "border-white/10 bg-white/3 text-white/50 hover:border-white/20 hover:bg-white/5 hover:text-white/70"
                  }
                `}
              >
                <GenreBadge genre={genre} size="sm" selected={selectedGenres.includes(genre)} showIcon />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowGenreSelector(false);
                setSelectedGenres([]);
              }}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-white/50 text-sm hover:border-white/20 hover:text-white/70 transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmitCorrection}
              disabled={selectedGenres.length === 0}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl shimmer-btn text-white text-sm font-semibold
                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
            >
              Enviar feedback
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Reset button */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
          border border-white/8 text-white/30 text-sm transition-all
          hover:border-white/15 hover:text-white/50"
      >
        <RefreshCw size={12} />
        Tentar um pôster diferente
      </button>
    </div>
  );
}
