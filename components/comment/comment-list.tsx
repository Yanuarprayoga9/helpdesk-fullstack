import { ThumbsUp, MessageSquare, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Comment = {
  id: number;
  author: string;
  role: string;
  avatarInitial: string;
  edited: boolean;
  content: string[];
  likes: number;
  replies: number;
};

const comments: Comment[] = [
  {
    id: 1,
    author: "AzureExpert",
    role: "Maintainer",
    avatarInitial: "A",
    edited: false,
    content: [
      "These Azure DevOps pipeline failures are often related to authentication or network connectivity issues.",
      "You need to use the service connection properly if you want to access private feeds consistently. That's exactly how other teams in our organization handle it, they authenticate using a service principal with the correct permissions to access the feed."
    ],
    likes: 3,
    replies: 2,
  },
  {
    id: 2,
    author: "DevOpsEngineer",
    role: "Author",
    avatarInitial: "D",
    edited: true,
    content: [
      "I don't think that's true. For example, I created a new pipeline that uses the official Microsoft-hosted agents, and it still failed with the same error. Our service connection is properly configured with the right permissions. Could there be some intermittent network issues where pings above what you can do will result in error? That should be indication that the infrastructure is at scale.",
      "I did just end up adding a retry mechanism after initial pipeline failure, but some people reporting still running out of errors while able to use the same mechanism on rebuild."
    ],
    likes: 0,
    replies: 0,
  },
  {
    id: 3,
    author: "AzureExpert",
    role: "Maintainer",
    avatarInitial: "A",
    edited: false,
    content: [
      "If you look at the #111 issue code you see this is the function call used to authenticate with the feed:",
      "https://dev.azure.com/company/project/_git/repo?path=/azure-pipelines.yml",
      "You'll notice there's no explicit retry logic in the NuGet restore task.",
      "Instead there's this right after:\nhttps://dev.azure.com/company/project/_git/repo?path=/scripts/retry-nuget.ps1",
      "This means it operates with the default retry policy and then scales afterwards to the exact configuration you need."
    ],
    likes: 2,
    replies: 0,
  },
  {
    id: 4,
    author: "DevOpsEngineer",
    role: "Author",
    avatarInitial: "D",
    edited: true,
    content: [
      "Hi @AzureExpert, I just checked our YAML usage. You're right, we are able to use retries in many other situations though. I'm sure it can be done."
    ],
    likes: 0,
    replies: 0,
  },
  {
    id: 5,
    author: "AzureExpert",
    role: "Maintainer",
    avatarInitial: "A",
    edited: false,
    content: [
      "It's probably running out of memory in the VM/Container node. If you switch to the M2 agent pool the problem will likely go away."
    ],
    likes: 1,
    replies: 0,
  }
];

export function CommentList() {
  return (
    <>
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="mb-6 rounded-md border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 rounded-full bg-primary">
            <span className="text-xs text-primary-foreground">{comment.avatarInitial}</span>
          </Avatar>
          <span className="font-medium">{comment.author}</span>
          <Badge variant="outline" className="border-border text-xs">
            {comment.role}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {comment.edited && <span className="text-xs text-muted-foreground">edited</span>}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        {comment.content.map((text, idx) => (
          <p
            key={idx}
            className={`mb-4 max-w-full break-words ${
              text.startsWith("http") ? "text-blue-500 break-all" : ""
            }`}
          >
            {text}
          </p>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-border p-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8">
            <ThumbsUp className="mr-1 h-4 w-4" />
            {comment.likes}
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
        {comment.replies > 0 && (
          <div className="text-xs text-muted-foreground">{comment.replies} replies</div>
        )}
      </div>
    </div>
  );
}
