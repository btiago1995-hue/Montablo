import type { Allergen } from '@/types/database'

export type AllergenDef = {
  code: Allergen
  icon: string
  label_fr: string
  label_en: string
  label_de: string
}

export const ALLERGENS: readonly AllergenDef[] = [
  { code: 'gluten',      icon: '🌾', label_fr: 'Gluten',              label_en: 'Gluten',              label_de: 'Gluten' },
  { code: 'crustaceans', icon: '🦞', label_fr: 'Crustacés',           label_en: 'Crustaceans',         label_de: 'Krebstiere' },
  { code: 'eggs',        icon: '🥚', label_fr: 'Œufs',                label_en: 'Eggs',                label_de: 'Eier' },
  { code: 'fish',        icon: '🐟', label_fr: 'Poissons',            label_en: 'Fish',                label_de: 'Fisch' },
  { code: 'peanuts',     icon: '🥜', label_fr: 'Arachides',           label_en: 'Peanuts',             label_de: 'Erdnüsse' },
  { code: 'soybeans',    icon: '🌱', label_fr: 'Soja',                label_en: 'Soybeans',            label_de: 'Soja' },
  { code: 'milk',        icon: '🥛', label_fr: 'Lait',                label_en: 'Milk',                label_de: 'Milch' },
  { code: 'nuts',        icon: '🌰', label_fr: 'Fruits à coque',      label_en: 'Tree nuts',           label_de: 'Schalenfrüchte' },
  { code: 'celery',      icon: '🌿', label_fr: 'Céleri',              label_en: 'Celery',              label_de: 'Sellerie' },
  { code: 'mustard',     icon: '🟡', label_fr: 'Moutarde',            label_en: 'Mustard',             label_de: 'Senf' },
  { code: 'sesame',      icon: '⚪', label_fr: 'Sésame',              label_en: 'Sesame',              label_de: 'Sesam' },
  { code: 'sulphites',   icon: '🍷', label_fr: 'Sulfites',            label_en: 'Sulphites',           label_de: 'Sulfite' },
  { code: 'lupin',       icon: '🌸', label_fr: 'Lupin',               label_en: 'Lupin',               label_de: 'Lupinen' },
  { code: 'molluscs',    icon: '🐚', label_fr: 'Mollusques',          label_en: 'Molluscs',            label_de: 'Weichtiere' },
] as const

const ALLERGEN_MAP: Record<Allergen, AllergenDef> = Object.fromEntries(
  ALLERGENS.map((a) => [a.code, a])
) as Record<Allergen, AllergenDef>

export function getAllergen(code: Allergen): AllergenDef {
  return ALLERGEN_MAP[code]
}

export type AllergenLocale = 'fr' | 'en' | 'de'

export function getAllergenLabel(code: Allergen, locale: AllergenLocale): string {
  const def = ALLERGEN_MAP[code]
  if (locale === 'en') return def.label_en
  if (locale === 'de') return def.label_de
  return def.label_fr
}

export const ALLERGEN_FOOTER: Record<AllergenLocale, string> = {
  fr: 'Informations allergènes conformes au règlement UE n°1169/2011. Pour toute précision, demandez au personnel.',
  en: 'Allergen information in compliance with EU Regulation No 1169/2011. For any clarification, please ask the staff.',
  de: 'Allergeninformationen gemäß EU-Verordnung Nr. 1169/2011. Für weitere Auskünfte wenden Sie sich bitte an das Personal.',
}

export const ALLERGEN_LEGEND_TITLE: Record<AllergenLocale, string> = {
  fr: 'Allergènes',
  en: 'Allergens',
  de: 'Allergene',
}
