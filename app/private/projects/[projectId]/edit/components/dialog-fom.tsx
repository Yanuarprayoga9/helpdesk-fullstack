// Alternative: Edit form in a dialog/modal
"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { EditProjectForm } from "./project-form"
import { Pen } from "lucide-react"


type ProjectEditDialogProps = {
  projectId:string
}
export function ProjectEditDialog({projectId}:ProjectEditDialogProps) {
  const [open, setOpen] = useState(false)

  // const handleSuccess = () => {
  //   setOpen(false)
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pen className="w-4 h-4" />

      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <EditProjectForm projectId={projectId as string} />
      </DialogContent>
    </Dialog>
  )
}
