import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AlertCircle } from 'lucide-react'
import React from 'react'

export const MobileSidebar = () => {
  return (
   <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background p-4 px-2 sm:px-4 lg:hidden">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
          <div className="space-y-2">
            <h3 className="text-xs font-medium uppercase text-muted-foreground">Category</h3>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-primary"></div>
              <span className="text-sm">Infrastructure</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-medium uppercase text-muted-foreground">Assignees</h3>
            <div className="flex flex-wrap gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
              </Avatar>
            </div>
          </div>

          <div className="space-y-2 min-w-0">
            <h3 className="text-xs font-medium uppercase text-muted-foreground truncate">Latest</h3>
            <div className="flex items-start gap-2 min-w-0">
              <AlertCircle className="mt-1 h-4 w-4 shrink-0 text-destructive" />
              <span className="text-sm text-muted-foreground truncate">Pipeline failing</span>
            </div>
          </div>
        </div>
      </div>

  )
}


