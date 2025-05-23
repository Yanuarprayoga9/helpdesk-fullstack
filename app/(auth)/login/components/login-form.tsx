"use client"
import { login } from '@/actions/login'
import React, { useState, useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast' // Import toast
import { DEFAULT_ISLOGIN_REDIRECT_ROUTE } from '@/constants/routes'

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'password123'
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    // Menampilkan toast bahwa login sedang diproses
    toast.loading("processing login...", { id: "login" });

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            form.reset();
            toast.error(data.error, { id: "login" }); // Menampilkan toast error
          }

          if (data?.success) {
            setSuccess(data.success);
            form.reset();
            toast.success("Mengalihkan...", { id: "login" }); // Menampilkan toast sukses
            router.push(callbackUrl || DEFAULT_ISLOGIN_REDIRECT_ROUTE)
          }
        })
        .catch(() => {
          setError("Something went wrong");
          toast.error("Something went wrong", { id: "login" });
        });
    });
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden bg-gray-100 lg:block dark:bg-gray-800">
        <Image
          src="/placeholder.svg"
          alt="Login Illustration"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div>
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="mx-auto w-full max-w-[400px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Helpdesk Ticket System</h1>
            <p className="dark:text-gray-400 text-[#4F46E5]">Enter your email and password to sign in.</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" type="email" {...field} />
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
                      <Input placeholder="shadcn" type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                {success && <span className='text-green-500'>{success}</span>}
                {error && <span className='text-red-500'>{error}</span>}
              </div>
              <Button type="submit" disabled={isPending} className='dark:text-white w-full dark:bg-green-500 dark:hover:bg-green-300'>
                {isPending ? "Processing..." : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
