'use client'

import { useState } from 'react'

type MenuItem = { name: string; desc: string; price: string; isNew?: boolean }

const MENU: Record<string, MenuItem[]> = {
  entrees: [
    { name: "Soupe à l'oignon", desc: 'Gratinée au gruyère, pain de campagne', price: '8,50 €' },
    { name: 'Chèvre chaud sur toast', desc: 'Miel, noix, mesclun du potager', price: '11,00 €' },
    { name: 'Œuf parfait', desc: 'Cèpes, émulsion parmesan, noisette', price: '14,00 €', isNew: true },
    { name: 'Foie gras maison', desc: 'Chutney de figue, brioche toastée', price: '16,50 €' },
  ],
  plats: [
    { name: 'Confit de canard', desc: 'Pommes sarladaises, jus corsé', price: '19,50 €' },
    { name: 'Bœuf bourguignon', desc: 'Carottes fondantes, champignons de Paris', price: '18,00 €' },
    { name: 'Filet de bar', desc: 'Fenouil rôti, beurre citron vert', price: '23,00 €', isNew: true },
    { name: 'Risotto aux morilles', desc: 'Parmesan Reggiano 24 mois', price: '21,00 €' },
    { name: 'Entrecôte 300g', desc: 'Frites maison, sauce au poivre', price: '26,00 €' },
  ],
  desserts: [
    { name: 'Tarte fine aux pommes', desc: 'Crème glacée vanille Bourbon', price: '9,00 €' },
    { name: 'Moelleux au chocolat', desc: 'Cœur coulant, praliné noisette', price: '9,50 €' },
    { name: 'Crème brûlée', desc: 'Vanille de Madagascar, sucre caramélisé', price: '8,00 €' },
    { name: 'Assiette de fromages', desc: 'Sélection du maître affineur', price: '12,00 €' },
  ],
  boissons: [
    { name: 'Côtes du Rhône — verre', desc: 'Domaine Saint-Julien · 2022', price: '7,50 €' },
    { name: 'Bordeaux — bouteille', desc: 'Château Belair · 2020', price: '38,00 €' },
    { name: 'Café expresso', desc: 'Torréfaction artisanale lyonnaise', price: '2,80 €' },
    { name: 'Infusion verveine', desc: 'Feuilles fraîches de Provence', price: '4,50 €' },
  ],
}

const TABS: { key: keyof typeof MENU; label: string }[] = [
  { key: 'entrees', label: 'Entrées' },
  { key: 'plats', label: 'Plats' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'boissons', label: 'Boissons' },
]

export function MenuPreview() {
  const [active, setActive] = useState<keyof typeof MENU>('entrees')
  const items = MENU[active]

  return (
    <div className="mt-menu-card">
      <div className="mt-menu-card-head">
        <h3>Le Petit Bistrot</h3>
        <div className="mt-sprite">M</div>
      </div>
      <div className="mt-menu-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`mt-menu-tab${active === t.key ? ' mt-active' : ''}`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-menu-list">
        {items.map((i) => (
          <div key={i.name} className="mt-menu-item">
            <div className="mt-menu-item-name">
              {i.name}
              {i.isNew && <span className="mt-tag-new">Nouveau</span>}
            </div>
            <div className="mt-menu-item-price">{i.price}</div>
            <div className="mt-menu-item-desc">{i.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
