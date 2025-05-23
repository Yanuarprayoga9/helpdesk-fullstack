"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "../confirm-modal";
import { softDeleteTicketComment } from "@/actions/ticket-comment";

type CommentDeleteButtonProps = {
  commentId: string;
};

export const CommentDeleteButton: React.FC<CommentDeleteButtonProps> = ({ commentId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const param = useParams()
  const ticketId = param.ticketId as string

  const handleConfirm = async () => {
    setLoading(true);
    const res = await softDeleteTicketComment(commentId,ticketId);
    setLoading(false);

    if (!res.success) {
      toast.error(res.message || "Gagal menghapus komentar.");
    } else {
      toast.success("Komentar berhasil dihapus.");
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
