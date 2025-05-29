"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"

export default function AssignToMeToggle() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const paramValue = searchParams.get("assigntome")
    setEnabled(paramValue === "true")
  }, [searchParams])

  const handleToggle = (value: boolean) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("assigntome", "true")
    } else {
      params.delete("assigntome")
    }
    router.push(`?${params.toString()}`)
    setEnabled(value)
  }

  return (
    <div className="flex items-center space-x-2 ">
      <Switch id="assigntome" checked={enabled} onCheckedChange={handleToggle} />
      <Label htmlFor="assigntome">Show  Tickets Assign To Me Only</Label>
    </div>
  )
}
