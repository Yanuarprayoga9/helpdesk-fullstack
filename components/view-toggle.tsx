"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { AlignJustify, LayoutGrid, Check } from "lucide-react"

type ViewMode = "list" | "grid"

export default function ViewToggle({ defaultView = "grid" }: { defaultView?: ViewMode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize view from URL or default
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const urlView = searchParams.get("view") as ViewMode
    return urlView === "list" || urlView === "grid" ? urlView : defaultView
  })

  // Update URL when view changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("view", viewMode)
    router.push(`?${params.toString()}`, { scroll: false })
  }, [viewMode, router, searchParams])

  return (
    <div className="inline-flex items-center rounded-full border border-border p-0.5 shadow-sm">
      <button
        onClick={() => setViewMode("list")}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-l-full transition-colors",
          viewMode === "list" ? "bg-background" : "bg-transparent hover:bg-muted/50",
        )}
        aria-label="List view"
      >
        <AlignJustify className="h-4 w-4" />
      </button>
      <button
        onClick={() => setViewMode("grid")}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-r-full transition-colors",
          viewMode === "grid" ? "bg-primary/10" : "bg-transparent hover:bg-muted/50",
        )}
        aria-label="Grid view"
      >
        <div className="relative">
          <LayoutGrid className="h-4 w-4" />
          {viewMode === "grid" && <Check className="absolute -bottom-1 -right-1 h-3 w-3 text-primary" />}
        </div>
      </button>
    </div>
  )
}
