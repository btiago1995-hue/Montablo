# Haute-Savoie SEO & GEO — Design Spec

**Date:** 2026-04-15  
**Product:** MonTablo — Menu digital pour restaurants  
**Objectif:** Devenir la référence marché en Haute-Savoie (département 74) via SEO Google + visibilité dans les IAs (GEO), puis répliquer le playbook sur d'autres régions françaises.

---

## Contexte

MonTablo est actuellement sans présence géographique locale : aucune page ciblant une ville ou région spécifique. Le site dispose de :
- 2 pillar pages nationales (`/menu-digital-restaurant`, `/qr-code-restaurant`)
- 7 solution pages par type de restaurant
- 4 pages de comparaison concurrents
- 12 articles de blog nationaux (hardcodés dans `src/lib/blog.ts`)

**Point de départ en Haute-Savoie :** zéro — pas de clients locaux, pas de partenariats, présence purement digitale.

**Capacité de production :** haute (IA-assistée).

**Définition du succès :**
1. Top 3 Google pour les requêtes "menu digital restaurant [ville Haute-Savoie]"
2. Cité par ChatGPT / Perplexity / Gemini quand un restaurateur demande un outil de menu digital en Haute-Savoie
3. Pages spokes prêtes à être utilisées comme landing pages Google Ads

---

## Stratégie : Hub & Spoke Régional + Couche GEO

### Principe

Une page-ancre régionale forte (hub) + pages par ville (spokes) + articles de blog locaux + signaux GEO intégrés à chaque niveau.

La stratégie est conçue comme un **playbook réplicable** : une fois Haute-Savoie conquis, le même schéma s'applique à Savoie, Isère, Ain, Loire, etc.

---

## Architecture des URLs

```
/solutions/haute-savoie                     ← Hub régional
/solutions/haute-savoie/annecy              ← Spoke
/solutions/haute-savoie/chamonix
/solutions/haute-savoie/annemasse
/solutions/haute-savoie/thonon-les-bains
/solutions/haute-savoie/megeve
/solutions/haute-savoie/cluses
/solutions/haute-savoie/sallanches
/solutions/haute-savoie/la-clusaz
/solutions/haute-savoie/evian-les-bains
/solutions/haute-savoie/bonneville
```

---

## Pages à créer

### 1. Hub — `/solutions/haute-savoie`

**H1 :** "Menu digital pour restaurants en Haute-Savoie (74)"

