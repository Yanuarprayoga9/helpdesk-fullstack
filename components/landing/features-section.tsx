import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquareText, FileText, Users, Search, Settings, FolderOpen, Shield } from "lucide-react"

const features = [
  {
    icon: MessageSquareText,
    title: "Organized Request System",
    description: "Replace scattered chat messages with structured ticket requests",
    items: ["Create detailed requests", "Track progress status", "Assign team members", "Set priority levels"],
  },
  {
    icon: FileText,
    title: "Complete Documentation",
    description: "Keep track of all problems and solutions in one place",
    items: ["Problem history", "Solution records", "Team discussions", "File attachments"],
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Enable better communication between developers and DevOps",
    items: ["Team assignments", "Progress updates", "Knowledge sharing", "Collaborative problem solving"],
  },
  {
    icon: Search,
    title: "Easy Problem Tracking",
    description: "Find previous solutions and avoid solving the same problems repeatedly",
    items: ["Search past tickets", "Filter by category", "Quick access to solutions", "Problem patterns"],
  },
  {
    icon: Settings,
    title: "Priority Management",
    description: "Ensure critical issues get attention first",
    items: ["Priority levels", "Urgent notifications", "Deadline tracking", "Workload balance"],
  },
  {
    icon: FolderOpen,
    title: "Project Organization",
    description: "Group requests by projects for better management",
    items: ["Project categorization", "Team assignments", "Progress monitoring", "Resource allocation"],
  },
  {
    icon: Shield,
    title: "Access Control",
    description: "Different access levels for different team roles",
    items: ["Role-based access", "Secure information", "Team permissions", "Admin controls"],
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Key Benefits
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Solve Your Teams Communication Challenges</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Address the common problems faced by growing IT consulting teams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2 text-sm">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
