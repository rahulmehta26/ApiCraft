import { AnimatePresence } from "motion/react";
import { useToastStore } from "../../../store/useToastStore";
import { Toast } from "./toast";

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <span className="pointer-events-none fixed top-4 right-4 z-[9999] h-0 space-y-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} />
          </div>
        ))}
      </AnimatePresence>
    </span>
  );
};
