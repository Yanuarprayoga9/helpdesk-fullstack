// comment-store.ts
import { create } from "zustand";
import { CommentType } from "@/@types/ticket-comment";
import { getRepliesByCommentId } from "@/@data/ticket-comment";

interface CommentStore {
  replies: Record<string, CommentType[]>; // commentId -> replies
  editingCommentId: string | null;
  editingReplyId: string | null;
  setEditingCommentId: (id: string | null) => void;
  setEditingReplyId: (id: string | null) => void;
  fetchReplies: (commentId: string) => Promise<void>;
}

export const useCommentStore = create<CommentStore>((set) => ({
  replies: {},
  editingCommentId: null,
  editingReplyId: null,
  setEditingCommentId: (id) => set({ editingCommentId: id }),
  setEditingReplyId: (id) => set({ editingReplyId: id }),
  fetchReplies: async (commentId: string) => {
    const res = await getRepliesByCommentId(commentId);
    if (res.success) {
      set((state) => ({
        replies: {
          ...state.replies,
          [commentId]: res.comments || [],
        },
      }));
    }
  },
}));
