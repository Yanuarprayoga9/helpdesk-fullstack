"use client"

import { useSearchParams, useRouter } from "next/navigation"
import type { SelectorsType } from "@/lib/utils"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface IProjectsMenu {
  projectOptions: SelectorsType[]
}

export default function ProjectsMenu({ projectOptions }: IProjectsMenu) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentProject = searchParams.get("projectId") || ""

  const handleProjectChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value === "all") {
      params.delete("projectId")
    } else {
      params.set("projectId", value)
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className=" w-64 rounded-md">
      <h2 className="text-lg font-medium mb-4">Projects</h2>
      <Select value={currentProject || "all"} onValueChange={handleProjectChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">View all projects</SelectItem>
            {projectOptions.map((project) => (
              <SelectItem key={project.value} value={project.value}>
                {project.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}