# OptimIQ Theme 1 Wireframes (Next.js)

This folder contains the React/Next.js source for the Theme 1 client-review wireframes. It uses the App Router, TypeScript, shared role-workspace components, and a responsive navigation component.

## Local preview

```sh
npm install
npm run dev
```

Open the local URL printed by Next.js. The review hub links to the client, consultant, consulting firm, and staff/admin workspaces.

## Static GitHub Pages build

This project uses `output: 'export'`, so `npm run build` creates a static `out/` folder with no runtime server. The GitHub Pages workflow builds and publishes that folder. For local builds, the base path is empty. The workflow sets the repository subpath during the build so assets and links work under `https://<owner>.github.io/<repository>/`.

The static review screens do not call the .NET backend. They are presentation-only concepts; live identity, role permissions, configuration approvals, and business data are outside this wireframe build.

## Routes

- `/` — Theme 1 review hub and per-screen statuses
- `/client/` — Client workspace concept
- `/consultant/` — Consultant lifecycle and concurrent assignments
- `/consulting-firm/` — Seller, Buyer, and Win-and-Staff concepts
- `/admin/` — Staff/admin configuration and approval concept
