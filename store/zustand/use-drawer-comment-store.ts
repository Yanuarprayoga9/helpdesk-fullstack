import { create } from 'zustand'

interface CommentDrawerState {
  isOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  setOpen: (value: boolean) => void
}

export const useCommentDrawerStore = create<CommentDrawerState>((set) => ({
  isOpen: false,
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
  setOpen: (value: boolean) => set({ isOpen: value }),
}))
