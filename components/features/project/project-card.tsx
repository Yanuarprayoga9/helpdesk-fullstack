import Image from "next/image"
import { format } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectType } from "@/@types/project"
import Link from "next/link"
import { CONSOLE_PROJECTS_ROUTE } from "@/constants/routes"



interface ProjectCardProps {
  project: ProjectType
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card 
         className="w-[350px] md:w-full "
    >
      {project.imageUrl ? (
        <div className="relative h-40 w-full">
          <Image src={project.imageUrl} alt={project.name} unoptimized fill className="object-cover" />
        </div>
      ) : (
        <div className="h-40 w-full bg-muted flex items-center justify-center">
          <span className="text-muted-foreground">No image available</span>
        </div>
      )}
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">Created: {format(project.createdAt, "MMM d, yyyy")}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Link href={`${CONSOLE_PROJECTS_ROUTE}/${project.id}`} >
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}

