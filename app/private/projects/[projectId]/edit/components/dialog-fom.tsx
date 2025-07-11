// Alternative: Edit form in a dialog/modal
"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { EditProjectForm } from "./project-form"
import { ProjectType } from "@/@types/project"

interface ProjectEditDialogProps {
  project: ProjectType // Use your ProjectData type
  userMapped?: Array<{ label: string; value: string }>
  trigger?: React.ReactNode
}

export function ProjectEditDialog({ project, userMapped, trigger }: ProjectEditDialogProps) {
  const [open, setOpen] = useState(false)

  // const handleSuccess = () => {
  //   setOpen(false)
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <EditProjectForm project={project} userMapped={userMapped} />
      </DialogContent>
    </Dialog>
  )
}
