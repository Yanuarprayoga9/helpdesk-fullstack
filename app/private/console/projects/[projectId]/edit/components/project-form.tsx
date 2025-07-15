"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ImageUpload } from "@/components/image-upload"
import MultipleSelector from "@/components/ui/multiple-selector"
import { updateProjectById } from "@/actions/project"
import toast from "react-hot-toast"

export const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  images: z.object({ url: z.string() }).array(),
  userIds: z.array(z.string().optional()), // Bisa kosong
})

type SelectorsType = {
  label: string
  value: string
}

interface ProjectData {
  id: string
  name: string
  imageUrl?: string | null
  ProjectUser?: Array<{
    userId: string
    user: {
      id: string
      name: string
    }
  }>
}

interface EditProjectFormProps {
  project: ProjectData
  userMapped?: SelectorsType[]
}

export function EditProjectForm({ project, userMapped }: EditProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Prepare initial values from project data
  const initialImages = project.imageUrl ? [{ url: project.imageUrl }] : []
  const initialUserIds = project.ProjectUser?.map((pu) => pu.userId) || []

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      images: initialImages,
      userIds: initialUserIds,
    },
  })

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    setLoading(true)

    const response = await updateProjectById(project.id, {
      name: values.name,
      imageUrl: values.images[0]?.url || null,
      userIds: values.userIds?.map(String) || [],
    })

    setLoading(false)
    if (!response.success) {
      toast.error(response.message || "Update failed", { id: "EditProject" })
    } else {
      toast.success("Project updated successfully!")
      router.refresh()
      // Optionally redirect to project detail page
      // router.push(`/projects/${project.id}`);
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange(field.value.filter((img) => img.url !== url))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Users</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={userMapped?.filter((opt) => field.value?.includes(opt.value))}
                    onChange={(selected) => {
                      form.setValue(
                        "userIds",
                        selected.map((opt) => opt.value),
                      )
                    }}
                    defaultOptions={userMapped}
                    placeholder="Select users to assign..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        No results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button type="submit" className="bg-main-green text-white" disabled={loading}>
              {loading ? "Updating..." : "Update Project"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
