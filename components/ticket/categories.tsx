import { Monitor, PenToolIcon as Tool, MessageSquare, MapPin } from "lucide-react"

export default function CategoriesMenu() {
  return (
    <div className="p-4 w-64 rounded-md">
      <h2 className="text-lg font-medium mb-4">Categories</h2>
      <nav className="space-y-2">
        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-zinc-800">
          <Monitor className="w-5 h-5" />
          <span>View all categories</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-zinc-800">
          <Tool className="w-5 h-5" />
          <span>Infrastructure</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-zinc-800">
          <MessageSquare className="w-5 h-5" />
          <span>Bug Sistem</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-zinc-800">
          <MapPin className="w-5 h-5" />
          <span>Gangguan Infrastruktur</span>
        </a>
      </nav>
    </div>
  )
}

