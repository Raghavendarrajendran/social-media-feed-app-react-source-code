import { useEffect, useRef } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'default';
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
    dialogRef.current?.close();
  };

  const handleCancel = () => {
    onCancel();
    dialogRef.current?.close();
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={onCancel}
      className="p-0 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-xl max-w-md w-full"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
    >
      <div className="p-6">
        <h2 id="modal-title" className="text-lg font-semibold mb-2">
          {title}
        </h2>
        <p id="modal-desc" className="text-[var(--text-secondary)] mb-6">
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg text-white ${
              variant === 'danger'
                ? 'bg-[var(--danger)] hover:opacity-90'
                : 'bg-[var(--accent)] hover:opacity-90'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
