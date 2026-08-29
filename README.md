# Scotty Golden Bell

A multilingual, collector-first putter catalogue built with Next.js App Router, React Server Components, TypeScript, Tailwind CSS, Neon Postgres, and Drizzle ORM. Traditional Chinese is the default; Simplified Chinese and English are supported at equivalent URLs.

The initial release is intentionally not commerce: there is no cart, checkout, payment processing, stock quantity, customer login, or runtime image upload.

## Local development

Requirements: Node.js 22 and npm.

```bash
cp .env.example .env.local
npm ci
npm run admin:hash
npm run db:migrate
npm run db:seed
npm run dev
```

The admin setup command asks you to enter the password twice, writes its hash to `ADMIN_PASSWORD_HASH`, and generates `ADMIN_SESSION_SECRET` when needed. Restart the development server after changing the admin password. Never commit environment files.

## Customer accounts

Customer signup is powered by Better Auth and is separate from owner access. Generate a dedicated secret with `openssl rand -base64 32`, then add it to `.env.local`:

```env
BETTER_AUTH_SECRET="paste-the-generated-value-here"
BETTER_AUTH_URL="http://localhost:3000"
```

Customer accounts require `DATABASE_URL`. Apply the included migrations with `npm run db:migrate`, restart the app, then use `/en/account/signup` (or the equivalent localized URL). Better Auth stores password hashes—not plaintext passwords—in `customer_account`. Customer sessions, profile preferences, and interest lists use their own customer tables; the existing environment-password admin login is unchanged.

The default language and public contact channels are managed in **Admin → Settings**. The language controls both the root homepage redirect and the owner console; visitors can still switch between Traditional Chinese, Simplified Chinese, and English. Contact email, WhatsApp, WeChat, Instagram, and Xiaohongshu settings are stored in Postgres and no longer use public environment variables, so `DATABASE_URL` must be configured.

### Product images

The admin product editor uploads JPEG, PNG, and WebP files directly to Cloudinary with a short-lived, server-signed request. Add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` to `.env.local` and to the deployment environment. The API secret is server-only. Neon stores the delivered URL, dimensions, ordering, and Cloudinary asset key; the image bytes remain in Cloudinary. Removing an image and saving the record also removes the managed Cloudinary asset.

Without `DATABASE_URL`, the public site uses clearly identified development seed records and Picsum placeholder images. Database mutations remain unavailable, except that inquiry submission reports success locally to support interface review. Configure Neon before accepting real inquiries.

## Neon setup

Create the production Neon project in AWS Asia Pacific (Singapore), copy its connection string to `DATABASE_URL`, then run the Drizzle migration and seed commands. The app uses `@neondatabase/serverless` with `drizzle-orm/neon-http`; browsers never connect to Neon.

Before production, replace every Picsum URL with repository images under `public/images/putters/[slug]/`, review all seed copy, delete the development sample inquiry, and leave development testimonials unpublished.

## Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Authenticated Playwright tests require a disposable Neon branch plus `E2E_ADMIN_PASSWORD`; destructive test records should never target production.

## Deployment

The app reads only standard environment variables and avoids platform-specific storage or request APIs. Recommended settings for Tencent EdgeOne Pages, Vercel, or Netlify:

- Node.js 22
- Install: `npm ci`
- Build: `npm run build`
- Framework: Next.js
- Root directory: repository root

For standard Node hosting, run `npm ci`, `npm run build`, then `npm run start`. Environment variable changes require a redeploy on most managed platforms.

## Image transition

Version one stores image URLs and metadata in Postgres. The repository adapter validates local public paths and development Picsum URLs. Replace placeholders with paths such as `/images/putters/atelier-01/01-front.webp`; product components do not need to change when a future S3, COS, R2, or Blob adapter is introduced.
