"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { createTicketComment, updateTicketComment } from "@/actions/ticket-comment";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const MAX_IMAGE_SIZE_MB = 2; // misal 2 MB

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["link", "image"],
    ],
    handlers: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image: function (this: any) {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;

          const sizeMB = file.size / (1024 * 1024);
          if (sizeMB > MAX_IMAGE_SIZE_MB) {
            toast.error(`Image too large. Max ${MAX_IMAGE_SIZE_MB}MB allowed.`);
            return;
          }

          const reader = new FileReader();
          reader.onload = () => {
            const quill = this.quill; // ✅ valid sekarang
            const range = quill.getSelection();
            if (reader.result && typeof reader.result === "string") {
              quill.insertEmbed(range?.index || 0, "image", reader.result);
            }
          };
          reader.readAsDataURL(file);
        };
      },
    }

  },
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
