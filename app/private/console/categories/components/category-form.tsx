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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { categorySchema } from "@/schemas";
import { Header } from "@/components/header";
import { createCategory } from "@/actions/category";




export function CategoryForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: "" },
    });

    async function onSubmit(values: z.infer<typeof categorySchema>) {
        setLoading(true);

        const response = await createCategory(values);


        setLoading(false);

        if (!response.success) {
            toast.error(response.message || "action error", { id: "category" });
        } else {
            toast.success("Category created successfully!");
            form.reset();
            router.refresh();
        }
    }

    return (
        <div className="space-y-4">
            <Header
                variant="sub"
                title="Create Category"
                desc="Add a new category to organize your data effectively. Provide a name and description to make it easily identifiable."
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter category name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-main-green text-white" disabled={loading}>
                        {loading ? ("Creating...") : ("Submit")}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
