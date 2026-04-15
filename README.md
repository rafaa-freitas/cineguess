# 🎬 CineGuess — Detector de Gênero de Filmes com IA

> Envie um pôster de filme e desafie nossa IA a adivinhar o gênero. Avalie a resposta e ajude o modelo a aprender.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-1.7-ff6f00?style=flat-square&logo=tensorflow)

---

## ✨ O que é isso?

O **CineGuess** é uma aplicação web que usa um modelo de Machine Learning treinado no [Teachable Machine](https://teachablemachine.withgoogle.com/) do Google para analisar pôsteres de filmes e prever o gênero cinematográfico.

Você faz upload de qualquer pôster, a IA analisa os padrões visuais e tenta adivinhar se é **Ação, Animação, Terror ou Romance**. Depois é só dizer se ela acertou ou não!

---

## 🎯 Funcionalidades

- **Upload por drag-and-drop** ou clique — arraste o pôster direto pra tela
- **Análise em tempo real** — inferência 100% no browser, sem servidor
- **Barras de confiança** — veja a probabilidade de cada gênero
- **Sistema de feedback** — diga se a IA acertou ou errou
- **Correção de gênero** — se errou, selecione o gênero correto
- **Estatísticas da sessão** — acompanhe acertos, erros e precisão em tempo real
- **Interface responsiva** — funciona no celular e no desktop

---

## 🧠 Como a IA funciona

O modelo foi treinado no **Google Teachable Machine** com pôsteres de filmes divididos em 4 classes:

| Gênero | Classe |
|--------|--------|
| ⚡ Ação | `Action` |
| ✨ Animação | `Animation` |
| 👻 Terror | `Horror` |
| 💕 Romance | `Romance` |

A inferência roda inteiramente no **browser** via **TensorFlow.js**, sem nenhuma chamada para servidor externo. O modelo usa **MobileNet** como base (feature extractor) com um cabeçalho de classificação customizado.

> ⚠️ **Nota:** O feedback do usuário é registrado apenas visualmente na sessão atual. O modelo não se atualiza em tempo real — os pesos são fixos nos arquivos `model.json` e `weights.bin`.

---

## 🚀 Rodando localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/cineguess.git
cd cineguess

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🗂️ Estrutura do projeto

```
cineguess/
├── app/
│   ├── components/
│   │   ├── CineGuessApp.tsx      # Componente principal e lógica da IA
│   │   ├── DropZone.tsx          # Upload por drag-and-drop
│   │   ├── PredictionResult.tsx  # Exibição do resultado e feedback
│   │   ├── GenreBadge.tsx        # Badges coloridos por gênero
│   │   ├── ModelLoader.tsx       # Spinner de carregamento do modelo
│   │   ├── StatsPanel.tsx        # Painel de estatísticas da sessão
│   │   └── BackgroundOrbs.tsx    # Efeitos visuais de background
│   ├── globals.css               # Design system e animações
│   ├── layout.tsx
│   └── page.tsx
└── public/
    └── model/
        ├── model.json            # Arquitetura do modelo treinado
        ├── weights.bin           # Pesos do modelo (~2MB)
        └── metadata.json         # Metadados e labels das classes
```

---

## 🛠️ Stack tecnológica

| Tecnologia | Versão | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | Framework React com App Router |
| [React](https://react.dev/) | 19 | Interface do usuário |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipagem estática |
| [TailwindCSS](https://tailwindcss.com/) | 4 | Estilização |
| [Teachable Machine](https://teachablemachine.withgoogle.com/) | 0.8.5 | Wrapper do modelo de ML |
| [TensorFlow.js](https://www.tensorflow.org/js) | 1.7 | Engine de inferência no browser |
| [Lucide React](https://lucide.dev/) | latest | Ícones |

---

## ☁️ Deploy na Vercel

O projeto está configurado para deploy direto na Vercel sem nenhuma configuração extra.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/cineguess)

Ou via CLI:

```bash
npm i -g vercel
vercel
```

---

## 📋 Scripts disponíveis

```bash
npm run dev      # Servidor de desenvolvimento (Turbopack)
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Linting com ESLint
```

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">Feito com ☕ e muito CSS</p>
