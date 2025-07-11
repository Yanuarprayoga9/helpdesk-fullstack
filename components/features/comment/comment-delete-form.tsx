"use client"

import type React from "react"

import { useState } from "react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "../../confirm-modal"
import { softDeleteTicketComment } from "@/actions/ticket-comment"
import { Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type CommentDeleteButtonProps = {
  commentId: string
}

export const CommentDeleteButton: React.FC<CommentDeleteButtonProps> = ({ commentId }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const param = useParams()
  const ticketId = param.ticketId as string

  const handleConfirm = async () => {
    setLoading(true)
    const res = await softDeleteTicketComment(commentId, ticketId)
    setLoading(false)

    if (!res.success) {
      toast.error(res.message || "Gagal menghapus komentar.")
    } else {
      toast.success("Komentar berhasil dihapus.")
      setOpen(false)
      router.refresh()
    }
  }

  return (
    <div className="">

      <AlertModal isOpen={open} loading={loading} onClose={() => setOpen(false)} onConfirm={handleConfirm} />


   

      <div className="flex ">
        <Button
          variant="ghost"
          size="lg"
          className=" cursor-pointer"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          {loading ? <Loader2 className=" h-4 animate-spin mr-1" /> : <Trash2 className=" h-4 " />}
          
        <span className="text-md">Delete</span>
        </Button>
        
      </div>


    </div>
  )
}
