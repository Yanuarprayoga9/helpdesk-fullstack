import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, Shield, Users, Wrench, Code } from "lucide-react"

const roles = [
  {
    name: "Project Manager",
    icon: Shield,
    description: "Oversee projects and team coordination",
    color: "text-blue-500",
    permissions: {
      "View All Tickets": true,
      "Assign Team Members": true,
      "Set Priorities": true,
      "Generate Reports": true,
      "Manage Projects": true,
      "User Management": true,
    },
  },
  {
    name: "Team Lead",
    icon: Users,
    description: "Lead development teams and review work",
    color: "text-green-500",
    permissions: {
      "View All Tickets": true,
      "Assign Team Members": true,
      "Set Priorities": true,
      "Generate Reports": false,
      "Manage Projects": false,
      "User Management": false,
    },
  },
  {
    name: "DevOps Engineer",
    icon: Wrench,
    description: "Handle infrastructure and deployment issues",
    color: "text-orange-500",
    permissions: {
      "View All Tickets": false,
      "Assign Team Members": false,
      "Set Priorities": false,
      "Generate Reports": false,
      "Manage Projects": false,
      "User Management": false,
    },
  },
  {
    name: "Developer",
    icon: Code,
    description: "Create requests and work on assigned tasks",
    color: "text-purple-500",
    permissions: {
      "View All Tickets": false,
      "Assign Team Members": false,
      "Set Priorities": false,
      "Generate Reports": false,
      "Manage Projects": false,
      "User Management": false,
    },
  },
]

export function RoleBasedAccess() {
  return (
    <section id="roles" className="py-16 md:py-24">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Team Roles
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Designed for Your Team Structure</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Different access levels for different team members, just like in your organization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {roles.map((role, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-2">
                  <role.icon className={`h-8 w-8 ${role.color}`} />
                </div>
                <CardTitle>{role.name}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(role.permissions).map(([permission, hasAccess]) => (
                    <div key={permission} className="flex items-center justify-between text-sm">
                      <span className="text-left">{permission}</span>
                      {hasAccess ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Perfect for IT Consulting Teams</CardTitle>
              <CardDescription className="text-center">
                Designed specifically for companies like PT Tristar Surya Gemilang with 100+ developers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Developers Supported</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">Multiple</div>
                  <div className="text-sm text-muted-foreground">Projects Managed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">Organized</div>
                  <div className="text-sm text-muted-foreground">Team Communication</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
