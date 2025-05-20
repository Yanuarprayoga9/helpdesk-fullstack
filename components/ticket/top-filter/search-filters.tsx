import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { TICKETS_ROUTE } from "@/constants/routes"

function ActiveFilters() {
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

export function SearchFilters() {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search tickets..." className="pl-9 bg-background w-full" defaultValue="icopen" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none">
                Sort by: Newest
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
              <DropdownMenuItem>Priority</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none">
                Label
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>High Risk</DropdownMenuItem>
              <DropdownMenuItem>Medium Risk</DropdownMenuItem>
              <DropdownMenuItem>Low Risk</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={`${TICKETS_ROUTE}/create`}>
            <Button variant="outline" className="bg-green-500 flex-1 sm:flex-none">
              New Discussion
            </Button>
          </Link>
        </div>
      </div>
      <ActiveFilters />
    </div>
  )
}

