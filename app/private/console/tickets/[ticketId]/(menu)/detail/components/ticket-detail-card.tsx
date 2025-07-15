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

import { InputConfirmModal } from "@/app/private/tickets/[ticketId]/(menu)/detail/components/change-notes";
import { createHistory } from "@/actions/history";
import TicketDetailAction from "./ticket-detail-card-action";
import { UserType } from "@/@types/user";
import { useSession } from "next-auth/react";

interface TicketDetailCardProps {
  ticket: TicketType;
  assignedUsers?: UserType[];
}

const TicketDetailCard = ({ ticket, assignedUsers }: TicketDetailCardProps) => {

  const [isPending, startTransition] = useTransition();
  const [activeActionKey, setActiveActionKey] = useState<string | false>(false);
  const session = useSession();

  // dapetin array user id yang ditugaskan ke ticket
  const assignedUserIds = assignedUsers?.map((u) => u.id) || [];

  // cek apakah user yang login adalah salah satu yang assigned
  const isAvaliableToEdit = assignedUserIds.includes(session.data?.user?.id ?? "");

  // cek apakah user yang login adalah owner ticket-nya
  const isOwner = ticket.createdBy.id === (session.data?.user?.id ?? "");
  const IsCanManipulate = (isAvaliableToEdit || isOwner)

  const handleStatusChange = (nextStatusName: string, notes: string) => {
    startTransition(async () => {
      const statusesResponse = await getStatuses();
      const targetStatus = statusesResponse.statuses?.find((status) => status.name === nextStatusName);
      const currentStatus = statusesResponse.statuses?.find((status) => status.name === ticket.status.name);

      const targetStatusId = targetStatus?.id as string;
      const currentStatusId = currentStatus?.id as string;

      const updateTicketResponse = await editTicket(ticket.id, { status: targetStatusId });
      const createHistoryResponse = await createHistory({
        changeNotes: notes,
        newStatusId: targetStatusId,
        oldStatusId: currentStatusId,
        ticketId: ticket.id,
      });

      if (!updateTicketResponse.success || !createHistoryResponse.success) {
        toast.error(updateTicketResponse.message || "Failed to change status.");
      } else {
        toast.success("Ticket status updated successfully.");
      }
    });
  };

  const availableActions = getAvailableActions(ticket.status.name);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('createdBy', ticket.createdBy.id)
    }
  }, []);

  return (
    <div className="mb-6 rounded-md border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 rounded-full bg-primary">
            <span className="text-xs text-primary-foreground">D</span>
          </Avatar>
          <span className="font-medium">{ticket.createdBy.name}</span>
        </div>

        {IsCanManipulate && (
          <>
            <div className="flex items-center gap-2">
              {availableActions.length === 0 ? (
                <span className="text-muted-foreground text-sm">No available actions</span>
              ) : (
                availableActions.map((action) => (
                  <div key={action.nextStatus}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => setActiveActionKey(action.nextStatus)}
                      disabled={isPending}
                    >
                      {action.label}
                    </Button>

                    <InputConfirmModal
                      isOpen={activeActionKey === action.nextStatus}
                      loading={isPending}
                      onClose={() => setActiveActionKey(false)}
                      onConfirm={(notes) => handleStatusChange(action.nextStatus, notes)}
                    />
                  </div>
                ))
              )}
            </div>
            <TicketDetailAction ticketId={ticket.id} />
          </>
        )}

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