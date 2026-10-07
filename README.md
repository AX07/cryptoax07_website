# CryptoAX07 — Interactive Web3 & Crypto Education Platform

[![Production](https://img.shields.io/badge/Status-Production%20Ready-emerald)](https://www.cryptoax07.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Architecture-Next.js%20%2F%20React-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v3%2Fv4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel%20Edge-000000?logo=vercel)](https://vercel.com)
[![Author](https://img.shields.io/badge/Author-AX07%20Studio-orange)](https://ax07.dev)

> **Live Production Application:** [https://www.cryptoax07.com](https://www.cryptoax07.com)  
> **Author & Development:** [AX07 Studio (ax07.dev)](https://ax07.dev)

---

## ✦ Overview

**CryptoAX07** is a premier crypto education and hands-on simulation platform designed to demystify blockchain technology, decentralized finance (DeFi), and digital asset security. 

Built for everyone from Web3 newcomers to experienced traders refining their risk-management skills, CryptoAX07 bridges the gap between passive reading and real-world execution. Users interact with over 30 authentic, zero-risk sandbox simulations—mastering seed phrases, gas fees, token approvals, perpetual futures, and cold storage without risking actual capital.

---

## ✦ Key Features

- **30+ Interactive Blockchain Simulations**
  - **Security & Self-Custody:** Seed phrase generation & recovery, hot vs. cold wallet architecture, token permission audits & revocations, 2FA hardening, password manager best practices.
  - **Transactions & Network Layers:** Bitcoin UTXO flows, Ethereum smart contract calls, gas estimation, Layer-2 rollup comparisons (Arbitrum, Optimism).
  - **DeFi & Trading:** Automated Market Makers (AMM) swap mechanics, lending & collateralized borrowing, liquidation health factor monitors, perpetual futures & leverage simulator, candlestick chart anatomy.
  - **Macro & Personal Finance:** Fractional reserve banking visualizer, inflation purchasing power comparisons, crypto emergency fund calculators, assets vs. liabilities balance sheets.
- **Gamified Progression Engine**
  - Granular XP rewards, tiered achievement badges, and persistent progress tracking.
  - Step-by-step guided learning path with knowledge checks and quizzes.
- **AI-Powered Mentor**
  - Context-aware intelligence providing real-time explanations, simulation feedback, and personalized guidance.
- **Full Internationalization (i18n)**
  - Native bilingual support for English and Spanish with instantaneous localized state switching.
- **High-Performance Architecture**
  - Dynamic code-splitting, lazy-loaded simulation modules, and sub-second interaction latencies.

---

## ✦ Core Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & Core** | **Next.js** / **React 19** |
| **Language** | **TypeScript** (Strict Mode, 100% typed contracts) |
| **Styling & System** | **Tailwind CSS** (Custom high-contrast dark theme) |
| **Visualizations** | **Recharts** & Custom SVG dynamic data models |
| **AI Intelligence** | Google GenAI SDK integration |
| **Deployment** | **Vercel Edge Network** |

---

## ✦ Local Development

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **pnpm** / **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/cryptoax07/cryptoax07-hub.git
cd cryptoax07-hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be live at `http://localhost:3000`.

### 5. Production Build

```bash
npm run build
```

To test the production build locally:

```bash
npm run preview
```

---

## ✦ Directory Structure

```text
├── components/
│   ├── simulations/       # 30+ interactive Web3 & DeFi simulation modules
│   ├── ui/                # High-fidelity reusable UI primitives (Buttons, Cards, Modals)
│   ├── Header.tsx         # Navigation header with locale toggle & navigation
│   ├── Footer.tsx         # Global footer with social links & AX07 attribution
│   ├── Dashboard.tsx      # Main user dashboard and simulation explorer
│   ├── AiChatbot.tsx      # On-demand AI crypto tutor
│   └── Progress.tsx       # XP, achievements, and completed badges overview
├── hooks/
│   └── useLanguage.tsx    # Internationalization context hook
├── translations/
│   └── index.ts           # Complete English & Spanish translation dictionaries
├── types.ts               # Global TypeScript interfaces and data structures
├── constants.ts           # Learning paths, simulation catalogues, and configurations
├── index.html             # Application entry point & SEO meta configurations
├── App.tsx                # Master routing, state orchestration, and view loader
└── README.md              # Production project documentation
```

---

## ✦ Author & Credits

Designed, developed, and maintained by **[AX07 Studio](https://ax07.dev)**.

- **Website:** [ax07.dev](https://ax07.dev)
- **Platform:** [cryptoax07.com](https://www.cryptoax07.com)
- **Twitter / X:** [@Ax07Crypto](https://x.com/Ax07Crypto)
- **Community:** [linktr.ee/ax07](https://linktr.ee/ax07)

---

## ✦ Educational Disclaimer

*CryptoAX07 is strictly an educational platform. All simulations, market views, and calculations are simulated for training and instructional purposes only and do not constitute financial, investment, legal, or trading advice.*
