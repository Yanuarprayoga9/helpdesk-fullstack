"use client"

import { createTicket, editTicket } from '@/actions/ticket'
import { ImageUpload } from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import MultipleSelector from '@/components/ui/multiple-selector'
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { TICKETS_ROUTE } from '@/constants/routes'
import { ticketSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

type SelectorsType = { label: string, value: string }

interface TicketFormProps {
  userOptions: SelectorsType[]
  categoryOptions: SelectorsType[]
  priorityOptions: SelectorsType[]
  statusOptions: SelectorsType[]
  projectOptions: SelectorsType[]
  initialData?: z.infer<typeof ticketSchema> & { id: string }
}

export const ProjectForm  = ({
  userOptions, categoryOptions, priorityOptions,
  projectOptions, initialData
}: TicketFormProps) => {
  const isEdit = !!initialData
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: initialData ?? {
      title: "",
      category: "",
      description: "",
      images: [],
      assignees: [],
      priority: "",
      // status: "",
      project: "",
    },
  })

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    setLoading(true)
    let response
    if (isEdit && initialData?.id) {
      response = await editTicket(initialData.id, values)
    } else {
      response = await createTicket(values)
    }

    setLoading(false)

    if (!response.success) {
      toast.error(response.message || "Action failed")
    } else {
      toast.success(isEdit ? "Ticket updated!" : "Ticket created!")
      form.reset()
      if (isEdit) {
        router.push(`${TICKETS_ROUTE}/${initialData?.id}/detail`)
        router.refresh()  // <= ini untuk force server re-fetch kalau caching diaktifin
      } else {
        router.push(`${TICKETS_ROUTE}`)
        router.refresh()
      }
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ticket name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categoryOptions.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {priorityOptions.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} disabled={true} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {statusOptions.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {projectOptions.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                      value={field.value.map(img => img.url)}
                      disabled={loading}
                      onChange={(url) => field.onChange([...field.value, { url }])}
                      onRemove={(url) => field.onChange(field.value.filter(img => img.url !== url))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignees</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={userOptions.filter(opt => field.value.includes(opt.value))}
                      onChange={(selected) => form.setValue("assignees", selected.map(opt => opt.value))}
                      defaultOptions={userOptions}
                      placeholder="Select users..."
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
          </div>

          <Button type="submit" className="bg-main-green text-white" disabled={loading}>
            {loading ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Ticket" : "Create Ticket")}
          </Button>
        </form>
      </Form>
    </div>
  )
}
