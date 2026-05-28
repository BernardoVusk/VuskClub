/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Package, 
  PlayCircle, 
  FileText, 
  Sparkles, 
  Award, 
  RefreshCw, 
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, currentUser, switchRole, logout } = useApp();

  if (!currentUser) return null;

  const menuItems = [
    { id: 'products' as const, label: 'Produtos', icon: Package },
    { id: 'training' as const, label: 'Treinamentos', icon: PlayCircle },
    { id: 'files' as const, label: 'Arquivos', icon: FileText },
    { id: 'tools' as const, label: 'Ferramentas', icon: Sparkles },
    { id: 'rewards' as const, label: 'Premiações', icon: Award },
  ];

  return (
    <aside className={`fixed md:sticky top-0 left-0 z-50 md:z-20 w-68 shrink-0 h-screen bg-[#14101B]/95 md:bg-[#14101B]/30 border-r border-[#241E30] flex flex-col justify-between py-6 px-4 glass-effect transition-transform duration-300 ease-in-out md:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }`}>
      <div>
        {/* Vusk Club Logo & Mobile Close button */}
        <div className="mb-10 px-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vusk-purple flex items-center justify-center border border-white/10 glow-card shadow-[0_0_15px_rgba(85,33,182,0.3)]">
              <Sparkles className="w-5 h-5 text-vusk-secondary animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-stretch tracking-wider text-vusk-text-primary">Vusk Club</h1>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#9c94b0]">Master v2.6 //</span>
            </div>
          </div>

          <button
            id="sidebar-close-btn"
            onClick={onClose}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/[0.04] text-vusk-text-secondary hover:text-white transition-colors"
            title="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items - Minimum 44px high buttons */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                id={`sidebar-tab-${item.id}`}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full h-11 flex items-center gap-3.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group relative overflow-hidden ${
                  isActive 
                    ? 'bg-vusk-purple text-vusk-secondary shadow-[0_4px_20px_rgba(85,33,182,0.25)] font-semibold' 
                    : 'text-vusk-text-secondary hover:text-vusk-secondary hover:bg-white/[0.03]'
                }`}
              >
                {/* Visual line highlight for active item */}
                {isActive && (
                  <span className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-vusk-secondary rounded-r-md" />
                )}
                
                <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 shrink-0 ${
                  isActive ? 'text-vusk-secondary' : 'text-vusk-text-secondary group-hover:text-vusk-secondary'
                }`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Control Bento Card */}
      <div className="space-y-4">
        {/* Toggle Producer / Affiliate - Expanded to 44px touch target */}
        <button
          id="role-switch-btn"
          onClick={switchRole}
          className="w-full h-11 px-3 rounded-lg border border-[#241E30] hover:border-vusk-purple bg-vusk-bg/50 hover:bg-vusk-purple/5 transition-all text-[11px] font-mono tracking-wider text-vusk-text-secondary hover:text-vusk-secondary flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5 text-vusk-purple shrink-0" />
          <span className="truncate">
            Persona: <strong className="text-vusk-secondary uppercase font-bold">{currentUser.role === 'producer' ? '📦 Produtor' : '⚡ Afiliado'}</strong>
          </span>
        </button>

        {/* User Card - Enhanced click touch-areas */}
        <div className="p-3 bg-vusk-bg/40 border border-[#241E30]/80 rounded-xl flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-vusk-purple/20 border border-vusk-purple/40 overflow-hidden flex items-center justify-center shrink-0">
              {currentUser.avatar_url ? (
                <img src={currentUser.avatar_url} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-bold text-vusk-secondary">{currentUser.name.charAt(0)}</span>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-vusk-secondary truncate">{currentUser.name}</h4>
              <span className="text-[9px] text-vusk-text-secondary font-mono truncate block uppercase">
                {currentUser.role === 'producer' ? 'Elite Producer' : 'Growth Affiliate'}
              </span>
            </div>
          </div>
          
          <button 
            id="logout-btn"
            onClick={logout}
            className="w-11 h-11 shrink-0 rounded-lg hover:bg-white/[0.04] text-vusk-text-secondary hover:text-red-400 transition-colors flex items-center justify-center"
            title="Sair"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