**Contenu (~1 500 mots) :**
- Contexte régional : tourisme international (ski, randonnée, lac), clientèle suisse et anglophone, saisonnalité forte
- Argument bilinguisme FR/EN : essentiel à Chamonix, Annecy, Megève où les touristes ne lisent pas français
- Argument mises à jour rapides : menus saisonniers qui changent plusieurs fois par an
- Argument simplicité : petits restaurants de montagne sans équipe tech
- Témoignage fictif localisé (à remplacer par un vrai dès qu'un client Haute-Savoie existe)
- Tableau des villes couvertes avec liens vers spokes
- CTA : essai gratuit 14 jours

**SEO metadata :**
- Title : `Menu digital restaurant Haute-Savoie (74) — MonTablo`
- Description : `MonTablo, solution de menu digital QR code pour les restaurants de Haute-Savoie. Annecy, Chamonix, Thonon... Essai gratuit 14 jours.`

**Schema :**
- `LocalBusiness` avec `areaServed: "Haute-Savoie"`
- `FAQPage` (3–4 questions)
- `BreadcrumbList`

---

### 2. Spokes — `/solutions/haute-savoie/[ville]`

Template commun, contenu différencié par ville. Chaque spoke : ~800 mots.

| Ville | Angle éditorial spécifique |
|-------|---------------------------|
| **Annecy** | Ville touristique premium, lac, clientèle internationale, restaurants gastronomiques et brasseries |
| **Chamonix** | Station ski internationale, clientèle UK/CH/US, menus EN obligatoires, haute saison hiver/été |
| **Annemasse** | Frontaliers Genève, marché local dense, restaurants de midi en semaine |
| **Thonon-les-Bains** | Bords du lac Léman, tourisme suisse, second marché après Annecy |
| **Megève** | Restauration haut-de-gamme, clientèle aisée, station chic |
| **Cluses** | Ville industrielle, restauration rapide et brasseries de déjeuner |
| **Sallanches** | Porte d'entrée du Mont-Blanc, flux touristique élevé en transit |
| **La Clusaz** | Station ski familiale, menus montagnards, saisonnalité marquée |
| **Évian-les-Bains** | Tourisme wellness/luxe, clientèle internationale, restaurants d'hôtel |
| **Bonneville** | Chef-lieu, services locaux, restauration de proximité |

**Chaque spoke contient :**
- H1 : "Menu digital pour restaurants à [Ville]"
- Intro contextualisée (2 paragraphes spécifiques à la ville)
- Section avantages MonTablo adaptée au contexte local
- FAQ locale (3 questions avec réponses directes — citables par IA)
- CTA essai gratuit
- Lien de retour vers le hub Haute-Savoie
- Liens vers articles de blog pertinents

**Schema :** `LocalBusiness` (areaServed: [ville]), `FAQPage`, `BreadcrumbList`

---

### 3. Articles de blog — 6 articles régionaux

À ajouter dans `src/lib/blog.ts` :

| Slug | Titre | Angle GEO |
|------|-------|-----------|
| `menu-digital-restaurant-haute-savoie` | "Restaurant en Haute-Savoie : comment gérer un menu pour touristes internationaux" | Entité géographique explicite dans H1 |
| `menu-digital-station-ski` | "Menu digital pour station de ski : les spécificités des restaurants de montagne" | Requête sémantique ski + restaurant |
| `menu-saisonnier-fondue-raclette` | "Fondue, raclette, tartiflette : gérer un menu saisonnier sans se casser la tête" | Cuisine savoyarde, entités locales |
| `menu-digital-restaurant-annecy` | "Annecy : nos conseils pour digitaliser votre restaurant au bord du lac" | Entité ville + use case premium |
| `menu-bilingue-chamonix` | "Chamonix Mont-Blanc : pourquoi votre menu doit être bilingue dès maintenant" | Entité ville + argument clé |
| `ouvrir-restaurant-haute-savoie` | "Ouvrir un restaurant en Haute-Savoie : tout ce qu'il faut savoir en 2026" | Contenu d'autorité régionale, top-of-funnel |

Chaque article :
- ~1 000–1 500 mots
- Contient des faits vérifiables et des réponses directes à des questions ("Quel est le meilleur menu digital pour un restaurant à Annecy ?")
- Liens internes vers hub, spokes, et pillar pages nationales

---

## Couche GEO

### `public/llms.txt`
Fichier décrivant MonTablo pour les crawlers d'IA :
- Description du produit
- Marché cible (restaurateurs français, focus Haute-Savoie)
- USPs (bilingue, QR code, temps réel, 14 jours gratuits)
- URLs canoniques des pages clés

### Signaux de citabilité dans le contenu
Chaque page spoke et chaque article inclut :
- Des phrases directes et assertives commençant par "MonTablo est..." ou "Pour les restaurants de [ville]..."
- Des réponses FAQ formulées comme des réponses directes (pas de rhétorique)
- Des données locales contextuelles (nombre de restaurants dans la région, flux touristique)

### Sitemap
`src/app/sitemap.ts` ou fichier statique étendu avec toutes les nouvelles URLs, priorisées :
- Hub : priority 0.9
- Spokes : priority 0.8
- Articles régionaux : priority 0.7

---

## Google Ads — Readiness

Les spokes sont conçus pour être des landing pages Ads dès leur publication :
- H1 = headline de l'annonce (correspondance exacte de keyword)
- CTA au-dessus de la ligne de flottaison
- Pas de navigation complexe, focus sur la conversion
- URL friendly (`/solutions/haute-savoie/annecy`) → utilisable comme Display URL dans les annonces

**Campagne recommandée (phase 2) :**
- Groupe d'annonces par ville
- Keywords : "menu digital restaurant [ville]", "carte qr code restaurant [ville]", "menu numérique [ville]"
- Landing page : spoke correspondant

---

## Playbook de Réplication

Une fois Haute-Savoie en place, le même schéma s'applique :

```
Phase 2 : Savoie (73) — Chambéry, Aix-les-Bains, Albertville
Phase 3 : Isère (38) — Grenoble, Vienne, Bourgoin-Jallieu
Phase 4 : Ain (01) — Bourg-en-Bresse, Oyonnax
...
```

Chaque région : 1 hub + 8–10 spokes + 4–6 articles = ~3 semaines de contenu IA-assisté.

---

## Implémentation technique

### Fichiers à créer
- `src/app/(public)/solutions/haute-savoie/page.tsx` — Hub
- `src/app/(public)/solutions/haute-savoie/[ville]/page.tsx` — Template spoke dynamique
- `src/data/haute-savoie-villes.ts` — Données par ville (contenu, metadata, schema)
- `public/llms.txt` — Fichier GEO
- 6 entrées dans `src/lib/blog.ts`

### Patterns existants à suivre
- Solution pages existantes (`/solutions/bistrot`, etc.) pour le layout
- `src/components/seo/json-ld.tsx` pour les schémas
- `src/lib/blog.ts` pour les articles

### Sitemap
Vérifier si `sitemap.xml` est généré dynamiquement (`src/app/sitemap.ts`) ou statique, et étendre en conséquence.

---

## Critères de succès

| Métrique | Cible | Délai |
|----------|-------|-------|
| Top 10 Google "menu digital restaurant Annecy" | ✓ | 2–3 mois |
| Top 3 Google "menu digital restaurant Annecy" | ✓ | 4–6 mois |
| Cité par Perplexity/ChatGPT pour requêtes Haute-Savoie | ✓ | 1–3 mois |
| 3 landing pages Ads actives | ✓ | Dès J+1 après publication |
| Playbook Savoie lancé | ✓ | 6 mois |
