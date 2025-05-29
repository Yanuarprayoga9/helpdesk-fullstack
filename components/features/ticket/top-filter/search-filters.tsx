"use client"

import type React from "react"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"





export function SearchFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "")
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




  return (
    <>
      <form onSubmit={handleSearch} className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tickets..."
          className="pl-9 bg-background w-full"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
    </>
  )
}
