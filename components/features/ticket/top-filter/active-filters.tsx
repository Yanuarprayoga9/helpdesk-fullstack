"use client"

import { Badge } from "@/components/ui/badge"
import { useSearchParams, useRouter } from "next/navigation"
import { X } from "lucide-react"

export function ActiveFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const entries = Array.from(searchParams.entries()).filter(([_, value]) => !!value)

  const handleRemove = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    router.push(`?${params.toString()}`)
  }

  if (entries.length === 0) return null

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {entries.map(([key, value]) => (
        <Badge
          key={key}
          variant="secondary"
          className="rounded-full cursor-pointer group"
          onClick={() => handleRemove(key)}
        >
          {key}: {value}
          <X className="ml-2 h-3 w-3 group-hover:text-red-500" />
        </Badge>
      ))}
    </div>
  )
}
