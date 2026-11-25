import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  const bgColors = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-rose-600 text-white',
    info: 'bg-slate-800 text-white',
  };

  const icons = {
    success: <CheckCircle2 size={20} className="toast-icon-svg" />,
    error: <AlertCircle size={20} className="toast-icon-svg" />,
    info: <Info size={20} className="toast-icon-svg" />,
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 20px',
        borderRadius: '12px',
        backgroundColor: toast.type === 'error' ? '#DC2626' : toast.type === 'info' ? '#1E293B' : '#059669',
        color: '#FFFFFF',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.95rem',
        fontWeight: '500',
        animation: 'fadeIn 0.3s ease',
        maxWidth: '420px',
      }}
    >
      {icons[toast.type] || icons.success}
      <span style={{ flex: 1 }}>{toast.message}</span>
    </div>
  );
}
