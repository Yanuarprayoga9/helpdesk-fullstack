import { ThumbsUp, MessageSquare, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CommentType } from "@/@types/ticket-comment";
import "./ticket-comment.css"
interface ICommentList {
parentComments:CommentType[]
}
export function CommentList({parentComments}:ICommentList) {
  return (
    <>
      {parentComments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}

function CommentItem({ comment }: { comment: CommentType }) {
  return (
    <div className=" mb-6 rounded-md border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 rounded-full bg-primary">
            <span className="text-xs text-primary-foreground">{comment.userImage}</span>
          </Avatar>
          <span className="font-medium">{comment.userName}</span>
          <Badge variant="outline" className="border-border text-xs">
            {comment.userRole}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">edited</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4 ticket-comment" dangerouslySetInnerHTML={{ __html: comment.comment }}/>
      <div className="flex items-center justify-between border-t border-border p-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8">
            <ThumbsUp className="mr-1 h-4 w-4" />
            likes: 3,
    
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
        {/* {comment.replies > 0 && (
          <div className="text-xs text-muted-foreground">replies: 2 replies</div>
        )} */}
      </div>
    </div>
  );
}
