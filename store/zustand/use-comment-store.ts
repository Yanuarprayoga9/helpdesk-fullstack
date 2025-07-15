import { getRepliesByCommentId } from "@/@data/ticket-comment";
import { CommentType } from "@/@types/ticket-comment";
import { create } from "zustand";

interface CommentStore {
  replies: Record<string, CommentType[]>;
  editingCommentId: string | null;
  setEditingCommentId: (id: string | null) => void;
  fetchReplies: (commentId: string) => Promise<void>;
  printReplies: (commentId: string) => Promise<void>;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  replies: {},
  editingCommentId: null,

  setEditingCommentId: (id: string | null) => set({ editingCommentId: id }),
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

  printReplies: async (commentId: string) => {
    const existingReplies = get().replies[commentId];
    if (!existingReplies || existingReplies.length === 0) {
      console.log(`No replies for comment ID: ${commentId}`);
    } else {
      console.log(`Replies for comment ID: ${commentId}:`);
    }
  },
}));
