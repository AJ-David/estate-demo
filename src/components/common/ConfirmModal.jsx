import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle, Info, CheckCircle2, Trash2 } from 'lucide-react';

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  subtitle,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // 'danger' | 'warning' | 'info' | 'success'
  isConfirming = false,
  showCancel = true
}) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: <Trash2 className="w-6 h-6 text-rose-600" />,
      iconBg: 'bg-rose-50 border-rose-200 text-rose-700',
      confirmBtn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      iconBg: 'bg-amber-50 border-amber-200 text-amber-700',
      confirmBtn: 'bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs'
    },
    info: {
      icon: <Info className="w-6 h-6 text-zinc-900" />,
      iconBg: 'bg-zinc-100 border-zinc-200 text-zinc-900',
      confirmBtn: 'bg-black hover:bg-zinc-800 text-white font-bold shadow-xs'
    },
    success: {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      confirmBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
    }
  };

  const current = variantStyles[variant] || variantStyles.danger;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3.5 p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
          <div className={`p-2.5 rounded-2xl border ${current.iconBg} shrink-0`}>
            {current.icon}
          </div>
          <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed pt-0.5">
            {typeof message === 'string' ? (
              <p>{message}</p>
            ) : (
              message
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {showCancel && cancelText && (
            <button
              type="button"
              onClick={onClose}
              disabled={isConfirming}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-700 hover:text-black hover:bg-zinc-100 transition cursor-pointer"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isConfirming}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50 ${current.confirmBtn}`}
          >
            {isConfirming ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
