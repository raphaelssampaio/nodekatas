# NodeKatas

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/rsscode)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](#license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

**Learn Node.js by doing — in Portuguese and English.**  
**Aprenda Node.js na prática — em português e inglês.**

NodeKatas is an open source, browser-based interactive learning platform for Node.js. Every exercise gives you real theory, a code editor, and a live test runner powered by WebContainers — no installs, no accounts, no setup. Just open the page and start writing Node.js code that actually runs in the browser.

> Built with Next.js 14, CodeMirror 6, WebContainers, and Tailwind CSS.

---

## Why NodeKatas?

- **Bilingual** — every exercise has full theory and titles in PT and EN, with a language toggle that remembers your preference.
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

> **Note:** WebContainers require the browser to send `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers. These are already configured in `next.config.ts`.

---

## Trails

### Zero absoluto / Absolute zero

For people who have never written a line of Node.js. Covers the runtime itself, the module system, the standard library, and the event-driven model.

| # | PT | EN |
|---|----|----|
| 1 | Seu primeiro módulo Node.js | Your first Node.js module |
| 2 | Módulos CommonJS | CommonJS Modules |
| 3 | Lendo arquivos com fs | Reading files with fs |
| 4 | EventEmitter: eventos customizados | EventEmitter: custom events |
| 5 | Servidor HTTP com o módulo http | HTTP server with the http module |

### Intermediário / Intermediate

For those who know the basics and want to go deeper: streams, the event loop, async patterns, and the npm ecosystem.

*Coming soon — contributions welcome.*

### Avançado / Advanced

For experienced Node.js developers: workers, clustering, performance profiling, and production-grade patterns.

*Coming soon — contributions welcome.*

---

## Adding a new exercise

Create a JSON file in `src/data/exercises/` following the `Exercise` type. The filename should be `NN-slug.json` where `NN` is the zero-padded order within the trail.

**Every field is required:**

```jsonc
{
  // Unique identifier — must match the filename slug (without .json)
  "id": "06-streams",

  // Which trail this exercise belongs to: "zero" | "intermediate" | "advanced"
  "trail": "zero",

  // Sort order within the trail (1-based, no gaps)
  "order": 6,

  // Exercise title in both languages
  "title": {
    "pt": "Streams de leitura",
    "en": "Readable streams"
  },

  // Full theory explanation — explain the WHY, not just the API.
  // Use \n for line breaks. Inline code in backticks is rendered as-is.
  "theory": {
    "pt": "Uma stream de leitura permite processar dados em partes...",
    "en": "A readable stream lets you process data in chunks..."
  },

  // Starter code shown in the editor.
  // Use __fill_me__ exactly where the learner must write their answer.
  "starter": "const { Readable } = require('stream');\n\nfunction createStream(data) {\n  return __fill_me__;\n}\n\nmodule.exports = { createStream };",

  // The correct solution (not shown to the user).
  "solution": "const { Readable } = require('stream');\n\nfunction createStream(data) {\n  return Readable.from(data);\n}\n\nmodule.exports = { createStream };",

  // Jest-style test strings executed by the runner.
  // All exports from solution.js are in global scope.
  // You can use await — the runner wraps tests in an async context.
  "tests": [
    "const chunks = []; for await (const chunk of createStream(['a', 'b', 'c'])) { chunks.push(chunk); } expect(chunks).toEqual(['a', 'b', 'c']);"
  ]
}
```

**Rules for good exercises:**

- Theory should explain *why* something works, not just *what* the API is.
- The `__fill_me__` placeholder should be at the exact spot where insight is required — not too much, not too little.
- Tests must be deterministic: no `Date.now()`, no external network calls (except in exercises that teach networking), no random values.
- Each test string must be independent — don't share state between tests.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 14](https://nextjs.org) — App Router, server components, file-system data loading |
| Runtime | [WebContainers](https://webcontainers.io) — runs real Node.js in the browser via WASM |
| Editor | [CodeMirror 6](https://codemirror.net) — lightweight, composable, fully controlled |
| Styling | [Tailwind CSS](https://tailwindcss.com) — utility-first, no component library |
| Language | TypeScript throughout |
| Storage | `localStorage` — progress and language preference, no backend required |

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                  # Onboarding / trail selection
│   ├── dashboard/page.tsx        # Progress overview
│   └── exercise/[id]/page.tsx    # Exercise page (theory + editor + terminal)
├── components/
│   ├── CodeEditor.tsx            # CodeMirror 6 wrapper
│   ├── OnboardingClient.tsx
│   ├── DashboardClient.tsx
│   └── ExerciseClient.tsx
├── lib/
│   ├── types.ts                  # Exercise, Trail, Language, UserProgress
│   ├── exercises.ts              # getAllExercises() — reads JSON at request time
│   ├── progress.ts               # localStorage helpers
│   └── webcontainer.ts           # Singleton boot + runCode()
└── data/
    └── exercises/                # One JSON file per exercise
        ├── 01-hello-node.json
        ├── 02-modules.json
        └── ...
```

---

## Contributing

Pull requests are welcome. The highest-value contributions are:

- **New exercises** — follow the format above. Start with the *Zero* trail; it needs the most content.
- **Translations** — all theory and titles have `pt` and `en` fields. If something reads awkwardly in either language, fix it.
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
