"use client";

import { softDeleteTicket } from "@/actions/ticket";
import { AlertModal } from "@/components/confirm-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type TicketDeleteFormProps = {
  ticketId: string;
};

export const TicketDeleteForm: React.FC<TicketDeleteFormProps> = ({ ticketId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const res = await softDeleteTicket(ticketId);
    setLoading(false);

    if (!res.success) {
      toast.error(res.message || "Failed to delete ticket.");
    } else {
      toast.success("Ticket deleted successfully.");
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
      <span
        onClick={() => setOpen(true)}
        className="w-full cursor-pointer text-red-500"
      >
        Hapus
      </span>
    </>
  );
};
