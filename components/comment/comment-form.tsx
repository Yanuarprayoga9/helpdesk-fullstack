"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { createTicketComment, updateTicketComment } from "@/actions/ticket-comment";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["link", "image"],
  ],
};

const formats = [
  "header",
  "bold",
  "color",
  "background",
  "italic",
  "underline",
  "blockquote",
  "code-block",
  "list",
  "align",
  "size",
  "link",
  "image",
];

type CommentFormProps = {
  ticketId: string;
  commentId?: string; // kalau ada berarti edit
  defaultValue?: string;
  parentCommentId?: string | null;  
  onSuccess?: () => void; // 👈 tambahan ini

};

export const CommentForm = ({
  ticketId,
  commentId,
  defaultValue = "",
  parentCommentId = null,
  onSuccess
}: CommentFormProps) => {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!value.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    setLoading(true);
    // console.log({ id: commentId, comment: value })
    // console.log(typeof(value))
   
    let result;
    if (commentId) {
      // kalau commentId ada, berarti update
      result = await updateTicketComment({ id: commentId, comment: value });
    } else {
      // create 
      // kalau gak ada, berarti create
      result = await createTicketComment({
        ticketId,
        comment: value,
        parentCommentId,
      });
    }
if (result.success) {
  toast.success(result.message as string);
  // panggil onSuccess kalau ada
  if (onSuccess) onSuccess();
} else {
  toast.error(result.message as string);
}

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ReactQuill
        theme="snow"
        className="rounded-md border-none"
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
        placeholder="Write something awesome..."
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white hover:bg-green-400 "
      >
        {loading
          ? commentId
            ? "Updating..."
            : "Submitting..."
          : commentId
            ? "Update Comment"
            : "Submit"}
      </Button>
    </form>
  );
};
