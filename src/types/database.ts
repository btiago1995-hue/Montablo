export type Restaurant = {
  id: string
  owner_id: string
  name: string
  slug: string
  logo_url: string | null
  cover_url: string | null
  primary_color: string
  secondary_color: string
  unavailable_behavior: 'greyed_out' | 'hidden'
  languages: string[]
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'inactive'
  trial_ends_at: string
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  restaurant_id: string
  name_fr: string
  name_en: string | null
  icon: string | null
  sort_order: number
  is_visible: boolean
  created_at: string
}

export type Item = {
  id: string
  restaurant_id: string
  category_id: string | null
  name_fr: string
  name_en: string | null
  description_fr: string | null
  description_en: string | null
  price: number
  image_url: string | null
  tags: string[]
  is_available: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type Promotion = {
  id: string
  item_id: string
  original_price: number
  promo_price: number
  starts_at: string
  ends_at: string | null
  is_active: boolean
  created_at: string
}

export type DailyMenu = {
  id: string
  restaurant_id: string
  title_fr: string
  title_en: string | null
  description_fr: string | null
  description_en: string | null
  price: number | null
  items_description_fr: string | null
  items_description_en: string | null
  valid_date: string
  is_active: boolean
  created_at: string
}

export type MenuImport = {
  id: string
  restaurant_id: string
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      menu_imports: {
        Row: MenuImport
        Insert: Pick<MenuImport, 'restaurant_id'> & Partial<Omit<MenuImport, 'restaurant_id'>>
        Update: Partial<MenuImport>
        Relationships: []
      }
      restaurants: {
        Row: Restaurant
        Insert: Pick<Restaurant, 'owner_id' | 'name' | 'slug'> & Partial<Omit<Restaurant, 'owner_id' | 'name' | 'slug'>>
        Update: Partial<Restaurant>
        Relationships: []
      }
      categories: {
        Row: Category
        Insert: Pick<Category, 'restaurant_id' | 'name_fr'> & Partial<Omit<Category, 'restaurant_id' | 'name_fr'>>
        Update: Partial<Category>
        Relationships: []
      }
      items: {
        Row: Item
        Insert: Pick<Item, 'restaurant_id' | 'name_fr' | 'price'> & Partial<Omit<Item, 'restaurant_id' | 'name_fr' | 'price'>>
        Update: Partial<Item>
        Relationships: []
      }
      promotions: {
        Row: Promotion
        Insert: Pick<Promotion, 'item_id' | 'original_price' | 'promo_price'> & Partial<Omit<Promotion, 'item_id' | 'original_price' | 'promo_price'>>
        Update: Partial<Promotion>
        Relationships: []
      }
      daily_menus: {
        Row: DailyMenu
        Insert: Pick<DailyMenu, 'restaurant_id'> & Partial<Omit<DailyMenu, 'restaurant_id'>>
        Update: Partial<DailyMenu>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
