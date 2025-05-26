import React from 'react'
import { Button } from '../../ui/button'

const CommentFilter = () => {
  return (
    <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">3 comments · 5 replies</div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-border bg-secondary text-foreground hover:bg-secondary/80"
              >
                Oldest
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-border bg-secondary text-foreground hover:bg-secondary/80"
              >
                Newest
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-border bg-secondary text-foreground hover:bg-secondary/80"
              >
                Top
              </Button>
            </div>
          </div>
  )
}

export default CommentFilter
