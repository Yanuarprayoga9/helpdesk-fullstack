import { Separator } from "@/components/ui/separator"

export function TicketHeader() {
  return (
    <div className="space-y-2">
      <h1 className="text-xl md:text-2xl font-semibold">Tickets</h1>
      <p className="text-sm md:text-base text-muted-foreground">
        Start a codebase from a template and get to developing with the power of a virtual machine in the cloud.
      </p>
      <Separator className="my-4 max-w-screen" />
    </div>
  )
}

