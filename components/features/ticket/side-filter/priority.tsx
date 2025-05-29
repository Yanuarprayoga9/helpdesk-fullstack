"use client"

import { useSearchParams, useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PriotityMenu() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPriotity = searchParams.get("priority") || ""

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value === "all") {
      params.delete("priority")
    } else {
      params.set("priority", value)
    }

    router.push(`?${params.toString()}`)
  }

  const statusOptions = [
    { value: "Critical", label: "Critical" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
    
  ]

  return (
    <div className=" w-64 rounded-md">
      <h2 className="text-lg font-medium mb-4">Priority</h2>
      <Select value={currentPriotity || "all"} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">View all priotity</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
