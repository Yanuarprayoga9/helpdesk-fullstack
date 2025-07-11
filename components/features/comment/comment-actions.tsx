"use client"
import { useCommentStore } from "@/store/zustand/use-comment-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal, Pen, Star, StarOff } from "lucide-react"
import { CommentDeleteButton } from "./comment-delete-form"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { markCommentAsMostHelpful, removeCommentMostHelpful } from "@/actions/ticket-comment"

interface ICommentActions {
  commentId: string
  isParent: boolean
  ownerId: string
  ticketId: string
  isMostHelpful: boolean
}

export const CommentItemActions = ({
  commentId,
  isParent,
  ownerId,
  ticketId,
  isMostHelpful,
}: ICommentActions) => {
  const session = useSession()


  const owner = ownerId == session.data?.user.id
  const handleToggleMostHelpful = async () => {
    try {
      if (isMostHelpful) {
        const result = await removeCommentMostHelpful({ commentId, ticketId })
        if (result.success) {
          toast.success("Most helpful mark removed")
        } else {
          toast.error(result.message as string)
        }
      } else {
        const result = await markCommentAsMostHelpful({ commentId, ticketId })
        if (result.success) {
          toast.success("Comment marked as most helpful")
        } else {
          toast.error(result.message as string)
        }
      }
    } catch  {
      toast.error("An error occurred")
    }
  }

  const { setEditingCommentId } = useCommentStore()

  const handleEdit = () => {
    setEditingCommentId(commentId)

  }

  if (session.data?.user.id !== ownerId) {
    return null
  }

  return (
    <div className={`flex gap-2 ${!owner ? 'hidden' : ''}`}>
      {
        isParent && (
          isMostHelpful ? (
            <Button variant={"ghost"} onClick={handleToggleMostHelpful} className="border border-red-500 text-red-500 hover:bg-red-50">
              <StarOff className="w-4 h-4 mr-2" />
              Remove Most Helpful Mark

            </Button>
          ) : (
            <Button variant={"ghost"} onClick={handleToggleMostHelpful} className="border border-green-500 text-green-500 hover:bg-green-50" >
              <Star className="w-4 h-4 mr-2" />
              Mark as Most Helpful
            </Button>
          )
        )
      }
      <DropdownMenuSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <Pen className="w-4 h-4 mr-2" />
            Edit Comment
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}

          <DropdownMenuItem asChild>
            <CommentDeleteButton commentId={commentId} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
