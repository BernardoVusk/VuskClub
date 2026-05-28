/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Shield, HelpCircle, Activity, Key } from 'lucide-react';

export const Header: React.FC = () => {
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
    <header className="py-6 px-10 border-b border-vusk-border bg-vusk-bg/20 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-stretch tracking-widest text-[#F8F7FF] mb-1">
          {info.title}
        </h2>
        <p className="text-xs text-[#9c94b0] tracking-wide">
          {info.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* API connection indicator badges */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 h-9 bg-vusk-card/40 border border-vusk-border rounded-lg text-[10px] font-mono text-[#9c94b0]">
          <Key className="w-3.5 h-3.5 text-vusk-purple" />
          <span>Gemini AI:</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="text-emerald-400 font-bold uppercase">Ativo</span>
          </span>
        </div>

        {/* Database connection badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 h-9 bg-vusk-card/40 border border-vusk-border rounded-lg text-[10px] font-mono text-[#9c94b0]">
          <Activity className="w-3.5 h-3.5 text-vusk-purple animate-pulse" />
          <span>Supabase RLS:</span>
          <span className="text-emerald-400 font-bold uppercase">Conectado</span>
        </div>

        {/* Interactive sales simulation trigger button */}
        <button
          id="simulate-sale-btn"
          onClick={triggerMockSale}
          className="h-9 px-4 rounded-lg bg-vusk-purple/20 hover:bg-vusk-purple border border-vusk-purple hover:border-vusk-purple text-vusk-secondary hover:text-white transition-all duration-300 font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(85,33,182,0.15)] hover:shadow-[0_0_20px_rgba(85,33,182,0.4)] active:scale-95"
          title="Simula uma nova comissão de venda conquistada para somar pontos de premiação física!"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>Simular Comissão ⚡</span>
        </button>
      </div>
    </header>
  );
};
