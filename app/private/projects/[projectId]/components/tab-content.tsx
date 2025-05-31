"use client"
import React from 'react'
import { Clock, FileText } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"
import { UserType } from '@/@types/user'
import { ProjectType } from '@/@types/project'
import { formatDate } from '@/lib/utils'
import {  usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

interface TabContentProps {
    users?: UserType[]
    project: ProjectType

}
export const TabContent = ({ users, project }: TabContentProps) => {
    const router = useRouter();
    const pathname = usePathname(); // Ambil path saat ini
    const searchParams = useSearchParams(); // Ambil search params saat ini

    const viewAllTeamHandleClick = () => {
        // Buat object dari search params yang ada
        const params = new URLSearchParams(searchParams);

        // Tambahkan atau perbarui `tabActive`
        params.set("tabActive", "team");

        // Push dengan path yang sama + query string yang diperbarui
        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        <>
            <TabsContent value="code" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <div className="border rounded-md p-4 bg-card">
                            <h2 className="text-lg font-semibold mb-4">README.md</h2>
                            <div className="prose dark:prose-invert max-w-none">
                                <h1>{project.name}</h1>
                                {project?.imageUrl ? (
                                    <div className="relative h-80 w-80 rounded-md overflow-hidden">
                                        <Image src={project?.imageUrl || "/placeholder.svg"} alt={project?.name} fill className="object-cover" />
                                    </div>
                                ) : (
                                    <div className="h-80 w-80 bg-muted flex items-center justify-center rounded-md">
                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="border rounded-md p-4 bg-card">
                            <h3 className="text-sm font-medium mb-2">About</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Project description goes here. This is a sample description.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>Created on {formatDate(project.createdAt)}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>Updated on {formatDate(project.updatedAt as string)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-md p-4 bg-card">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium">Contributors</h3>
                                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={viewAllTeamHandleClick}>
                                    View all
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {users && users.length > 0 ? (
                                    users.map((user) => (
                                        <div key={user.id} className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={user?.imageUrl || ""} alt={user?.name || ""} />
                                                <AvatarFallback>{user?.name ? user.name.substring(0, 2).toUpperCase() : "UN"}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{user?.name || "Unknown User"}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-muted-foreground">No contributors yet</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="issues">
                <div className="border rounded-md p-6 text-center">
                    <h3 className="text-lg font-medium mb-2">Issues</h3>
                    <p className="text-muted-foreground">Issues content would go here</p>
                </div>
            </TabsContent>

            <TabsContent value="pull-requests">
                <div className="border rounded-md p-6 text-center">
                    <h3 className="text-lg font-medium mb-2">Pull Requests</h3>
                    <p className="text-muted-foreground">Pull requests content would go here</p>
                </div>
            </TabsContent>

            <TabsContent value="team">
                <div className="border rounded-md p-6">
                    <h3 className="text-lg font-medium mb-4">Team Members</h3>
                    {users && users.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {users.map((user, index) => (
                                <div key={user?.id || index} className="flex items-center gap-3 p-3 border rounded-md">
                                    <Avatar>
                                        <AvatarImage src={user?.imageUrl || ""} alt={user?.name || ""} />
                                        <AvatarFallback>{user?.name ? user.name.substring(0, 2).toUpperCase() : "UN"}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{user?.name || "Unknown User"}</div>
                                        <div className="text-sm text-muted-foreground">{user?.email || "No email"}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground">No team members yet</div>
                    )}
                </div>
            </TabsContent>

            <TabsContent value="settings">
                <div className="border rounded-md p-6 text-center">
                    <h3 className="text-lg font-medium mb-2">Settings</h3>
                    <p className="text-muted-foreground">Project settings would go here</p>
                </div>
            </TabsContent>
        </>
    )
}

