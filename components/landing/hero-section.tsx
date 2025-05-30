
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Users, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container px-4 py-24 md:py-32 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            🎯 PT Tristar Surya Gemilang
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Transform Your
            <span className="text-primary"> Team Communication</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            From manual chat requests to organized ticket management. Help your development and DevOps teams collaborate
            more efficiently with structured problem tracking and resolution.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Start Organizing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              See How It Works
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Centralized Requests</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Better Team Coordination</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span>Faster Problem Resolution</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
