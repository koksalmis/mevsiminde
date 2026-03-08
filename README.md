# mevsimin.de

Mevsiminde yenmesi gereken meyve ve sebzeleri gösteren, her ürünün sağlık faydalarını, besin değerlerini ve hangi aylarda tüketilmesi gerektiğini açıklayan bilgilendirici bir web sitesi. Amaç, kullanıcıların daha sağlıklı ve sürdürülebilir beslenme alışkanlıkları kazanmasına yardımcı olmaktır.

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **TypeScript**
- **next-intl** (i18n-ready, Turkish default)
- **Framer Motion**
- **Lucide React**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/[locale]/        # Pages (locale-aware routing)
  components/          # UI components
  data/                # Food and blog data (locale-keyed)
  i18n/                # Internationalization config
  lib/                 # Utility functions
  types/               # TypeScript types
messages/              # Translation dictionaries
```

## Adding a New Language

1. Add locale to `src/i18n/routing.ts`
2. Create `messages/{locale}.json`
3. Create `src/data/foods/{locale}.ts`
4. Create `src/data/blog-posts/{locale}.ts`
