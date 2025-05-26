"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { SelectorsType } from "@/lib/utils"
import { Monitor, PenToolIcon as Tool } from "lucide-react"

interface ICategoriesMenu {
  categoryOptions: SelectorsType[]
}

export default function CategoriesMenu({ categoryOptions }: ICategoriesMenu) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleCategoryClick = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("category", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="p-4 w-64 rounded-md">
      <h2 className="text-lg font-medium mb-4">Categories</h2>
      <nav className="space-y-2">
        <button
          onClick={() => router.push("?")}
          className="flex w-full items-center gap-3 px-2 py-2 rounded hover:bg-zinc-800"
        >
          <Monitor className="w-5 h-5" />
          <span>View all categories</span>
        </button>

        {categoryOptions.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryClick(cat.value)}
            className="flex w-full items-center gap-3 px-2 py-2 rounded hover:bg-zinc-800"
          >
            <Tool className="w-5 h-5" />
            <span>{cat.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
