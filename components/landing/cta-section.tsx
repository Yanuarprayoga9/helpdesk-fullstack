import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MessageSquare, ExternalLink } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <Card className="mx-auto max-w-4xl">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Organize Your Team Communication?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stop losing time on scattered chat messages and repeated problem solving. Start organizing your teams
              requests and improve collaboration today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <MessageSquare className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <ExternalLink className="mr-2 h-5 w-5" />
                See Examples
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <div className="font-semibold text-2xl text-foreground">No More</div>
                <div>Scattered Chat Messages</div>
              </div>
              <div>
                <div className="font-semibold text-2xl text-foreground">Better</div>
                <div>Team Coordination</div>
              </div>
              <div>
                <div className="font-semibold text-2xl text-foreground">Faster</div>
                <div>Problem Resolution</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
