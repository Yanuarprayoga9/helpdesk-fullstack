import React from 'react'
import { Button } from '../ui/button'
import { Edit2 } from 'lucide-react'

export  const CommentForm = () => {
  return (
   <div className="rounded-md border border-border bg-background p-4">
               <div className="mb-2 text-sm">Write a reply</div>
               <div className="rounded-md border border-border bg-background p-2">
                 <div className="flex justify-between">
                   <div className="flex gap-2">
                     <Button variant="ghost" size="sm" className="h-8">
                       Write
                     </Button>
                     <Button variant="ghost" size="sm" className="h-8">
                       Preview
                     </Button>
                   </div>
                   <div className="flex gap-1">
                     <Button variant="ghost" size="icon" className="h-8 w-8">
                       <Edit2 className="h-4 w-4" />
                     </Button>
                   </div>
                 </div>
                 <textarea
                   className="mt-2 h-24 w-full resize-none bg-background p-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
                   placeholder="Write a comment"
                 ></textarea>
                 <div className="mt-2 flex justify-between">
                   <div className="text-xs text-muted-foreground">
                     Attach files by dragging & dropping, selecting or pasting them.
                   </div>
                   <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Comment</Button>
                 </div>
               </div>
             </div>
  )
}


