"use client";

import { UserType } from '@/@types/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { AlertCircleIcon, Bell, Circle, Plus } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { AssigneesForm } from './assignees-form';
import { SelectorsType } from '@/lib/utils';
import { TicketType } from '@/@types/ticket';
import { createTicketAssignmentRequest } from '@/actions/ticket-assignment-request';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface ITicketSidebar {
    assignedUsers: UserType[]
    unnasignedUsersOptions: SelectorsType[]
    ticket: TicketType

}

const colorMap: Record<string, string> = {
    red: "text-red-500",
    blue: "text-blue-500",
    green: "text-green-500",
    yellow: "text-yellow-500",
    orange: "text-orange-500",
    gray: "text-gray-500",
    purple: "text-purple-500",
};
export const TicketDetailSidebar = ({ assignedUsers, unnasignedUsersOptions, ticket }: ITicketSidebar) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const pathname = usePathname(); // Ambil path saat ini
    const searchParams = useSearchParams(); // Ambil search params saat ini
    const [isOpen, setIsOpen] = useState(false);
    const statusColor = colorMap[ticket.status.color] || "text-gray-500";
    const session = useSession()

    const assigneesUserIds = assignedUsers.map((u)=>u.id)
    const isContribUser =     assigneesUserIds.includes(session.data?.user.id as string) 
    const handleAssignmentRequest = async () => {
        setLoading(true);
        const response = await createTicketAssignmentRequest({ requestedById: session.data?.user.id as string, ticketId: ticket.id as string, notes: "notes" })

        setLoading(false);

        if (!response.success) {
            toast.error(response.message || "action error", { id: "assignment" });
        } else {
            toast.success("Assignment Sent successfully!");
            router.refresh();
        }
    }


    const handleOpen = (open: boolean) => setIsOpen(open);
    const viewAllTeamHandleClick = () => {
        // Buat object dari search params yang ada
        const params = new URLSearchParams(searchParams);

        // Tambahkan atau perbarui `tabActive`
        params.set("tabActive", "team");

        // Push dengan path yang sama + query string yang diperbarui
        router.push(`${pathname}?${params.toString()}`);
    };
    const latestChanges = [
        {
            text: "Azure DevOps pipeline failing during package restore",
            status: "error",
        },
        {
            text: "Added retry mechanism for failed builds",
            status: "success",
        },
        {
            text: "Updated service connection configuration",
            status: "info",
        },
    ]
    return (
        <div className="w-full hidden shrink-0 p-4 pt-16 lg:block">
            <div className="mb-6">
                <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Category</h3>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-primary"></div>
                    <span className="text-sm">Infrastructure</span>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Status</h3>
                <div className={`text-sm text-muted-foreground ${statusColor}`}>{ticket.status.name}</div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between">
                    <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Assignees</h3>
                    <h3 className="mb-2 cursor-pointer hover:font-semibold text-xs font-medium uppercase text-muted-foreground" onClick={viewAllTeamHandleClick}>
                        View all
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="rounded-md  bg-card">
                        <div className="flex items-center justify-between mb-2">
                        </div>
                        <div className=" flex items-center space-x-3">
                            {assignedUsers && assignedUsers.length > 0 ? (
                                assignedUsers.map((user) => (
                                    <Avatar className="h-4 w-4" key={user.id}>
                                        <AvatarImage src={user?.imageUrl || ""} alt={user?.name || ""} />
                                        <AvatarFallback>{user?.name ? user.name.substring(0, 2).toUpperCase() : "UN"}</AvatarFallback>
                                    </Avatar>
                                ))
                            ) : (
                                <div className="text-sm text-muted-foreground">No contributors yet</div>
                            )}
                            <Button
                                variant="outline"
                                onClick={() => handleOpen(true)}
                                size="sm"
                                className="h-8 border-dashed"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add assignee
                            </Button>

                            <AssigneesForm
                                userOptions={unnasignedUsersOptions}
                                isOpen={isOpen}
                                handleOpen={handleOpen}
                            />
                        </div>
                    </div>


                </div>
            </div>

            {/* <div className="mb-6">
                <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">2 Reactions</h3>
                <div className="flex gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                        <ThumbsUp className="h-4 w-4" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                        <Award className="h-4 w-4" />
                    </div>
                </div>
            </div> */}

          
            <div className="mb-6" >
                {/* <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Notifications</h3> */}
                <Button className="w-full justify-start bg-green-500 text-primary-foreground hover:bg-primary/90 cursor-pointer" onClick={handleAssignmentRequest} disabled={ isContribUser || loading}>
                    <Bell className="mr-2 h-4 w-4" />
                    Request Contributions
                </Button>

                <div className="mt-2 text-xs text-muted-foreground">Youre not receiving notifications from this thread</div>
            </div>

            {/* Latest Changes Section */}
            <div className="mb-6">
                <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">Latest changes</h3>
                <div className="space-y-2">
                    {latestChanges.map((change, index) => (
                        <div key={index} className="flex items-start gap-2">
                            {change.status === "error" && <AlertCircleIcon className="mt-1 h-4 w-4 text-destructive" />}
                            {change.status === "success" && <Circle className="mt-1 h-4 w-4 text-primary" />}
                            {change.status === "info" && <Circle className="mt-1 h-4 w-4 text-blue-500" />}
                            <span className="text-sm text-muted-foreground">{change.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="mb-6">
                <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Create issue from discussion
                </Button>
            </div> */}
        </div>
    )
}

