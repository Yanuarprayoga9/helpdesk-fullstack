"use client"

import type React from "react"

import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { TICKETS_ROUTE } from "@/constants/routes"

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "priority", label: "Priority" },
]

const LABEL_OPTIONS = [
  { value: "high-risk", label: "High Risk" },
  { value: "medium-risk", label: "Medium Risk" },
  { value: "low-risk", label: "Low Risk" },
]

function ActiveFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const activeLabels = searchParams.get("labels")?.split(",").filter(Boolean) || []
  const searchQuery = searchParams.get("search") || ""

  const removeFilter = useCallback(
    (type: "label" | "search", value?: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (type === "search") {
        params.delete("search")
      } else if (type === "label" && value) {
        const currentLabels = params.get("labels")?.split(",").filter(Boolean) || []
        const updatedLabels = currentLabels.filter((label) => label !== value)

        if (updatedLabels.length > 0) {
          params.set("labels", updatedLabels.join(","))
        } else {
          params.delete("labels")
        }
      }

      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, router, pathname],
  )

  const hasActiveFilters = activeLabels.length > 0 || searchQuery

  if (!hasActiveFilters) return null

  return (
    <div className="flex gap-2 flex-wrap">
      {searchQuery && (
        <Badge variant="secondary" className="rounded-full">
          Search: {searchQuery}
          <button
            onClick={() => removeFilter("search")}
            className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {activeLabels.map((label) => {
        const labelOption = LABEL_OPTIONS.find((opt) => opt.value === label)
        return (
          <Badge key={label} variant="secondary" className="rounded-full">
            {labelOption?.label || label}
            <button
              onClick={() => removeFilter("label", label)}
              className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )
      })}
    </div>
  )
}

export function SearchFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "")

  const currentSort = searchParams.get("sort") || "newest"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentLabels = searchParams.get("labels")?.split(",").filter(Boolean) || []

  // Update search value when URL changes
  useEffect(() => {
    setSearchValue(searchParams.get("search") || "")
  }, [searchParams])

  const updateSearchParams = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }

      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, router, pathname],
  )

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      updateSearchParams("search", searchValue || null)
    },
    [searchValue, updateSearchParams],
  )

  const handleSortChange = useCallback(
    (sortValue: string) => {
      updateSearchParams("sort", sortValue)
    },
    [updateSearchParams],
  )

  const handleLabelToggle = useCallback(
    (labelValue: string) => {
      const isSelected = currentLabels.includes(labelValue)
      let newLabels: string[]

      if (isSelected) {
        newLabels = currentLabels.filter((label) => label !== labelValue)
      } else {
        newLabels = [...currentLabels, labelValue]
      }

      updateSearchParams("labels", newLabels.length > 0 ? newLabels.join(",") : null)
    },
    [currentLabels, updateSearchParams],
  )

  const currentSortLabel = SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label || "Newest"

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            className="pl-9 bg-background w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>

        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none">
                Sort by: {currentSortLabel}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={currentSort === option.value ? "bg-accent" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none">
                Label {currentLabels.length > 0 && `(${currentLabels.length})`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LABEL_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleLabelToggle(option.value)}
                  className={currentLabels.includes(option.value) ? "bg-accent" : ""}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        currentLabels.includes(option.value)
                          ? "bg-primary"
                          : "bg-transparent border border-muted-foreground"
                      }`}
                    />
                    {option.label}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={`${TICKETS_ROUTE}/create`}>
            <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white flex-1 sm:flex-none">
              New Discussion
            </Button>
          </Link>
        </div>
      </div>

      <ActiveFilters />
    </div>
  )
}
