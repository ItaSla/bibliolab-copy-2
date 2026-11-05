import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all transform animate-in fade-in slide-in-from-top-2 duration-200 ${
            t.type === 'error'
              ? 'bg-rose-900/90 text-rose-100 border-rose-700/50'
              : t.type === 'info'
              ? 'bg-slate-900/90 text-slate-100 border-slate-700/50'
              : 'bg-emerald-950/90 text-emerald-100 border-emerald-700/50'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {t.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            ) : t.type === 'info' ? (
              <Info className="w-5 h-5 text-sky-400" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold leading-tight">{t.title}</h4>
            {t.description && (
              <p className="text-xs opacity-90 mt-1 leading-relaxed">{t.description}</p>
            )}
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="shrink-0 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
