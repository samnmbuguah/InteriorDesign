# AURA & NOIR Atelier - Strapi CMS Integration

This directory contains the headless Strapi CMS configuration for **AURA & NOIR Atelier**.

## Architecture & Graceful Fallback
The Next.js frontend (`src/lib/strapi.ts`) is designed with **zero-failure resilient architecture**:
- When Strapi is running (`http://localhost:1337` or remote), data is fetched live from Strapi with 60-second Incremental Static Regeneration (ISR) and instant On-Demand Webhook revalidation (`/api/revalidate`).
- When Strapi is offline or starting up, the frontend automatically falls back without disruption to the verified internal catalog (`src/data/projects.ts`).
- Consultation inquiries submitted via the website are automatically posted to Strapi's `/api/inquiries` and simultaneously backed up to local secure JSON records.

---

## 1. Quick Start with Docker
To launch Strapi with Docker Compose:

```bash
cd strapi
docker compose up -d
```

Once running:
- **Admin Panel**: [http://localhost:1337/admin](http://localhost:1337/admin)
- **API Endpoint**: [http://localhost:1337/api](http://localhost:1337/api)

---

## 2. Setting up Content Types & Permissions
1. Create your administrator account at `http://localhost:1337/admin`.
2. Go to **Settings > Roles > Public**.
3. Under **Permissions**, enable:
   - `Service`: `find`, `findOne`
   - `Project`: `find`, `findOne`
   - `Inquiry`: `create`
4. Under **Settings > API Tokens**, create a Read-Only or Full-Access token and set it in `.env.local`:
   ```bash
   STRAPI_URL="http://localhost:1337"
   STRAPI_API_TOKEN="your_generated_token_here"
   REVALIDATION_SECRET="aura-noir-strapi-secret-key"
   ```

---

## 3. Webhook Instant Revalidation
In the Strapi Admin panel:
1. Go to **Settings > Webhooks > Create new Webhook**.
2. **Name**: `Next.js Production Revalidate`
3. **URL**: `http://localhost:3000/api/revalidate?secret=aura-noir-strapi-secret-key` (or your production domain).
4. **Events**: Check `Entry > publish`, `Entry > unpublish`, `Entry > update`.
5. Click **Save**. Any edits in Strapi will immediately update the live website!

