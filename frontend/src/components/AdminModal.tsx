import type { FormEvent, ReactNode } from "react";

interface AdminModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  submitLabel: string;
}

function AdminModal({
  title,
  onClose,
  onSubmit,
  children,
  submitLabel,
}: AdminModalProps) {
  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="admin-modal-title"
        aria-modal="true"
        className="admin-modal"
        role="dialog"
      >
        <div className="admin-modal__heading">
          <h2 id="admin-modal-title">{title}</h2>
          <button
            aria-label="Close dialog"
            className="admin-icon-button"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="admin-modal__body">{children}</div>
          <div className="admin-modal__actions">
            <button className="admin-button admin-button--quiet" onClick={onClose} type="button">
              Cancel
            </button>
            <button className="admin-button admin-button--primary" type="submit">
              {submitLabel}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AdminModal;
