"use client"

import { useSearchParams, useRouter } from "next/navigation"
import type { SelectorsType } from "@/lib/utils"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ICategoriesMenu {
  categoryOptions: SelectorsType[]
}

export default function CategoriesMenu({ categoryOptions }: ICategoriesMenu) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentCategory = searchParams.get("category") || ""

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value === "all") {
      params.delete("category")
    } else {
      params.set("category", value)
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className=" w-64 rounded-md">
      <h2 className="text-lg font-medium mb-4">Categories</h2>
      <Select value={currentCategory || "all"} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">View all categories</SelectItem>
            {categoryOptions.map((cat) => (
              <SelectItem key={cat.value} value={cat.label}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
