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
import { PageHeader } from "@/components/header";
import { ImageUpload } from "@/components/image-upload";
import MultipleSelector from '@/components/ui/multiple-selector';
import { createProject } from "@/actions/project";
import toast from "react-hot-toast";

export const projectSchema = z.object({
    name: z.string().min(3, "Project name must be at least 3 characters"),
    images: z.object({ url: z.string() }).array(),
    userIds: z.array(z.string().optional()), // Bisa kosong
});

// const OPTIONS: Option[] = [
//     { label: 'Next.js', value: 'nextjs' },
//     { label: 'React', value: 'react' },
//     { label: 'Remix', value: 'remix' },
//     { label: 'Vite', value: 'vite' },
//     { label: 'Nuxt', value: 'nuxt' },
//     { label: 'Vue', value: 'vue' },
//     { label: 'Svelte', value: 'svelte' },
//     { label: 'Angular', value: 'angular' },
//     { label: 'Ember', value: 'ember' },
//     { label: 'Gatsby', value: 'gatsby' },
//     { label: 'Astro', value: 'astro' },
// ];

type SelectorsType = {
    label: string
    value: string
}
interface ProjectFormProps {
    userMapped?: SelectorsType[]
}

export function ProjectForm({ userMapped }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: { name: "", images: [], userIds: [] },
    });

    async function onSubmit(values: z.infer<typeof projectSchema>) {
        setLoading(true);

        const response = await createProject({
            name: values.name,
            imageUrl: values.images[0]?.url,
            userIds: values.userIds?.map(String) || [],
        });

        setLoading(false);
        if (!response.success) {
            toast.error(response.message || "action error", { id: "Project" });
        } else {
            toast.success("Project created successfully!");
            form.reset();
            router.refresh();
        }
        // setLoading(true);
        // Simulasi API call
        // setLoading(false);
    }

    return (
        <div className="space-y-4">
            <PageHeader title="Create Project" desc="Create a new project" />
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
                                        value={userMapped && userMapped?.filter(opt => field.value?.includes(opt.value))}
                                        onChange={(selected) => {
                                            form.setValue("userIds", selected.map(opt => opt.value));
                                        }}
                                        defaultOptions={userMapped}
                                        placeholder="Select frameworks you like..."
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
                        {loading ? "Creating..." : "Create Project"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
