"use client"
/* eslint-disable react/no-unescaped-entities */

import { ThumbsUp, MessageSquare, MoreHorizontal, Edit2, Award, Bell, Circle, AlertCircle } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { JSX, SVGProps } from "react"
import Image from "next/image"
import { Container } from "@/components/container"
import { TicketDetailHeader } from "@/components/ticket-detail/header"

export default function GitHubDiscussion() {

  const latestChanges = [
    {
      text: "Azure DevOps pipeline failing during package restore",
      status: "error",
    },
    {
      text: "Added retry mechanism for failed builds",
      status: "success",
    },
    {
      text: "Updated service connection configuration",
      status: "info",
    },
  ]

  return (
    <Container
      className="flex flex-col items-center space-y-4 justify-center">
      {/* Main content */}
      <div className="  pb-24 lg:pb-0">
        <div className=" max-w-4xl px-4 py-6 ">
          {/* Discussion header */} 
         <TicketDetailHeader 
         category="Infrastructure" 
         createdBy="DevOpsEngineer" 
         title="Azure DevOps Pipeline Failures"
         id="#111"
         createdAt={new Date("2025-04-27T11:00:00Z")}
         />

          {/* Original post with image */}
          <div className="mb-6 rounded-md border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 rounded-full bg-primary">
                  <span className="text-xs text-primary-foreground">D</span>
                </Avatar>
                <span className="font-medium">DevOpsEngineer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">edited</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-4 max-w-full break-words">
                There is a recurring issue with our Azure DevOps pipelines failing during the build stage. This happens
                most frequently with our .NET Core projects when they try to restore packages from our private NuGet
                feed. Occasionally I see errors like "TF400813: Resource not available" or "The pipeline has been
                abandoned."
              </p>

              {/* Added image */}
              <div className="mb-4 overflow-hidden rounded-md border border-border">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Azure DevOps Pipeline Error Screenshot"
                  className="w-full"
                  width={800}
                  height={400}
                />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border p-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8">
                  <ThumbsUp className="mr-1 h-4 w-4" />1
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Comment info */}
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">3 comments · 5 replies</div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-border bg-secondary text-foreground hover:bg-secondary/80"
              >
                Oldest
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-border bg-secondary text-foreground hover:bg-secondary/80"
              >
                Newest
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-border bg-secondary text-foreground hover:bg-secondary/80"
              >
                Top
              </Button>
            </div>
          </div>

          {/* Comment 1 */}
          <div className="mb-6 rounded-md border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 rounded-full bg-primary">
                  <span className="text-xs text-primary-foreground">A</span>
                </Avatar>
                <span className="font-medium">AzureExpert</span>
                <Badge variant="outline" className="border-border text-xs">
                  Maintainer
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-4 max-w-full break-words">
                These Azure DevOps pipeline failures are often related to authentication or network connectivity issues.
              </p>
              <p className="mb-4 max-w-full break-words">
                You need to use the service connection properly if you want to access private feeds consistently. That's
                exactly how other teams in our organization handle it, they authenticate using a service principal with
                the correct permissions to access the feed.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-border p-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8">
                  <ThumbsUp className="mr-1 h-4 w-4" />3
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">2 replies</div>
            </div>
          </div>

          {/* Comment 2 */}
          <div className="mb-6 rounded-md border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 rounded-full bg-primary">
                  <span className="text-xs text-primary-foreground">D</span>
                </Avatar>
                <span className="font-medium">DevOpsEngineer</span>
                <Badge variant="outline" className="border-border text-xs">
                  Author
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">edited</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-4 max-w-full break-words">
                I don't think that's true. For example, I created a new pipeline that uses the official Microsoft-hosted
                agents, and it still failed with the same error. Our service connection is properly configured with the
                right permissions. Could there be some intermittent network issues where pings above what you can do
                will result in error? That should be indication that the infrastructure is at scale.
              </p>
              <p className="mb-4 max-w-full break-words">
                I did just end up adding a retry mechanism after initial pipeline failure, but some people reporting
                still running out of errors while able to use the same mechanism on rebuild.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-border p-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8">
                  <ThumbsUp className="mr-1 h-4 w-4" />0
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Comment 3 */}
          <div className="mb-6 rounded-md border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 rounded-full bg-primary">
                  <span className="text-xs text-primary-foreground">A</span>
                </Avatar>
                <span className="font-medium">AzureExpert</span>
                <Badge variant="outline" className="border-border text-xs">
                  Maintainer
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-4 max-w-full break-words">
                If you look at the #111 issue code you see this is the function call used to authenticate with the feed:
              </p>
              <p className="mb-4 text-blue-500 break-all">
                https://dev.azure.com/company/project/_git/repo?path=/azure-pipelines.yml
              </p>
              <p className="mb-4 max-w-full break-words">
                You'll notice there's no explicit retry logic in the NuGet restore task.
              </p>
              <p className="mb-4 max-w-full break-words">
                Instead there's this right after:
                https://dev.azure.com/company/project/_git/repo?path=/scripts/retry-nuget.ps1
              </p>
              <p className="mb-4 max-w-full break-words">
                This means it operates with the default retry policy and then scales afterwards to the exact
                configuration you need.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-border p-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8">
                  <ThumbsUp className="mr-1 h-4 w-4" />2
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Comment 4 */}
          <div className="mb-6 rounded-md border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 rounded-full bg-primary">
                  <span className="text-xs text-primary-foreground">D</span>
                </Avatar>
                <span className="font-medium">DevOpsEngineer</span>
                <Badge variant="outline" className="border-border text-xs">
                  Author
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">edited</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-4 max-w-full break-words">
                Hi @AzureExpert, I just checked our YAML usage. You're right, we are able to use retries in many other
                situations though. I'm sure it can be done.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-border p-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8">
                  <ThumbsUp className="mr-1 h-4 w-4" />0
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Comment 5 */}
          <div className="mb-6 rounded-md border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 rounded-full bg-primary">
                  <span className="text-xs text-primary-foreground">A</span>
                </Avatar>
                <span className="font-medium">AzureExpert</span>
                <Badge variant="outline" className="border-border text-xs">
                  Maintainer
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-4 max-w-full break-words">
                It's probably running out of memory in the VM/Container node. If you switch to the M2 agent pool the
                problem will likely go away.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-border p-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8">
                  <ThumbsUp className="mr-1 h-4 w-4" />1
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Reply box */}
          <div className="rounded-md border border-border bg-background p-4">
            <div className="mb-2 text-sm">Write a reply</div>
            <div className="rounded-md border border-border bg-background p-2">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8">
                    Write
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    Preview
                  </Button>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <textarea
                className="mt-2 h-24 w-full resize-none bg-background p-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
                placeholder="Write a comment"
              ></textarea>
              <div className="mt-2 flex justify-between">
                <div className="text-xs text-muted-foreground">
                  Attach files by dragging & dropping, selecting or pasting them.
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Comment</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background p-4 px-2 sm:px-4 lg:hidden">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
          <div className="space-y-2">
            <h3 className="text-xs font-medium uppercase text-muted-foreground">Category</h3>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary"></div>
              <span className="text-sm">Infrastructure</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-medium uppercase text-muted-foreground">Assignees</h3>
            <div className="flex flex-wrap gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
              </Avatar>
            </div>
          </div>

          <div className="space-y-2 min-w-0">
            <h3 className="text-xs font-medium uppercase text-muted-foreground truncate">Latest</h3>
            <div className="flex items-start gap-2 min-w-0">
              <AlertCircle className="mt-1 h-4 w-4 shrink-0 text-destructive" />
              <span className="text-sm text-muted-foreground truncate">Pipeline failing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar with theme variables */}
      <div className="hidden w-80 shrink-0 p-4 pt-16 lg:block">
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Category</h3>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-primary"></div>
            <span className="text-sm">Infrastructure</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Labels</h3>
          <div className="text-sm text-muted-foreground">None yet</div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Assignees</h3>
          <div className="flex flex-wrap gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
            </Avatar>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
              <Plus className="mr-2 h-4 w-4" />
              Add assignee
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">2 Reactions</h3>
          <div className="flex gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
              <ThumbsUp className="h-4 w-4" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
              <Award className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Notifications</h3>
          <Button className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
            <Bell className="mr-2 h-4 w-4" />
            Request Contributions
          </Button>
          <div className="mt-2 text-xs text-muted-foreground">You're not receiving notifications from this thread</div>
        </div>

        {/* Latest Changes Section */}
        <div className="mb-6">
          <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Latest changes</h3>
          <div className="space-y-2">
            {latestChanges.map((change, index) => (
              <div key={index} className="flex items-start gap-2">
                {change.status === "error" && <AlertCircle className="mt-1 h-4 w-4 text-destructive" />}
                {change.status === "success" && <Circle className="mt-1 h-4 w-4 text-primary" />}
                {change.status === "info" && <Circle className="mt-1 h-4 w-4 text-blue-500" />}
                <span className="text-sm text-muted-foreground">{change.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Button variant="outline" className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            Create issue from discussion
          </Button>
        </div>
      </div>
    </Container>
  )
}

// Icon components remain the same
function Plus(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

