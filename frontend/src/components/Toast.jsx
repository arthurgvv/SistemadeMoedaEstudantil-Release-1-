import { useEffect } from "react";

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(onClose, 3600);
    return () => window.clearTimeout(timeoutId);
  }, [toast, onClose]);

  if (!toast) {
    return null;
  }

  return (
    <div className={`toast ${toast.type === "error" ? "is-error" : ""}`} role="status" aria-live="polite">
      {toast.message}
    </div>
  );
}

export default Toast;
