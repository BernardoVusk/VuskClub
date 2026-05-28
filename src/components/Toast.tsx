/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { notification } = useApp();

  if (!notification) return null;

  const getStyle = () => {
    switch (notification.type) {
      case 'success':
        return {
          border: 'border-emerald-500/30',
          bg: 'bg-[#10b981]/10',
          icon: <Sparkles className="w-5 h-5 text-emerald-400 animate-spin-slow" />,
          title: 'ECOSSISTEMA VUSK // SUCESSO'
        };
      case 'error':
        return {
          border: 'border-rose-500/30',
          bg: 'bg-rose-500/10',
          icon: <AlertCircle className="w-5 h-5 text-rose-400" />,
          title: 'MENSAGEM DE ERRO // FALHA'
        };
      case 'info':
      default:
        return {
          border: 'border-vusk-purple/30',
          bg: 'bg-vusk-purple/10',
          icon: <Info className="w-5 h-5 text-vusk-purple" />,
          title: 'NOTIFICAÇÃO DO SISTEMA'
        };
    }
  };

  const style = getStyle();

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-fade-in-up">
      <div className={`p-4 rounded-xl border ${style.border} ${style.bg} glass-effect shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-start gap-3.5`}>
        <div className="shrink-0 mt-0.5">
          {style.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h5 className="text-[10px] font-mono tracking-widest text-[#9c94b0] mb-1">
            {style.title}
          </h5>
          <p className="text-sm font-sans text-vusk-secondary leading-relaxed">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
};
