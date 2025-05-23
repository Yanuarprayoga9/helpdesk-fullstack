"use client";

import { TicketType } from "@/@types/ticket";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
import { getAvailableActions } from "./action-status";
import { editTicket } from "@/actions/ticket";
import { getStatuses } from "@/@data/status";
import toast from "react-hot-toast";

interface ITicketDetailCard {
    ticket: TicketType;
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

const TicketDetailCard = ({ ticket }: ITicketDetailCard) => {
    const [isPending, startTransition] = useTransition();
    const [statusColors, setStatusColors] = useState<Record<string, string>>({});

    // Fetch all statuses + mapping warna berdasarkan name
    useEffect(() => {
        const fetchStatusColors = async () => {
            const res = await getStatuses();
            if (res.success) {
                const colorMapData: Record<string, string> = {};
                res.statuses?.forEach((status) => {
                    colorMapData[status.name] = colorMap[status.color] || "text-gray-500";
                });
                setStatusColors(colorMapData);
            }
        };
        fetchStatusColors();
    }, []);

    const handleActionClick = (nextStatus: string) => {
        startTransition(async () => {
            const resStatus = await getStatuses();
            const targetStatus = resStatus.statuses?.find((s) => s.name === nextStatus);
            const statusId = targetStatus?.id as string;
            const res = await editTicket(ticket.id, { status: statusId });
            if (!res.success) {
                toast.error(res.message || "action error", { id: "assignees" });
            } else {
                toast.success("Status update successfully!");
            }
        });
    };

    const availableActions = getAvailableActions(ticket.status.name);

    return (
        <div className="mb-6 rounded-md border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 rounded-full bg-primary">
                        <span className="text-xs text-primary-foreground">D</span>
                    </Avatar>
                    <span className="font-medium">{ticket.createdBy.name}</span>
                </div>

                <div className="flex items-center gap-2">

                    {availableActions.length === 0 ? (
                        <span className="text-muted-foreground text-sm">Tidak ada aksi</span>
                    ) : (
                        availableActions.map((action) => (
                            <Button
                                key={action.nextStatus}
                                size="sm"
                                variant="outline"
                                className={`h-7 text-xs ${statusColors[action.nextStatus] || "text-gray-500"
                                    }`}
                                onClick={() => handleActionClick(action.nextStatus)}
                                disabled={isPending}
                            >
                                {action.label}
                            </Button>
                        ))
                    )}
                </div>
            </div>

            <div className="p-4">
                <p className="mb-4 max-w-full break-words">{ticket.description}</p>
                <div className="mb-4 overflow-hidden rounded-md border border-border">
                    <Image
                        src={ticket.imageUrl || `/placeholder.svg?height=400&width=800`}
                        alt="Ticket image"
                        className="w-full"
                        width={800}
                        height={400}
                    />
                </div>
            </div>
        </div>
    );
};

export default TicketDetailCard;
