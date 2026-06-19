# NodeKatas

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/rsscode)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](#license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

**Learn Node.js by doing — in six languages.**  
**Aprenda Node.js na prática — em seis idiomas.**

NodeKatas is an open source, browser-based interactive learning platform for Node.js. Every exercise gives you real theory, a code editor, and a live test runner powered by WebContainers — no installs, no accounts, no setup. Just open the page and start writing Node.js code that actually runs in the browser.

> Built with Next.js 14, CodeMirror 6, WebContainers, Tailwind CSS, and Zustand.

---

## Why NodeKatas?

- **Multilingual** — every exercise has full theory, instructions, and titles in English, Brazilian Portuguese, Spanish, German, Italian, and French, with a language toggle that persists your preference.
- **Real Node.js** — WebContainers run a real Node.js process inside the browser. Your code isn't sandboxed in a fake interpreter; it runs the same way it would on your machine.
- **Progressive** — three trails (Zero → Intermediate → Advanced) let learners start exactly where they need to.
- **Open content** — exercises are plain JSON files. Adding a new one is a pull request, not a platform request.

---

## Getting started locally

```bash
git clone https://github.com/your-username/nodekatas.git
cd nodekatas
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Pick a trail, write code, run tests.

> **Note:** WebContainers require the browser to send `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers. These are already configured in `next.config.js`.

---

## Trails

### Zero absoluto / Absolute zero

For people who have never written a line of Node.js. Covers the runtime itself, the module system, the standard library, and async patterns.

| # | PT | EN |
|---|----|---|
| 1 | Seu primeiro módulo Node.js | Your first Node.js module |
| 2 | Módulos CommonJS | CommonJS Modules |
| 3 | Lendo arquivos com fs | Reading files with fs |
| 4 | EventEmitter: eventos customizados | EventEmitter: custom events |
| 5 | Servidor HTTP com o módulo http | HTTP server with the http module |
| 6 | Roteamento com req.url e req.method | Routing with req.url and req.method |
| 7 | Respondendo com JSON | Responding with JSON |
| 8 | package.json e scripts do npm | package.json and npm scripts |
| 9 | Sintaxe ES6: arrow functions, template literals, destructuring e spread | ES6 syntax: arrow functions, template literals, destructuring, and spread |
| 10 | Promises e async/await | Promises and async/await |

### Intermediário / Intermediate

For those who know the basics and want to go deeper: Express, streams, the filesystem, async error handling, and environment configuration.

| # | PT | EN |
|---|----|---|
| 11 | Primeiros passos com Express | Getting started with Express |
| 12 | Parâmetros de rota e query strings | Route parameters and query strings |
| 13 | Middlewares no Express | Middleware in Express |
| 14 | Lendo o corpo de requisições POST | Reading POST request bodies |
| 15 | Tratamento de erros no Express | Error handling in Express |
| 16 | Escrevendo arquivos com fs | Writing files with fs |
| 17 | Trabalhando com diretórios | Working with directories |
| 18 | Streams: lendo arquivos sem carregar tudo na memória | Streams: reading files without loading everything into memory |
| 19 | Tratamento de erros em código assíncrono | Error handling in asynchronous code |
| 20 | Variáveis de ambiente | Environment variables |

### Avançado / Advanced

For experienced Node.js developers: SQL and NoSQL databases, authentication, authorization, REST API design, and production configuration.

| # | PT | EN |
|---|----|---|
| 21 | Knex: construindo consultas SELECT | Knex: building SELECT queries |
| 22 | Knex: INSERT, UPDATE e DELETE | Knex: INSERT, UPDATE, and DELETE |
| 23 | Mongoose: Schemas e Models | Mongoose: Schemas and Models |
| 24 | CRUD com Mongoose: create, find, update e delete | Mongoose CRUD: create, find, update, and delete |
| 25 | JWT: autenticação stateless | JWT: stateless authentication |
| 26 | Sessões com express-session | Sessions with express-session |
| 27 | Autenticação com Passport.js (LocalStrategy) | Authentication with Passport.js (LocalStrategy) |
| 28 | Controle de acesso: autenticação vs. autorização | Access control: authentication vs. authorization |
| 29 | Desenho de APIs REST | REST API design |
| 30 | Configurando uma aplicação Express para produção | Configuring an Express app for production |

---

## Adding a new exercise

Create a JSON file in `src/data/exercises/` following the `Exercise` type. The filename should be `NN-slug.json` where `NN` is the zero-padded order within the trail.

**Every field is required:**

```jsonc
{
  // Unique identifier — must match the filename slug (without .json)
  "id": "06-http-routing",

  // Which trail this exercise belongs to: "zero" | "intermediate" | "advanced"
  "trail": "zero",

  // Sort order within the trail (1-based, no gaps)
  "order": 6,

  // Exercise title in all six languages
  "title": {
    "en": "Routing with req.url and req.method",
    "pt": "Roteamento com req.url e req.method",
    "es": "Enrutamiento con req.url y req.method",
    "de": "Routing mit req.url und req.method",
    "it": "Routing con req.url e req.method",
    "fr": "Routage avec req.url et req.method"
  },

  // Full theory explanation in all six languages
  "theory": {
    "en": "...",
    "pt": "...",
    "es": "...",
    "de": "...",
    "it": "...",
    "fr": "..."
  },

  // Task description shown to the learner in all six languages
  "instructions": {
    "en": "...",
    "pt": "...",
    "es": "...",
    "de": "...",
    "it": "...",
    "fr": "..."
  },

  // Starter code shown in the editor.
  // Use __fill_me__ exactly where the learner must write their answer.
  "starter": "const http = require('http');\n\nfunction createServer() {\n  return __fill_me__;\n}\n\nmodule.exports = { createServer };",

  // The correct solution (not shown to the user).
  "solution": "...",

  // Jest-style test strings executed by the runner.
  // All exports from solution.js are in global scope.
  // You can use await — the runner wraps tests in an async context.
  "tests": [
    "const server = createServer(); expect(typeof server).toBe('object');"
  ]
}
```

**Rules for good exercises:**

- Theory should explain *why* something works, not just *what* the API is.
- The `__fill_me__` placeholder should be at the exact spot where insight is required — not too much, not too little.
- Tests must be deterministic: no `Date.now()`, no random values.
- Each test string must be independent — don't share state between tests.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 14.2](https://nextjs.org) — App Router, server components, file-system data loading |
| Runtime | [WebContainers API 1.6](https://webcontainers.io) — runs real Node.js in the browser via WASM |
| Editor | [CodeMirror 6](https://codemirror.net) — `@codemirror/view`, `@codemirror/state`, `@codemirror/lang-javascript`, `@codemirror/theme-one-dark` |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) — utility-first, no component library |
| State | [Zustand 5](https://zustand-demo.pmnd.rs) — global store with `localStorage` persistence |
| Layout | [react-resizable-panels 4](https://github.com/bvaughn/react-resizable-panels) — draggable editor/output split |
| Analytics | [@vercel/analytics](https://vercel.com/analytics) |
| Language | TypeScript throughout |

**Runner dependencies** (installed inside the WebContainer at boot):

`express`, `knex`, `pg`, `mongoose`, `jsonwebtoken`, `passport`, `passport-local`, `express-session`, `helmet`, `compression`

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout with Vercel Analytics
│   ├── page.tsx                    # Onboarding / welcome page
│   ├── dashboard/page.tsx          # Progress overview (stats per trail)
│   ├── exercise/[id]/page.tsx      # Exercise page (theory + editor + output)
│   └── roadmap/page.tsx            # Trail roadmap with exercise list
├── components/
│   ├── BuyMeACoffeeButton.tsx      # Floating support button
│   ├── CodeEditor.tsx              # CodeMirror 6 wrapper (One Dark theme)
│   ├── DashboardClient.tsx         # Progress dashboard with per-trail stats
│   ├── ExerciseClient.tsx          # Exercise UI: theory sidebar, editor, output
│   ├── FormattedText.tsx           # Renders inline code spans in instructions
│   ├── LanguageSelect.tsx          # Language picker (6 languages)
│   ├── OnboardingClient.tsx        # Welcome screen with Start button
│   ├── RoadmapClient.tsx           # Visual roadmap with status indicators
│   └── TheoryText.tsx              # Theory section renderer
├── lib/
│   ├── exercises.ts                # getAllExercises() — reads JSON at request time
│   ├── i18n.ts                     # Translation strings and helper functions
│   ├── parseFormattedText.ts       # Parses inline code backtick syntax
│   ├── store.ts                    # Zustand store (progress + language, persisted)
│   ├── types.ts                    # Exercise, Trail, Language, UserProgress types
│   └── webcontainer.ts             # Singleton WebContainer boot + runCode()
└── data/
    └── exercises/                  # One JSON file per exercise (30 total)
        ├── 01-hello-node.json
        ├── 02-modules.json
        └── ...
```

---

## Contributing

Pull requests are welcome. The highest-value contributions are:

- **New exercises** — follow the format above. All six language fields (`en`, `pt`, `es`, `de`, `it`, `fr`) are required.
- **Translations** — all theory, instructions, and titles have fields for all six languages. If something reads awkwardly, fix it.
- **Bug fixes** — open an issue first for anything beyond a one-liner so we can align before you invest time.
- **New trails** — open an issue to discuss scope before writing content.

Please keep exercises focused on one concept, with theory that a complete beginner can follow. If the theory needs more than three paragraphs, consider splitting the exercise in two.

---

## Support this project

NodeKatas is free and open source, maintained in spare time. If it helped you learn Node.js, consider buying me a coffee — it helps keep new exercises and trails coming.

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/rsscode)

Se este projeto te ajudou, considere apoiar com um café! ☕

---

## License

MIT — do whatever you want with it. If you build something on top of NodeKatas, a mention would be appreciated but is not required.
