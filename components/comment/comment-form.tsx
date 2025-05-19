"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { createTicketComment } from "@/actions/ticket-comment";
import toast from "react-hot-toast";

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

export const CommentForm = ({ ticketId, userId }: { ticketId: string; userId: string }) => {
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
      setValue(""); // reset editor
      toast.success(result.message as string)
      // bisa tambahin toast success atau refresh data
      // console.log("Comment created:", result.data);
    } else {
      // bisa tambahin toast error
      toast.error(result.message as string)
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-md mx-auto mt-10">
      <ReactQuill
        theme="snow"
        className="rounded-md border-none"
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
        placeholder="Write something awesome..."
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
