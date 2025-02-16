import { Input } from "@/components/ui/input"

export function SearchComponent() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className=" overflow-none"
      />
    </div>
  )
}