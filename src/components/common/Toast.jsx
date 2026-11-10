import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Droplets, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
      case 'hydration':
        return <Droplets className="w-5 h-5 text-sky-500 flex-shrink-0" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-[#8B5CF6] flex-shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-white border border-[#ECE9F2] rounded-2xl shadow-lg shadow-purple-950/5 text-sm"
          >
            {getIcon(toast.type)}
            <div className="flex-1 pr-2">
              <p className="font-semibold text-[#242039] text-xs uppercase tracking-wide">{toast.title}</p>
              {toast.message && <p className="text-xs text-[#858197] mt-0.5 leading-relaxed">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

