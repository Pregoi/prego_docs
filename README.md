# Prego Docs

User-facing documentation for the [Prego](https://github.com/prego) platform, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). Styled like [docs.kinde.com](https://docs.kinde.com).

## Prerequisites

- **Node.js** ≥ 20
- **pnpm** (recommended) or npm

## Setup

```bash
cd prego_docs
pnpm install
```

## Commands

| Command         | Action                                   |
|----------------|------------------------------------------|
| `pnpm dev`     | Start dev server (e.g. http://localhost:4321) |
| `pnpm build`   | Build static site to `dist/`            |
| `pnpm preview` | Preview production build locally        |

## Project structure

```
prego_docs/
├── src/
│   ├── content/
│   │   ├── config.ts    # Docs collection schema
│   │   └── docs/        # Markdown/MDX pages
│   └── styles/          # Custom CSS
├── public/              # Static assets (favicon, etc.)
├── astro.config.mjs     # Starlight config, sidebar, theme
├── package.json
└── README.md
```

## Content (Kinde-style IA)

- **Get started** — Overview, quick start.
- **Guides** — Authentication, billing, tenant onboarding.
- **API & Reference** — API overview and links to OpenAPI specs.
- **SDKs & Tools** — Front-end and back-end integration overview.
- **Deploy & Ops** — Deployment and operations overview.
- **Resources** — Glossary, FAQ, community.

## Deployment

- **GitHub Pages**: Build with `pnpm build`, deploy the `dist/` directory.
- **Vercel / Netlify**: Connect the repo, build command `pnpm build`, output `dist`.
- Set `site` in `astro.config.mjs` to your production URL (e.g. `https://docs.pregoi.com`).

## License

Same as the Prego project.
