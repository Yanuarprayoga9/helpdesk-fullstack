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
import { Input } from "@/components/ui/input";
import { updateUserById } from "@/actions/user";
import { UserType } from "@/@types/user";

const generalSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  imageUrl: z.string().url({ message: "Invalid URL format." }),
});

type GeneralProfileFormProps = {
  user?: UserType | null;
};

export function GeneralProfileForm({ user }: GeneralProfileFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof generalSchema>>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      name: user?.name || "",
      imageUrl: user?.imageUrl || "",
    },
  });

  async function onSubmit(values: z.infer<typeof generalSchema>) {
    if (!user?.id) {
      alert("User ID is missing.");
      return;
    }

    setLoading(true);
    const response = await updateUserById(user.id, values);
    setLoading(false);

    if (!response.success) {
      alert(response.message);
    } else {
      alert("Profile updated successfully!");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="hidden">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://your-avatar.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
