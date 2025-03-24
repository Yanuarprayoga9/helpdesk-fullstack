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
import { createCategory, updateCategoryById } from "@/actions/category";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { categorySchema } from "@/schemas";
import { PageHeader } from "@/components/header";


type CategoryFormProps = {
    categoryId?: string; // Jika ada ID, berarti ini update
    defaultValues?: { name: string };
};

export function CategoryForm({ categoryId, defaultValues }: CategoryFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: defaultValues || { name: "" },
    });

    async function onSubmit(values: z.infer<typeof categorySchema>) {
        setLoading(true);

        let response;
        if (categoryId) {
            response = await updateCategoryById(categoryId, values);
        } else {
            response = await createCategory(values);
        }

        setLoading(false);

        if (!response.success) {
            toast.error(response.message || "action error", { id: "category" });
        } else {
            toast.success(categoryId ? "Category updated successfully!" : "Category created successfully!");
            form.reset();
            router.refresh();
        }
    }

    return (
        <div className="space-y-4">
            <PageHeader title="Create Category" desc="create category" />
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

                    <Button type="submit" disabled={loading}>
                        {loading ? (categoryId ? "Updating..." : "Creating...") : categoryId ? "Update Category" : "Create Category"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
