/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  TrendingUp, 
  Shirt, 
  Sparkles, 
  Gift,
  HelpCircle
} from 'lucide-react';

export const Rewards: React.FC = () => {
  const { currentUser, levels, showNotification } = useApp();

  if (!currentUser) return null;

  const currentEarned = currentUser.total_earned;

  const getRewardIcon = (lvl: number) => {
    switch (lvl) {
      case 1:
        return Shirt;
      case 2:
        return Award;
      case 3:
        return Sparkles;
      default:
        return Gift;
    }
  };

  const handleClaimReward = (levelName: string, required: number) => {
    if (currentEarned < required) {
      showNotification('error', `Acesso negado: Você precisa atingir R$ ${required.toLocaleString('pt-BR')} para reivindicar esta premiação.`);
      return;
    }
    showNotification('success', `🎉 SOLICITAÇÃO RECEBIDA! Nossos gerentes entrarão em contato para validar os dados de envio de: ${levelName}!`);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Dynamic progress bento card */}
      <div className="p-6 rounded-2xl border border-vusk-border bg-vusk-card/30 glass-effect relative overflow-hidden">
        {/* Lights */}
        <div className="absolute top-[-100%] left-[50%] w-[300px] h-[300px] rounded-full bg-vusk-purple/10 blur-[100px]" />

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#9c94b0] block uppercase">MONITORAMENTO DE REIVINDICAÇÕES</span>
            <h3 className="text-xl font-stretch tracking-wider text-[#F8F7FF] uppercase">Sua Jornada de Parceria</h3>
            <p className="text-xs text-[#9c94b0] max-w-xl leading-relaxed">
              Cada centavo de comissão gerada aproxima você das famosas placas físicas e mimos exclusivos do Vusk Club. Atinja as metas e solicite o resgate físico instantaneamente.
            </p>
          </div>

          {/* Points display widget */}
          <div className="bg-vusk-bg/40 border border-vusk-border p-5 rounded-xl text-center md:text-right flex flex-col justify-center min-w-[200px]">
            <span className="text-[10px] text-[#9c94b0] font-mono uppercase block mb-1">Faturamento Acumulado</span>
            <div className="text-2xl font-stretch tracking-wider text-vusk-secondary font-bold">
              R$ {currentEarned.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center justify-center md:justify-end gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Aprovadas instantaneamente</span>
            </div>
          </div>
        </div>
      </div>

      {/* Levels list cards */}
      <div className="space-y-6">
        <h4 className="text-xs font-stretch tracking-widest text-vusk-text-secondary uppercase">
          Marcos de Carreira Desbloqueáveis
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {levels.map((lvl) => {
            const isUnlocked = currentEarned >= lvl.target;
            const RequiredIcon = getRewardIcon(lvl.level);
            const progressPct = Math.min((currentEarned / lvl.target) * 100, 100);

            return (
              <div
                id={`reward-card-lvl-${lvl.level}`}
                key={lvl.level}
                className={`p-6 rounded-xl border transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden group ${
                  isUnlocked 
                    ? 'border-vusk-purple/40 bg-gradient-to-br from-vusk-card/60 to-purple-950/20 glow-card shadow-[0_4px_25px_rgba(85,33,182,0.1)]' 
                    : 'border-vusk-border bg-vusk-card/20'
                }`}
              >
                {/* Visual Lock/Unlock icon floating */}
                <div className="absolute top-4 right-4 text-xs font-mono">
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                      <Unlock className="w-3 h-3" />
                      UNLOCKED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[#9c94b0] bg-white/[0.02] border border-vusk-border px-2.5 py-1 rounded-full font-bold">
                      <Lock className="w-3 h-3 text-vusk-purple" />
                      BLOQUEADO
                    </span>
                  )}
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isUnlocked 
                        ? 'bg-vusk-purple text-vusk-secondary border-white/10' 
                        : 'bg-white/[0.03] text-vusk-text-secondary border-vusk-border'
                    }`}>
                      <RequiredIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-mono font-bold text-vusk-purple uppercase">Nível {lvl.level}</h5>
                      <h3 className="text-sm font-semibold text-[#F8F7FF]">{lvl.name}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#9c94b0] leading-relaxed">
                    {lvl.description}
                  </p>
                </div>

                {/* Tracking bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-vusk-text-secondary">Progresso</span>
                    <span className={isUnlocked ? 'text-emerald-400' : 'text-vusk-purple'}>
                      {progressPct.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-vusk-bg border border-vusk-border rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isUnlocked ? 'bg-emerald-500' : 'bg-vusk-purple'}`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-[#9c94b0] pt-1 pt-0.5">
                    <span>Meta:</span>
                    <span>R$ {lvl.target.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                {/* Resgatar btn */}
                <button
                  id={`claim-reward-btn-${lvl.level}`}
                  onClick={() => handleClaimReward(lvl.reward, lvl.target)}
                  className={`w-full py-2.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                    isUnlocked 
                      ? 'bg-vusk-purple hover:bg-vusk-purple/90 text-vusk-secondary hover:text-white border-whitespace/10 hover:scale-[1.01] active:scale-95 shadow-[0_4px_15px_rgba(85,33,182,0.3)]' 
                      : 'bg-[#14101B]/50 hover:bg-[#14101B]/80 text-[#9c94b0] border-[#241E30] hover:border-vusk-purple/30'
                  }`}
                >
                  {isUnlocked ? 'Resgatar Prêmio Físico 🎁' : 'Meta Pendente 🔒'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
