import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle, AlertCircle, Info, CheckCircle2, Trash2 } from 'lucide-react';

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
      icon: <Trash2 className="w-6 h-6 text-rose-400" />,
      iconBg: 'bg-rose-950/80 border-rose-500/40 text-rose-300',
      confirmBtn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/30'
    },
    warning: {
      icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
      iconBg: 'bg-amber-950/80 border-amber-500/40 text-amber-300',
      confirmBtn: 'bg-amber-500 hover:bg-amber-600 text-navy-deep font-bold shadow-amber-900/30'
    },
    info: {
      icon: <Info className="w-6 h-6 text-gold" />,
      iconBg: 'bg-navy-surface border-gold/40 text-gold',
      confirmBtn: 'bg-gold hover:bg-gold-light text-navy-deep font-bold shadow-gold'
    },
    success: {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
      iconBg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300',
      confirmBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white'
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
        <div className="flex items-start gap-3.5 p-4 bg-navy-surface rounded-2xl border border-navy-border">
          <div className={`p-2.5 rounded-2xl border ${current.iconBg} shrink-0`}>
            {current.icon}
          </div>
          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-0.5">
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
              className="px-4 py-2.5 rounded-xl border border-navy-border text-xs font-semibold text-slate-300 hover:text-white hover:bg-navy-surface transition cursor-pointer"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isConfirming}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md cursor-pointer disabled:opacity-50 ${current.confirmBtn}`}
          >
            {isConfirming ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
