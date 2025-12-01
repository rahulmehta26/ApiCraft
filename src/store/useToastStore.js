import { create } from "zustand";

export const useToastStore = create((set) => ({
  toasts: [],

  addToast: (message, type = "default", duration = 3000) => {
    const id = Date.now();

    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
