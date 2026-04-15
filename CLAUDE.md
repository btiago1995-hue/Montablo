# Montablo

Next.js 14.2 + TypeScript + Supabase + Vercel. Menu digital para restaurantes.

## Deploy Configuration (configured by /setup-deploy)
- Platform: Vercel
- Production URL: https://www.montablo.com
- Deploy workflow: auto-deploy on push to main (Vercel GitHub integration)
- Deploy status command: `vercel ls --prod`
- Merge method: merge commit
- Project type: web app
- Post-deploy health check: https://www.montablo.com

### Custom deploy hooks
- Pre-merge: `npm run build`
- Deploy trigger: automatic on push to main
- Deploy status: poll https://www.montablo.com
- Health check: https://www.montablo.com
