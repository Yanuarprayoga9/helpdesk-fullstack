"use client"

import { useEffect, useState } from "react"
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
import { getProjectById, getUsersByProjectId } from "@/@data/project"
import { getUsers } from "@/@data/users"
import { mapAndSort } from "@/lib/utils"

export const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  images: z.object({ url: z.string() }).array(),
  userIds: z.array(z.string()), // Bisa kosong
})

type EditProjectFormProps = {
  projectId: string
}

type SelectorsType = {
  label: string
  value: string
}

export function EditProjectForm({ projectId }: EditProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const router = useRouter()

  // Gabungkan semua user options dalam satu state
  const [allUserOptions, setAllUserOptions] = useState<SelectorsType[]>([])
  const [_, setAssignedUserIds] = useState<string[]>([])

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      images: [],
      userIds: [],
    },
  })

  useEffect(() => {
    const fetchProject = async (id: string) => {
      try {
        setLoading(true)

        // Fetch semua data yang diperlukan
        const [res, projectUserRes, allUsers] = await Promise.all([
          getProjectById(id),
          getUsersByProjectId(id),
          getUsers()
        ])

        if (res.project && allUsers.users) {
          // User ID yang sudah terdaftar pada project
          const currentAssignedUserIds = projectUserRes.users?.map(user => user.id) || []

          // Mapping semua user untuk options
          const allUserOptions = mapAndSort(
            allUsers.users,
            user => user.name,
            user => user.id
          )

          // Set state
          setAllUserOptions(allUserOptions)
          setAssignedUserIds(currentAssignedUserIds)

          // Reset form dengan data yang tepat
          const formData = {
            name: res.project.name,
            images: res.project.imageUrl ? [{ url: res.project.imageUrl }] : [],
            userIds: currentAssignedUserIds
          }

          form.reset(formData)
          setDataLoaded(true)
        }
      } catch (error) {
        console.error("Error fetching project data:", error)
        toast.error("Failed to load project data")
      } finally {
        setLoading(false)
      }
    }

    fetchProject(projectId)
  }, [projectId, form])

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    setLoading(true)

    try {
      const response = await updateProjectById(projectId, {
        name: values.name,
        imageUrl: values.images[0]?.url || null,
        userIds: values.userIds?.filter(Boolean) || [], // Filter out undefined values
      })

      if (!response.success) {
        toast.error(response.message || "Update failed", { id: "EditProject" })
      } else {
        toast.success("Project updated successfully!")
        router.refresh()
        // Optionally redirect to project detail page
        // router.push(`/projects/${projectId}`)
      }
    } catch (error) {
      console.error("Error updating project:", error)
      toast.error("An error occurred while updating the project")
    } finally {
      setLoading(false)
    }
  }

  // Jangan render form sampai data dimuat
  if (!dataLoaded) {
    return <div>Loading...</div>
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
                    value={allUserOptions.filter((opt) => field.value?.includes(opt.value))}
                    onChange={(selected) => {
                      form.setValue(
                        "userIds",
                        selected.map((opt) => opt.value)
                      )
                    }}
                    defaultOptions={allUserOptions} // Gunakan semua user sebagai options
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

          <div className="flex -2">
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