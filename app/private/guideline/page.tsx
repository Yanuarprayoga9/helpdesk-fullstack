import { LanguageToggle } from "./components/language-toggle";
import TicketReference from "./components/ticket-reference";

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Ticket Management System</h1>
          <p className="text-muted-foreground">Reference guide for ticket statuses, priorities, and categories</p>
        </div>
        <LanguageToggle />
      </div>
      <TicketReference />
    </main>
  )
}
