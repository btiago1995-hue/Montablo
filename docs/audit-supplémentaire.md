# Audit supplémentaire — trouvailles hors scope P0 explicite

Ce fichier rassemble les problèmes découverts en route lors du sprint
2026-04-22 (handoff porte-à-porte Haute-Savoie). Conformément aux règles
du handoff, **aucune correction en masse ici sans validation du fondateur**.

---

## 1. 🔴 CRITIQUE — Accents systématiquement manquants dans tout le contenu marketing FR

### Ampleur
La totalité des pages publiques `/src/app/(public)/**/*.tsx` est rédigée
sans accents français. Ce n'est pas 2-3 fautes — c'est un pattern
systémique : les rédacteurs/générateurs ont produit du texte ASCII pur.

### Exemples représentatifs (non exhaustif)

**`src/app/(public)/faq/page.tsx`** (ligne 72-74) :
```
'Puis-je mettre a jour mon menu en temps reel ?'
'... prix, ajout de plat, desactivation d'une categorie ...
  est visible instantanement par vos clients. Plus besoin de reimprimer ...'
```
→ « à jour », « temps réel », « désactivation », « catégorie »,
« instantanément », « réimprimer »

**`src/app/(public)/fonctionnalites/page.tsx`** (ligne 33) :
```
'Offrez a vos clients une carte de fidelite digitale qui s'ajoute
 directement a Google Wallet ... Plus de carte cartonnee a perdre —
 elle reste toujours dans leur telephone ... recompenses se mettent
 a jour en temps reel.'
```
→ `fidélité`, `à`, `cartonnée`, `téléphone`, `récompenses`, `réel`…
sur une seule description.

**`src/app/(public)/confidentialite/page.tsx`** (ligne 23) :
```
'Dernière mise a jour : 13 avril 2026'
```

### Fichiers concernés (scan rapide — tous les `(public)/**/*.tsx`)

| Page | Impact commercial | Rewrite planifié ? |
|------|-------------------|---------------------|
| `/` (homepage) | ★★★★★ | ✅ P1.1 refonte |
| `/fonctionnalites` | ★★★★★ | ✅ P1.2 refonte |
| `/faq` | ★★★★ | ❌ reste tel quel |
| `/tarifs` | ★★★★ | ❌ reste |
| `/a-propos` | ★★★ | ❌ reste |
| `/contact` | ★★★ | ❌ reste |
| `/blog` + `/blog/[slug]` | ★★★ | ❌ reste |
| `/compare/*` (4 pages) | ★★★ | ❌ reste |
| `/solutions/*` (9 pages) | ★★★★ | ❌ reste |
| `/menu-digital-restaurant` | ★★★ | ❌ reste |
| `/qr-code-restaurant` | ★★★ | ❌ reste |
| `/confidentialite`, `/cgu`, `/mentions-legales`, `/cookies` | ★★ | ❌ reste |

**≈ 30+ fichiers, probablement 400-600 mots à corriger**.

### Pourquoi c'est grave pour une vente terrain en France
Un restaurateur français qui tombe sur « a jour » ou « fidelite » sur
ta homepage se dira : « logiciel étranger » ou « pas soigné ». Les
accents sont un signal de qualité en FR.

### Options

| Option | Coût | Qualité pitch | Risque |
|--------|------|---------------|--------|
| **a) Sweep complet** : je corrige tout avant lundi | +4-6h (P0 total passe de 17h à 22h) | ✅ impeccable | Je vais devoir lire chaque phrase : certains « e » doivent rester (ex. « Tarte Tatin ») |
| **b) Sweep ciblé** : pages les plus trafiquées uniquement (homepage, /tarifs, /faq, /solutions/haute-savoie) | +1h30 | ✅ sur les pages du pitch | Le reste reste fautif |
| **c) Report total** : laisser tel quel, fixer plus tard | 0h | 🔴 fautes visibles si prospect regarde /compare ou /a-propos | Risque crédibilité |
| **d) Script LLM + validation** : je génère un diff massif, tu valides visuellement avant commit | +2h de ma part + 30min de ta relecture | ✅ bon | Nécessite ton temps |

### Ma recommandation : **(a) sweep complet**

Raison : pour 4-6h de travail maintenant, tu élimines la fausse note
n°1 d'une vente B2B à des Français (la qualité de langue du produit).
C'est littéralement le signal qui différencie un SaaS « pro » d'un
SaaS « bricolé » pour un restaurateur de 55 ans qui ne connaît rien
au digital.

Je peux le faire en **déléguant à un sub-agent** pendant que je traite
P0.2 (allergènes) en parallèle → pas d'impact sur la timeline du
sprint. Total P0 reste ~17-18h au lieu de 22h si séquentiel.

### Ce que je NE toucherais PAS même en (a)
- Noms de fonction JS (`FonctionnalitesPage`)
- Paths de fichier / imports / noms de variable
- URLs
- Textes dans les fichiers `.md` de `docs/` (historiques)
- `package.json`, `tsconfig.json`, etc.

---

## 2. 🟡 À confirmer — Homepage redesign déjà planifié ?

Fichier trouvé : `docs/superpowers/plans/2026-04-17-homepage-redesign.md`.

Il y a déjà un plan de refonte homepage daté d'il y a 5 jours. Il faut
que je le lise avant de coder P1.1 pour ne pas dupliquer/conflicter.

**Action requise** : rien tout de suite, mais je le lirai quand j'attaquerai P1.1.

---

## 3. 🟡 À confirmer — Feature `/contact/` en cours non commitée

`git status` montre `?? src/app/(public)/contact/` et `?? src/app/api/contact/`
— la feature contact form (mémoire ID 1893-1897) a été pushée en prod
mais les fichiers apparaissent non-commitées en local. Probablement un
état git étrange à résoudre mais pas bloquant pour P0.

---

## 4. 🟢 Info — Table `dishes` vs `items`

Handoff mentionnait une table `dishes` — elle s'appelle `items` dans le
schéma réel. Confirmé avec toi → on utilise `items`.

---

*Dernière mise à jour : 2026-04-22*
