"use client"

import { ProjectList } from "@/components/project/project-list"
import { DataTable } from "@/components/data-table"
import { columns } from "@/app/private/console/projects/components/columns"
import ViewToggle from "@/components/view-toggle"
import { useSearchParams } from "next/navigation"
import { ProjectType } from "@/@types/project"
import { ConsoleWrapper } from "@/components/layouts/console-wrapper"

interface ProjectDisplayProps {
  projects: ProjectType[]
}

export const ProjectDisplay = ({ projects }: ProjectDisplayProps) => {
  const searchParams = useSearchParams()
  const view = searchParams.get("view")
  const viewMode = view === "list" ? "list" : "grid"

  return (
    <ConsoleWrapper
      title="Project List"
      desc="List of your projects"
      className="w-full lg:w-8/12"      headerChildren={<ViewToggle defaultView={viewMode} />}
    >
      {viewMode === "grid" ? (
        <ProjectList projects={projects} />
      ) : (
        <DataTable searchKey="id" columns={columns} data={projects} />
      )}
    </ConsoleWrapper>
  )
}
