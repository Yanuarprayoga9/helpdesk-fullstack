"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { createTicketComment } from "@/actions/ticket-comment";
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
  userId: string;
  onClose: () => void;
};

export const CommentForm = ({ ticketId, userId, onClose }: CommentFormProps) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await createTicketComment({
      ticketId,
      userId,
      comment: value,
    });

    if (result.success) {
      setValue("");
      toast.success(result.message as string);
      onClose(); // close drawer kalau sukses
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
        className="w-full bg-blue-600 text-white"
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};
