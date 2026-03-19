import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { removeToast } from '../store/slices/toastSlice';
import type { Toast as ToastType } from '../store/slices/toastSlice';

const TOAST_AUTO_CLOSE_MS = 4000;

function ToastItem({ toast }: { toast: ToastType }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toast.autoClose) {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, TOAST_AUTO_CLOSE_MS);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.autoClose, dispatch]);

  const bgColor =
    toast.type === 'error'
      ? 'bg-red-500/90 dark:bg-red-600/90'
      : toast.type === 'success'
        ? 'bg-green-500/90 dark:bg-green-600/90'
        : 'bg-blue-500/90 dark:bg-blue-600/90';

  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 rounded-lg shadow-lg ${bgColor} text-white min-w-[280px] max-w-md`}
      role="alert"
    >
      <span className="flex-1">{toast.message}</span>
      <button
        type="button"
        onClick={() => dispatch(removeToast(toast.id))}
        className="p-1 rounded hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useAppSelector((s) => s.toast.items);

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}
