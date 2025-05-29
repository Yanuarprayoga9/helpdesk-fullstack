"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"

export default function MyTicketToggle() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const paramValue = searchParams.get("myticket")
    setEnabled(paramValue === "true")
  }, [searchParams])

  const handleToggle = (value: boolean) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("myticket", "true")
    } else {
      params.delete("myticket")
    }
    router.push(`?${params.toString()}`)
    setEnabled(value)
  }

  return (
    <div className="flex items-center space-x-2 ">
      <Switch id="my-ticket" checked={enabled} onCheckedChange={handleToggle} />
      <Label htmlFor="my-ticket">Show My Tickets Only</Label>
    </div>
  )
}
