"use client";
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectTrigger, SelectValue
} from '@/components/ui/select'
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
import { Header } from "@/components/header";

// Ganti dengan import schema dan action user sesuai struktur project kamu
import { RegisterSchema } from "@/schemas";
import { createUser } from "@/actions/user"; // pastikan fungsi ini tersedia
import { SelectorsType } from '@/lib/utils';

interface IUserForm {
 rolesOptions: SelectorsType[]

}
export function UserForm({rolesOptions}:IUserForm) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setLoading(true);

    const response = await createUser(values);

    setLoading(false);

    if (!response.success) {
      toast.error(response.message || "Failed to create user", {
        id: "user",
      });
    } else {
      toast.success("User created successfully!");
      form.reset();
      router.refresh();
    }
  }

  return (
    <div className="space-y-4">
      <Header
        variant="sub"
        title="Create User"
        desc="Register a new user by providing a name, email, and password."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {rolesOptions.map(opt => (
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter password" {...field} />
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
    </div>
  );
}
