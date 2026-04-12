import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { ImportedCategory } from '@/types/menu-import'

type ConfirmBody = {
  categories: ImportedCategory[]
  mode: 'replace' | 'append'
}

export async function POST(request: Request) {
  try {
    const supabase = createClient()

    // 1. Auth check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
    }

    // 2. Get restaurant
    const { data: restaurant, error: restError } = await supabase
      .from('restaurants')
      .select('id')
      .eq('owner_id', user.id)
      .single()

    if (restError || !restaurant) {
      return NextResponse.json({ error: 'Restaurant introuvable' }, { status: 404 })
    }

    // 3. Parse body
    const body = (await request.json()) as ConfirmBody

    if (!body.categories || !Array.isArray(body.categories)) {
      return NextResponse.json({ error: 'Categories requises' }, { status: 400 })
    }

    if (body.mode !== 'replace' && body.mode !== 'append') {
      return NextResponse.json({ error: 'Mode invalide (replace ou append)' }, { status: 400 })
    }

    // 4. If replace mode, delete existing data
    if (body.mode === 'replace') {
      // Delete items first (foreign key constraint)
      const { error: deleteItemsError } = await supabase
        .from('items')
        .delete()
        .eq('restaurant_id', restaurant.id)

      if (deleteItemsError) {
        return NextResponse.json(
          { error: 'Erreur lors de la suppression des items existants' },
          { status: 500 }
        )
      }

      const { error: deleteCatsError } = await supabase
        .from('categories')
        .delete()
        .eq('restaurant_id', restaurant.id)

      if (deleteCatsError) {
        return NextResponse.json(
          { error: 'Erreur lors de la suppression des categories existantes' },
          { status: 500 }
        )
      }
    }

    // 5. Determine starting sort_order for append mode
    let catSortStart = 0
    if (body.mode === 'append') {
      const { data: lastCat } = await supabase
        .from('categories')
        .select('sort_order')
        .eq('restaurant_id', restaurant.id)
        .order('sort_order', { ascending: false })
        .limit(1)
        .single()

      if (lastCat) {
        catSortStart = lastCat.sort_order + 1
      }
    }

    // 6. Insert categories and items
    let totalCategories = 0
    let totalItems = 0

    for (let i = 0; i < body.categories.length; i++) {
      const cat = body.categories[i]

      const { data: insertedCat, error: catError } = await supabase
        .from('categories')
        .insert({
          restaurant_id: restaurant.id,
          name_fr: cat.name_fr,
          name_en: cat.name_en,
          sort_order: catSortStart + i,
        })
        .select('id')
        .single()

      if (catError || !insertedCat) {
        console.error('Category insert error:', catError)
        return NextResponse.json(
          { error: `Erreur lors de l'insertion de la categorie "${cat.name_fr}"` },
          { status: 500 }
        )
      }

      totalCategories++

      if (cat.items && cat.items.length > 0) {
        const itemRows = cat.items.map((item, j) => ({
          restaurant_id: restaurant.id,
          category_id: insertedCat.id,
          name_fr: item.name_fr,
          name_en: item.name_en,
          description_fr: item.description_fr,
          description_en: item.description_en,
          price: item.price,
          tags: item.tags,
          sort_order: j,
        }))

        const { error: itemsError } = await supabase
          .from('items')
          .insert(itemRows)

        if (itemsError) {
          console.error('Items insert error:', itemsError)
          return NextResponse.json(
            { error: `Erreur lors de l'insertion des items pour "${cat.name_fr}"` },
            { status: 500 }
          )
        }

        totalItems += cat.items.length
      }
    }

    return NextResponse.json({
      success: true,
      categories: totalCategories,
      items: totalItems,
    })
  } catch (err) {
    console.error('Menu import confirm error:', err)
    return NextResponse.json(
      { error: 'Erreur lors de la confirmation' },
      { status: 500 }
    )
  }
}
