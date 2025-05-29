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

export default function StatusMenu() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentStatus = searchParams.get("status") || ""

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value === "all") {
      params.delete("status")
    } else {
      params.set("status", value)
    }

    router.push(`?${params.toString()}`)
  }

  const statusOptions = [
    { value: "New", label: "New" },
    { value: "InProgress", label: "In Progress" },
    { value: "Resolved", label: "Resolved" },
    { value: "Reopened", label: "Reopened" },
    { value: "Closed", label: "Closed" },
    { value: "OnHold", label: "On Hold" },
    { value: "requestHelp", label: "Request Help" },
  ]

  return (
    <div className=" w-64 rounded-md">
      <h2 className="text-lg font-medium mb-4">Status</h2>
      <Select value={currentStatus || "all"} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">View all status</SelectItem>
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
