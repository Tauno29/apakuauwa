# Apaku Awua Investments CC

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

- `pnpm dev`: development server; honors `PORT` (default 3000).
- `pnpm build` / `pnpm start`: build and serve `dist/index.js` and `dist/public/`.
- `pnpm db:migrate`: apply checked-in migrations. `pnpm db:push`: generate and apply new schema changes.
- `pnpm check` / `pnpm test`: types and application tests.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. Storefront images are committed under `client/public/images/` so the public pages do not depend on Manus-managed storage.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.

## Vercel static storefront

The repository-root `vercel.json` pins pnpm 10.18.0, installs from `pnpm-lock.yaml`, runs `pnpm build:static`, publishes `dist/public`, and rewrites SPA routes to `index.html`. Use the repository root as the Vercel project root. The storefront and its images are self-contained; no Manus storage paths or Vercel environment variables are required for the public pages. This configuration prepares the project but does not create or deploy a Vercel project.
