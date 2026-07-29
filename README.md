# Sillage website

Product showcase site for [Sillage](https://github.com/getsillage/sillage) — a self-hosted, single-user space for private records, history review, and source-grounded AI answers.

This repository is intentionally separate from the product monorepo. Documentation, releases, and the application itself live in the main project.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- English / Simplified Chinese UI
- Light / dark theme

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Static output is written to `dist/`. Deploy that directory to any static host (Cloudflare Pages, GitHub Pages, Netlify, etc.).

## Content sources

Copy and product claims track the main repository:

- [README](https://github.com/getsillage/sillage/blob/main/README.md)
- [Product guidance](https://github.com/getsillage/sillage/blob/main/docs/development/product-guidance.md)
- [Deployment guide](https://github.com/getsillage/sillage/blob/main/docs/user/deployment.md)
- [AI usage and privacy](https://github.com/getsillage/sillage/blob/main/docs/user/ai.md)

When product positioning or the recommended release tag changes, update `src/i18n/messages.ts` accordingly.

## License

MIT (aligned with Sillage).
