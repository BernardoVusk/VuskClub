/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Activity, Key, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMenu }) => {
  const { currentUser, triggerMockSale, activeTab } = useApp();

  if (!currentUser) return null;

  // Render contextual titles based on activeTab
  const getTabTitle = () => {
    switch (activeTab) {
      case 'products':
        return {
          title: 'VITRINE DE PRODUTOS',
          subtitle: 'Escolha mini-SaaS validados para afiliar-se, copiar links e faturar altas comissões.'
        };
      case 'training':
        return {
          title: 'ACADEMIA DE VENDAS',
          subtitle: 'Vídeo playbooks de tráfego orgânico, hacks de retenção do TikTok e estratégias práticas.'
        };
      case 'files':
        return {
          title: 'ACERVO DE ARQUIVOS',
          subtitle: 'Materiais de apoio, criativos validados, drives de imagens, logos e criativos prontos.'
        };
      case 'tools':
        return {
          title: 'COPILOT DE COPYWRITING',
          subtitle: 'Crie copies, directs frios e ganchos altamente persuasivos turbinados pela IA Gemini.'
        };
      case 'rewards':
        return {
          title: 'PREMIAÇÕES FÍSICAS',
          subtitle: 'Monitore seu progresso acumulado de comissões e reivindique moletons, placas 10K e 50K.'
        };
      default:
        return {
          title: 'ÁREA DE PARCEIRO',
          subtitle: 'Gerencie suas ferramentas, copies e materiais de divulgação do Vusk Club.'
        };
    }
  };

  const info = getTabTitle();

  return (
    <header className="py-4 px-4 sm:px-6 md:px-10 border-b border-vusk-border bg-[#0B080F]/45 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4 min-h-[72px]">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger toggle button - Clickable target is exactly 44x44px */}
        <button
          id="hamburger-toggle-btn"
          onClick={onToggleMenu}
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg border border-[#241E30] bg-[#14101B]/50 text-vusk-text-secondary hover:text-white hover:bg-[#241E30]/50 transition-colors shrink-0"
          title="Abrir menu"
        >
          <Menu className="w-5.5 h-5.5" />
        </button>

        <div className="min-w-0">
          <h2 className="text-sm md:text-xl font-stretch tracking-wider text-[#F8F7FF] mb-0.5 truncate uppercase">
            {info.title}
          </h2>
          <p className="text-[10px] md:text-xs text-[#9c94b0] tracking-wide truncate max-w-[180px] xs:max-w-[240px] sm:max-w-sm md:max-w-md lg:max-w-2xl">
            {info.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* API connection indicator badges */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 h-11 bg-vusk-card/40 border border-[#241E30] rounded-lg text-[10px] font-mono text-[#9c94b0]">
          <Key className="w-3.5 h-3.5 text-vusk-purple" />
          <span>Gemini AI:</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="text-emerald-400 font-bold uppercase">Ativo</span>
          </span>
        </div>

        {/* Database connection badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 h-11 bg-vusk-card/40 border border-[#241E30] rounded-lg text-[10px] font-mono text-[#9c94b0]">
          <Activity className="w-3.5 h-3.5 text-vusk-purple animate-pulse" />
          <span>Supabase RLS:</span>
          <span className="text-emerald-400 font-bold uppercase">Conectado</span>
        </div>

        {/* Interactive sales simulation trigger button - Enriched height h-11 */}
        <button
          id="simulate-sale-btn"
          onClick={triggerMockSale}
          className="h-11 px-3 sm:px-4 rounded-lg bg-vusk-purple/20 hover:bg-vusk-purple border border-vusk-purple hover:border-vusk-purple text-vusk-secondary hover:text-white transition-all duration-300 font-mono text-[11px] font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(85,33,182,0.15)] hover:shadow-[0_0_20px_rgba(85,33,182,0.4)] active:scale-95"
          title="Simula uma nova comissão de venda conquistada para somar pontos de premiação física!"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">
            Simular <span className="hidden sm:inline">Comissão </span>⚡
          </span>
        </button>
      </div>
    </header>
  );
};
