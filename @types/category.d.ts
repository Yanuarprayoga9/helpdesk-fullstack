export type CategoryType = {
    id: string
    name: string
}

interface CategoriesReturn extends ActionResult {
    categories?: CategoryType[]
}

interface CategoryReturn extends ActionResult {
    category?: CategoryType
}
