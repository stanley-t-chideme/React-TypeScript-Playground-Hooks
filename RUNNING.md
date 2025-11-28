# How to run this project (Vite)

Short, practical instructions to get this React + TypeScript app running locally — this project uses Vite as its dev server and build tool.

## Prerequisites

- Node.js (v18+ is recommended)
- npm (or pnpm / yarn if you prefer — examples use npm)

## Install dependencies

Run this from the repository root:

```bash
npm install
```

Alternative package managers:

```bash
pnpm install

yarn install
```

## Development server (fast feedback)

Starts the Vite dev server and opens a fast HMR-enabled environment for development:

```bash
npm run dev
```

By default Vite listens on port 5173. The terminal output will show the exact local URL (for example: http://localhost:5173).

## Previewing a production build

Create an optimized production build and preview it locally (the `build` script runs `tsc -b` before bundling):

```bash
npm run build
npm run preview
```

`npm run preview` serves the built assets locally so you can validate the production output.

## Linting

This project includes an ESLint script. Run the linter with:

```bash
npm run lint
```

## Notes & troubleshooting

- To change the dev server port:

```bash
npm run dev -- --port 3000
```

- Manually run TypeScript build checks:

```bash
npx tsc -b
```

- Fix dependency issues by removing node_modules and lockfile then reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Where to look next

- Source files: `src/` (components and app entry point)
- Dev config: `vite.config.ts` (Vite + React plugin config)
