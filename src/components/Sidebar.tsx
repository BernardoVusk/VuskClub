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
  LogOut 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
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
    <aside className="w-68 shrink-0 h-screen bg-vusk-card/30 border-r border-vusk-border flex flex-col justify-between py-6 px-4 glass-effect sticky top-0 z-20">
      <div>
        {/* Vusk Club Logo */}
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-vusk-purple flex items-center justify-center border border-white/10 glow-card shadow-[0_0_15px_rgba(85,33,182,0.3)]">
            <Sparkles className="w-5 h-5 text-vusk-secondary animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-stretch tracking-wider text-vusk-text-primary">Vusk Club</h1>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#9c94b0]">Master v2.6 //</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                id={`sidebar-tab-${item.id}`}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group relative overflow-hidden ${
                  isActive 
                    ? 'bg-vusk-purple text-vusk-secondary shadow-[0_4px_20px_rgba(85,33,182,0.25)]' 
                    : 'text-vusk-text-secondary hover:text-vusk-secondary hover:bg-white/[0.03]'
                }`}
              >
                {/* Visual line highlight for active item */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-vusk-secondary rounded-r-md" />
                )}
                
                <Icon className={`w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-vusk-secondary' : 'text-vusk-text-secondary group-hover:text-vusk-secondary'
                }`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Control Bento Card */}
      <div className="space-y-4">
        {/* Toggle Producer / Affiliate */}
        <button
          id="role-switch-btn"
          onClick={switchRole}
          className="w-full py-2.5 px-3 rounded-lg border border-vusk-border hover:border-vusk-purple bg-vusk-bg/50 hover:bg-vusk-purple/5 transition-all text-[11px] font-mono tracking-wider text-vusk-text-secondary hover:text-vusk-secondary flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5 text-vusk-purple" />
          Alternar Persona:
          <span className="text-vusk-secondary uppercase font-bold">
            {currentUser.role === 'producer' ? '📦 Produtor' : '⚡ Afiliado'}
          </span>
        </button>

        {/* User Card */}
        <div className="p-3.5 bg-vusk-bg/40 border border-vusk-border/80 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-vusk-purple/20 border border-vusk-purple/40 overflow-hidden flex items-center justify-center">
              {currentUser.avatar_url ? (
                <img src={currentUser.avatar_url} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-bold text-vusk-secondary">{currentUser.name.charAt(0)}</span>
              )}
            </div>
            <div className="max-w-28 truncate">
              <h4 className="text-xs font-semibold text-vusk-secondary truncate">{currentUser.name}</h4>
              <span className="text-[10px] text-vusk-text-secondary font-mono truncate block uppercase">
                {currentUser.role === 'producer' ? 'Elite Producer' : 'Growth Affiliate'}
              </span>
            </div>
          </div>
          
          <button 
            id="logout-btn"
            onClick={logout}
            className="p-1.5 rounded-md hover:bg-white/[0.04] text-vusk-text-secondary hover:text-red-400 transition-colors"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
