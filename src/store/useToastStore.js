import { create } from "zustand";

let toastId = 0;
const generateId = () => {
  toastId += 1;
  return `${Date.now()}-${toastId}`;
};

export const useToastStore = create((set) => ({
  toasts: [],

  addToast: (message, type = "default", duration = 3000) => {
    const id = generateId();

    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
