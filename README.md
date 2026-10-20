# OptimIQ Consultus Theme 1 Screen Review

The client approved Theme 1. This repository contains a React/Next.js implementation of the review hub and four role workspace concepts. The source is in [`next-app/`](next-app/README.md).

## Stack direction

- React with TypeScript, using the Next.js App Router.
- Next.js static export for client review. The wireframes do not require a Node.js runtime server.
- GitHub Pages receives the generated static site from `next-app/out` through the workflow in `.github/workflows/pages.yml`.
- The eventual .NET backend is not connected to these presentation-only wireframes.

## Local preview

From `next-app/`, run `npm install`, then `npm run dev`.

## Review screens

- Client workspace
- Consultant workspace
- Consulting firm workspace
- Staff / Admin workspace

Theme 1 is approved. Individual screen concepts are marked **Awaiting screen feedback** until each receives separate approval. Record client feedback in the approval inventory linked from the review hub.
