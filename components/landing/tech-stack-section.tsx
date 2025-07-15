import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Target, Users, TrendingUp } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Reduce time spent on repetitive problem solving",
    items: [
      "No more solving the same issues repeatedly",
      "Quick access to previous solutions",
      "Faster problem resolution",
      "Less time spent in meetings",
    ],
  },
  {
    icon: Target,
    title: "Better Focus",
    description: "Prioritize critical issues effectively",
    items: [
      "Clear priority system",
      "Critical issues get attention first",
      "Reduced stress for team members",
    ],
  },
  {
    icon: Users,
    title: "Improved Collaboration",
    description: "Better communication between teams",
    items: [
      "Structured communication",
      "Clear responsibility assignment",
      "Knowledge sharing",
      "Reduced dependency on individuals",
    ],
  },
  {
    icon: TrendingUp,
    title: "Scalable Growth",
    description: "Support your growing team effectively",
    items: [
      "Onboard new team members easily",
      "Support multiple projects",
    ],
  },
]

export function TechStackSection() {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Why Choose Our Solution
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for Growing IT Teams</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Address the real challenges faced by IT consulting companies with large development teams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <benefit.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {benefit.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-2 text-sm">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
