
export type CategoryType = {
    id: string
    name: string
}

export interface CategoriesReturn extends ActionResult {
    categories?: CategoryType[]
}

export interface CategoryReturn extends ActionResult {
    category?: CategoryType
}

