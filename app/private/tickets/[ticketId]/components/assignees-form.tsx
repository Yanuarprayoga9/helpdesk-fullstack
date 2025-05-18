"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addAssigneesSchema } from "@/schemas";
import MultipleSelector from "@/components/ui/multiple-selector";
import { SelectorsType } from "@/lib/utils";
import { Modal } from "@/components/modal/modal";
import { addAssignees } from "@/actions/ticket";
interface IAddAssigneesForm {
  userOptions: SelectorsType[];
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
}


export function AssigneesForm({ userOptions, handleOpen, isOpen }: IAddAssigneesForm) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams()
  const ticketId = params.ticketId as string
  const form = useForm<z.infer<typeof addAssigneesSchema>>({
    resolver: zodResolver(addAssigneesSchema),
    defaultValues: { assignees: [], ticketId: "" },
  });

  async function onSubmit(values: z.infer<typeof addAssigneesSchema>) {
    setLoading(true);
    values.ticketId = ticketId
    const response = await addAssignees(values);

    if (!response.success) {
      toast.error(response.message || "action error", { id: "category" });
    } else {
      toast.success("Added user successfully!");
      form.reset();
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Create Assignees"
      description="Add a new Assignees..."
      onClose={() => handleOpen(false)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="assignees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Users</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={userOptions?.filter(opt => field.value?.includes(opt.value))}
                    onChange={(selected) =>
                      form.setValue("assignees", selected.map(opt => opt.value))
                    }
                    defaultOptions={userOptions}
                    placeholder="Select users join to ticket..."
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
          <Button type="submit" className="bg-main-green text-white" disabled={loading}>
            {loading ? "Creating..." : "Submit"}
          </Button>
        </form>
      </Form>
    </Modal>
  );
}
