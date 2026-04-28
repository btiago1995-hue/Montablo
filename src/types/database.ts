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
  address_line: string | null
  city: string | null
  postal_code: string | null
  country_code: string | null
  latitude: number | null
  longitude: number | null
  geocoded_at: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'inactive'
  tier: 'essentiel' | 'pro' | 'premium' | null
  billing_cycle: 'monthly' | 'annual' | null
  is_launch_offer: boolean
  launch_offer_locked_price: number | null
  trial_choose_plan_sent: boolean
  google_review_url: string | null
  onboarding_step: 'welcome' | 'import' | 'complete' | null
  trial_ends_at: string
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  restaurant_id: string
  name_fr: string
  name_en: string | null
  name_de: string | null
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
  name_de: string | null
  description_fr: string | null
  description_en: string | null
  description_de: string | null
  price: number
  image_url: string | null
  tags: string[]
  allergens: Allergen[]
  is_available: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type Allergen =
  | 'gluten'
  | 'crustaceans'
  | 'eggs'
  | 'fish'
  | 'peanuts'
  | 'soybeans'
  | 'milk'
  | 'nuts'
  | 'celery'
  | 'mustard'
  | 'sesame'
  | 'sulphites'
  | 'lupin'
  | 'molluscs'

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
  title_de: string | null
  description_fr: string | null
  description_en: string | null
  description_de: string | null
  price: number | null
  items_description_fr: string | null
  items_description_en: string | null
  items_description_de: string | null
  valid_date: string
  is_active: boolean
  created_at: string
}

export type MenuImport = {
  id: string
  restaurant_id: string
  created_at: string
}

export type Review = {
  id: string
  restaurant_id: string
  rating: number
  created_at: string
}

export type ReviewRateLimit = {
  id: string
  ip_address: string
  restaurant_id: string
  created_at: string
}

export type LoyaltyProgram = {
  id: string
  restaurant_id: string
  type: 'visits' | 'spend'
  goal: number // visits: count | spend: cents (e.g. 5000 = 50€)
  reward_description: string
  card_tagline: string | null
  is_active: boolean
  card_color_override: string | null
  wide_logo_url: string | null
  enable_directions: boolean
  enable_review: boolean
  website_url: string | null
  instagram_url: string | null
  facebook_url: string | null
  allow_multiple_holders: boolean
  enable_update_notifications: boolean
  welcome_message_fr: string | null
  welcome_message_en: string | null
  welcome_message_de: string | null
  created_at: string
}

export type LoyaltyCard = {
  id: string
  program_id: string
  restaurant_id: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  current_value: number // visits: count | spend: cents
  total_redeemed: number
  apple_pass_serial: string | null
  apple_auth_token: string | null
  google_pass_id: string | null
  created_at: string
}

export type LoyaltyStamp = {
  id: string
  card_id: string
  amount: number // 1 for visits, cents for spend
  added_by: string | null
  created_at: string
}

export type LoyaltyDeviceRegistration = {
  id: string
  card_id: string
  device_library_id: string
  push_token: string
  pass_type_id: string
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      review_rate_limits: {
        Row: ReviewRateLimit
        Insert: Pick<ReviewRateLimit, 'ip_address' | 'restaurant_id'> & Partial<Omit<ReviewRateLimit, 'ip_address' | 'restaurant_id'>>
        Update: Partial<ReviewRateLimit>
        Relationships: []
      }
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
      reviews: {
        Row: Review
        Insert: Pick<Review, 'restaurant_id' | 'rating'> & Partial<Omit<Review, 'restaurant_id' | 'rating'>>
        Update: Partial<Review>
        Relationships: []
      }
      loyalty_programs: {
        Row: LoyaltyProgram
        Insert: Pick<LoyaltyProgram, 'restaurant_id' | 'type' | 'goal' | 'reward_description'> & Partial<Omit<LoyaltyProgram, 'restaurant_id' | 'type' | 'goal' | 'reward_description'>>
        Update: Partial<LoyaltyProgram>
        Relationships: []
      }
      loyalty_cards: {
        Row: LoyaltyCard
        Insert: Pick<LoyaltyCard, 'program_id' | 'restaurant_id' | 'customer_name' | 'customer_email'> & Partial<Omit<LoyaltyCard, 'program_id' | 'restaurant_id' | 'customer_name' | 'customer_email'>>
        Update: Partial<LoyaltyCard>
        Relationships: []
      }
      loyalty_stamps: {
        Row: LoyaltyStamp
        Insert: Pick<LoyaltyStamp, 'card_id' | 'amount'> & Partial<Omit<LoyaltyStamp, 'card_id' | 'amount'>>
        Update: Partial<LoyaltyStamp>
        Relationships: []
      }
      loyalty_device_registrations: {
        Row: LoyaltyDeviceRegistration
        Insert: Pick<LoyaltyDeviceRegistration, 'card_id' | 'device_library_id' | 'push_token' | 'pass_type_id'> & Partial<Omit<LoyaltyDeviceRegistration, 'card_id' | 'device_library_id' | 'push_token' | 'pass_type_id'>>
        Update: Partial<LoyaltyDeviceRegistration>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
