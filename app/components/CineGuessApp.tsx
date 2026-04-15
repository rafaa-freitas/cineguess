"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Film, Sparkles, Info, ChevronDown } from "lucide-react";
import DropZone from "./DropZone";
import PredictionResult, { type Prediction } from "./PredictionResult";
import ModelLoader from "./ModelLoader";
import StatsPanel, { type SessionStats } from "./StatsPanel";
import BackgroundOrbs from "./BackgroundOrbs";
import GenreBadge, { type Genre } from "./GenreBadge";

type AppState = "idle" | "loading-model" | "ready" | "analyzing" | "result" | "error";

const MODEL_URL = "/model/";
const GENRES: Genre[] = ["Action", "Animation", "Horror", "Romance"];

export default function CineGuessApp() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [stats, setStats] = useState<SessionStats>({
    total: 0,
    correct: 0,
    wrong: 0,
    correctionsByGenre: {},
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modelRef = useRef<any>(null);

  const loadModel = useCallback(async () => {
    setAppState("loading-model");
    try {
      const tmImage = await import("@teachablemachine/image");
      const modelURL = `${MODEL_URL}model.json`;
      const metadataURL = `${MODEL_URL}metadata.json`;
      const model = await tmImage.load(modelURL, metadataURL);
      modelRef.current = model;
      setAppState("ready");
    } catch (err) {
      console.error("Failed to load model:", err);
      setErrorMsg("Falha ao carregar o modelo de IA. Atualize a página e tente novamente.");
      setAppState("error");
    }
  }, []);

  useEffect(() => {
    loadModel();
  }, [loadModel]);

  const handleImageSelected = useCallback(
    async (file: File, url: string) => {
      setImageUrl(url);
      setFeedbackSubmitted(false);
      setPredictions([]);

      if (!modelRef.current) return;

      setAppState("analyzing");

      try {
        const img = document.createElement("img");
        img.crossOrigin = "anonymous";
        img.src = url;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
        });

        const results = await modelRef.current.predict(img);

        const sorted: Prediction[] = results
          .map((r: { className: string; probability: number }) => ({
            className: r.className,
            probability: r.probability,
          }))
          .sort((a: Prediction, b: Prediction) => b.probability - a.probability);

        setPredictions(sorted);
        setAppState("result");
      } catch (err) {
        console.error("Prediction error:", err);
        setErrorMsg("Não foi possível analisar a imagem. Tente outra.");
        setAppState("error");
      }
    },
    []
  );

  const handleCorrect = () => {
    setStats((prev) => ({
      ...prev,
      total: prev.total + 1,
      correct: prev.correct + 1,
    }));
    setFeedbackSubmitted(true);
  };

  const handleWrong = (selectedGenres: Genre[]) => {
    setStats((prev) => {
      const newCorrections = { ...prev.correctionsByGenre };
      selectedGenres.forEach((g) => {
        newCorrections[g] = (newCorrections[g] || 0) + 1;
      });
      return {
        ...prev,
        total: prev.total + 1,
        wrong: prev.wrong + 1,
        correctionsByGenre: newCorrections,
      };
    });
    setFeedbackSubmitted(true);
  };

  const handleReset = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setPredictions([]);
    setFeedbackSubmitted(false);
    setAppState("ready");
  };

  const handleClearImage = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setPredictions([]);
    setFeedbackSubmitted(false);
    setAppState("ready");
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="glass-strong border-b border-purple-900/30 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)",
                }}
              >
                <Film size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg leading-none">CineGuess</h1>
                <p className="text-white/30 text-xs">Detector de Gênero com IA</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Model status indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8">
                <div
                  className={`w-2 h-2 rounded-full ${
                    appState === "loading-model"
                      ? "bg-yellow-400 animate-pulse"
                      : appState === "error"
                      ? "bg-rose-400"
                      : "bg-emerald-400"
                  }`}
                />
                <span className="text-white/40 text-xs">
                  {appState === "loading-model" ? "Carregando modelo..." : appState === "error" ? "Erro no modelo" : "Modelo pronto"}
                </span>
              </div>

              <button
                onClick={() => setShowInfo(!showInfo)}
                className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/5 border border-white/8 text-white/40 hover:text-white/70 hover:bg-white/8 transition-all"
              >
                <Info size={14} />
              </button>
            </div>
          </div>

          {/* Info panel */}
          {showInfo && (
            <div className="max-w-6xl mx-auto px-6 pb-4">
              <div
                className="rounded-xl p-4 text-sm text-white/60 space-y-2"
                style={{ background: "rgba(124, 58, 237, 0.08)", border: "1px solid rgba(124, 58, 237, 0.2)" }}
              >
                <p className="text-white/80 font-medium">Como funciona</p>
                <p>
                  Envie um pôster de filme e nosso modelo Teachable Machine analisará os padrões visuais para prever o gênero.
                  O modelo reconhece <strong className="text-white/70">Ação, Animação, Terror e Romance</strong>.
                </p>
                <p>
                  Se a IA errar, você pode indicar o gênero correto — seu feedback é registrado para ajudar a identificar onde o modelo precisa melhorar!
                </p>
              </div>
            </div>
          )}
        </header>

        {/* Hero section */}
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(124, 58, 237, 0.1)", border: "1px solid rgba(124, 58, 237, 0.25)" }}
          >
            <Sparkles size={12} className="text-purple-400" />
            <span className="text-purple-300 text-xs font-medium">Powered by Teachable Machine + TensorFlow.js</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 leading-tight">
            A IA consegue ler um{" "}
            <span className="text-gradient-animated">pôster de filme?</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto">
            Envie um pôster e desafie nosso modelo a adivinhar o gênero. Avalie a resposta e ajude-o a aprender.
          </p>

          {/* Genre pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {GENRES.map((genre) => (
              <GenreBadge key={genre} genre={genre} size="sm" />
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 max-w-6xl mx-auto px-6 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Left column — upload + poster */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Film size={12} className="text-purple-400" />
                  </div>
                  <span className="text-white/50 text-xs font-medium uppercase tracking-wider">Pôster do Filme</span>
                </div>

                <DropZone
                  onImageSelected={handleImageSelected}
                  imageUrl={imageUrl}
                  onClear={handleClearImage}
                  disabled={appState === "analyzing" || appState === "loading-model"}
                />
              </div>

              {/* Session stats */}
              {stats.total > 0 && <StatsPanel stats={stats} />}
            </div>

            {/* Right column — results / instructions */}
            <div className="lg:col-span-3 space-y-4">
              {appState === "loading-model" && (
                <div className="glass rounded-2xl p-6">
                  <ModelLoader message="Inicializando modelo de IA..." />
                </div>
              )}

              {appState === "error" && (
                <div className="glass rounded-2xl p-6 text-center space-y-3">
                  <div className="text-rose-400 text-4xl">⚠️</div>
                  <p className="text-white/70 font-medium">{errorMsg}</p>
                  <button
                    onClick={loadModel}
                    className="px-4 py-2 rounded-xl shimmer-btn text-white text-sm font-semibold"
                  >
                    Tentar novamente
                  </button>
                </div>
              )}

              {(appState === "ready" || appState === "idle") && (
                <div className="glass rounded-2xl p-8 flex flex-col items-center text-center gap-5">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center animate-float"
                    style={{
                      background: "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(168, 85, 247, 0.1))",
                      border: "1px solid rgba(124, 58, 237, 0.3)",
                    }}
                  >
                    <Film size={36} className="text-purple-400/70" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-xl">Pronto para analisar</h3>
                    <p className="text-white/40 text-sm max-w-sm">
                      Arraste um pôster de filme para a esquerda e a IA vai prever o gênero na hora.
                    </p>
                  </div>
                  <ChevronDown size={20} className="text-purple-500/40 lg:hidden" />

                  {/* How-to steps */}
                  <div className="w-full space-y-2 text-left pt-2 border-t border-white/5">
                    {[
                      { step: "1", text: "Envie um pôster de filme (JPG/PNG)" },
                      { step: "2", text: "A IA analisa os padrões visuais" },
                      { step: "3", text: "Diga se ela acertou o gênero" },
                      { step: "4", text: "Corrija se errou — ajude-a a aprender!" },
                    ].map(({ step, text }) => (
                      <div key={step} className="flex items-center gap-3 text-sm text-white/50">
                        <div className="w-6 h-6 rounded-full bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400 text-xs font-bold flex-shrink-0">
                          {step}
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {appState === "analyzing" && (
                <div className="glass rounded-2xl p-8 text-center">
                  <ModelLoader message="Analisando pôster..." />
                  <p className="text-white/30 text-xs mt-3">Lendo padrões visuais...</p>
                </div>
              )}

              {appState === "result" && predictions.length > 0 && (
                <PredictionResult
                  predictions={predictions}
                  onCorrect={handleCorrect}
                  onWrong={handleWrong}
                  onReset={handleReset}
                  feedbackSubmitted={feedbackSubmitted}
                />
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-white/20 text-xs">
              CineGuess — Detecção de gênero de filmes com IA e Teachable Machine
            </p>
            <p className="text-white/15 text-xs">
              Classes do modelo: Ação · Animação · Terror · Romance
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
