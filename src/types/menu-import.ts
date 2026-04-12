export type ImportedItem = {
  name_fr: string
  name_en: string
  description_fr: string | null
  description_en: string | null
  price: number
  tags: string[]
}

export type ImportedCategory = {
  name_fr: string
  name_en: string
  items: ImportedItem[]
}

export type MenuImportResult = {
  categories: ImportedCategory[]
}
