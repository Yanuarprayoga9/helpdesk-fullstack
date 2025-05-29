import { Ticket } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Ticket className="h-5 w-5 text-primary" />
            <span className="font-semibold">Helpdesk Ticketing System</span>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <span>Built with Next.js, TypeScript & shadcn/ui</span>
            <span>© 2024 All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
