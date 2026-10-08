import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#16151a] border border-[#d4af37]/50 rounded-lg p-3.5 shadow-2xl flex items-start space-x-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            {toast.type === 'info' && (
              <Info className="w-4 h-4 text-amber-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-white">{toast.title}</h4>
            <p className="text-[11px] text-[#bfb7a7] mt-0.5 leading-snug">{toast.message}</p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-stone-500 hover:text-white p-0.5 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
