"use client";

import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectTrigger, SelectValue
} from '@/components/ui/select';
import { useEffect, useState } from "react";
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
import { Modal } from "@/components/ui/modal";
import { Pen } from "lucide-react";
import { RegisterSchema } from "@/schemas";
import { updateUserById } from "@/actions/user"; // tambahkan getUserById
import { getRoles } from "@/@data/role";
import { SelectorsType, mapAndSort } from '@/lib/utils';
import { getUserById } from '@/@data/user';

interface UserFormEditProps {
  userId: string;
}

export function UserFormEdit({ userId }: UserFormEditProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [rolesOptions, setRolesOptions] = useState<SelectorsType[]>([]);
  const [defaultValues, setDefaultValues] = useState<z.infer<typeof RegisterSchema> | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      password: "",
      roleId: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, rolesRes] = await Promise.all([
          getUserById(userId),
          getRoles()
        ]);

        if (userRes?.user) {
          setDefaultValues({
            name: userRes.user.name,
            email: userRes.user.email,
            password: "",
            roleId: userRes.user.roleId as string,
          });
          form.reset({
            name: userRes.user.name,
            email: userRes.user.email,
            password: "",
            roleId: userRes.user.roleId,
          });
        }

        const rolesMapped = mapAndSort(rolesRes.roles, r => r.name, r => r.id);
        setRolesOptions(rolesMapped);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to load data");
      } finally {
        setInitLoading(false);
      }
    };

    if (isOpen) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setLoading(true);
    const response = await updateUserById(userId, values);
    setLoading(false);

    if (!response.success) {
      toast.error(response.message || "Failed to update user");
    } else {
      toast.success("User updated successfully!");
      router.refresh();
      setIsOpen(false);
    }
  }

  return (
    <div>
      <Pen className="w-4 h-4 cursor-pointer" onClick={() => setIsOpen(true)} />
      <Modal
        title="Update User"
        description="Update user information"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {initLoading ? (
          <div className="p-4 text-sm text-muted">Loading...</div>
        ) : (
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
                      <Input type="email" placeholder="Enter email" {...field} />
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
                          <SelectValue placeholder="Select role" />
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
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update User"}
              </Button>
            </form>
          </Form>
        )}
      </Modal>
    </div>
  );
}
