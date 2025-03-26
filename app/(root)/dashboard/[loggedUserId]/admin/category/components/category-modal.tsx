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
import { updateCategoryById } from "@/actions/category";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { categorySchema } from "@/schemas";
import { Modal } from "@/components/modal/modal";
import { Pen } from "lucide-react";


type CategoryFormProps = {
    categoryId?: string;
    defaultValues?: { name: string };
};

export function CategoryForm({ categoryId, defaultValues }: CategoryFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: defaultValues || { name: "" },
    });

    async function onSubmit(values: z.infer<typeof categorySchema>) {
        setLoading(true);

        let response;
        if (categoryId) {
            response = await updateCategoryById(categoryId, values);


            setLoading(false);

            if (!response.success) {
                toast.error(response.message || "action error", { id: "category" });
            } else {
                toast.success("Category updated successfully!");
                setIsOpen(false); // Tutup modal
                router.refresh();
            }
        }
    }

    const handleClose = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <Pen className="w-4 h-4 " onClick={handleClose} />
            <Modal
                title={"update"}
                description={"update category"}
                isOpen={isOpen}
                onClose={handleClose} >
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
            </Modal>
        </div>
    );
}
