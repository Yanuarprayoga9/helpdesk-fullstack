import { ProjectType } from "@/@types/project"
import { ProjectCard } from "./project-card"



interface ProjectListProps {
    projects?: ProjectType[]
}

export function ProjectList({ projects }: ProjectListProps) {


    return (
        <div className="container py-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects && projects?.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-muted-foreground">No projects available</div>
                )}
            </div>
        </div>
    )
}

