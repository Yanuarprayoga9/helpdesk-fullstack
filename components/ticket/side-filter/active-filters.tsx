import { Badge } from "@/components/ui/badge"

export function ActiveFilters() {
  return (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="secondary" className="rounded-full">
        Infrastructure
      </Badge>
      <Badge variant="secondary" className="rounded-full">
        High Risk
      </Badge>
      <Badge variant="secondary" className="rounded-full">
        In Progress
      </Badge>
    </div>
  )
}

