import { create } from "zustand";

export const useMenuModal = create((set) => ({
  isOpen: false,
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
