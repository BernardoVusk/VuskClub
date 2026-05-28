/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  Award, 
  Copy, 
  Check, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  Send, 
  X, 
  ArrowUpRight, 
  HelpCircle, 
  Loader2,
  Lock,
  MessageSquare
} from 'lucide-react';

export const Overview: React.FC = () => {
  const { 
    currentUser, 
    products, 
    sales, 
    affiliations, 
    requestPayout, 
    showNotification 
  } = useApp();

  // Modal State for Coin Safe (Saque PIX)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [pixKey, setPixKey] = useState(currentUser?.pix_key || '');
  const [isProcessing, setIsProcessing] = useState(false);

  // Clipboard Copied Statuses
  const [copiedProducts, setCopiedProducts] = useState<Record<string, boolean>>({});
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setPixKey(currentUser.pix_key);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-[#5521B6] animate-spin" />
      </div>
    );
  }

  // --- Handlers & Helpers ---
  const handleOpenWalletModal = () => {
    setWithdrawAmount('');
    setIsModalOpen(true);
  };

  const handleCloseWalletModal = () => {
    if (isProcessing) return; // Prevent closing while transaction is active
    setIsModalOpen(false);
  };

  const executePayoutWithTactileFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      showNotification('error', 'Por favor, insira um valor numérico válido.');
      return;
    }

    if (amountNum < 20) {
      showNotification('error', 'O valor mínimo para saque é R$ 20,00.');
      return;
    }

    if (amountNum > currentUser.balance) {
      showNotification('error', 'Saldo insuficiente para concluir este saque.');
      return;
    }

    setIsProcessing(true);

    // Realistic tactile timeout animation
    setTimeout(() => {
      const response = requestPayout(amountNum, pixKey);
      setIsProcessing(false);
      if (response.success) {
        setIsModalOpen(false);
        showNotification('success', `Saque de R$ ${amountNum.toFixed(2)} solicitado com sucesso!`);
      } else {
        showNotification('error', response.message);
      }
    }, 1500);
  };

  const copyProductLinkToClipboard = (productId: string, refCode: string) => {
    const affiliateUrl = `https://checkout.vusk.club/${productId}?ref=${refCode}`;
    navigator.clipboard.writeText(affiliateUrl).then(() => {
      setCopiedProducts(prev => ({ ...prev, [productId]: true }));
      showNotification('success', 'Link de Afiliado copiado com sucesso!');
      setTimeout(() => {
        setCopiedProducts(prev => ({ ...prev, [productId]: false }));
      }, 2500);
    }).catch(() => {
      showNotification('error', 'Erro ao copiar o link.');
    });
  };

  const copyGoldScriptToClipboard = (scriptText: string) => {
    navigator.clipboard.writeText(scriptText).then(() => {
      setCopiedScript(true);
      showNotification('success', 'Script de ouro copiado para a área de transferência!');
      setTimeout(() => {
        setCopiedScript(false);
      }, 2500);
    }).catch(() => {
      showNotification('error', 'Erro ao copiar o script.');
    });
  };

  const claimLevelReward = (levelName: string) => {
    showNotification('success', `Sucesso! Reivindicação do prêmio ${levelName} enviada para suporte@vusk.club.`);
  };

  // Safe email masking
  const maskEmailAddress = (email: string) => {
    if (!email || !email.includes('@')) return 'cli***@gmail.com';
    const [name, domain] = email.split('@');
    if (name.length <= 3) {
      return `${name}***@${domain}`;
    }
    return `${name.slice(0, 3)}***@${domain}`;
  };

  // Fast calculations
  const totalFaturado = currentUser.total_earned;
  const balanceDisponivel = currentUser.balance;

  // Level Milestones
  const hasUnlockedReward = totalFaturado >= 1000;
  const targetPercent = Math.min(100, Math.round((totalFaturado / 1000) * 100));
  const missingAmount = Math.max(0, 1000 - totalFaturado);

  // Filter 3 Fast Mini-SaaS products for quick actions
  const affiliationProducts = products.slice(0, 3);

  // Script de Ouro Mock Content
  const scriptDeOuro = {
    title: "Script Audius de Alta Conversão",
    quote: "Use essa abordagem fria no Direct do Instagram hoje e veja o resultado direto nas conversões.",
    body: "Opa, tudo bem? Vi que você comentou lá no Reels pedindo o acesso ao método Audius! 🚀\n\nCara, quanto tempo você perde hoje respondendo direct manualmente ou perdendo leads porque demorou pra ver a notificação?\n\nA Audius resolve isso entregando o link em 2 segundos. Dá uma olhada nesse vídeo rápido e aproveite o desconto de 40% nas próximas horas: {checkout_link}\n\nVamos automatizar isso ainda hoje?"
  };

  // Process Sales with relative times for realistic UX
  const processedSales = sales.slice(0, 5).map((sale, idx) => {
    // Generate organic distinct minutes to look real-time
    const relativeTimeLabel = idx === 0 
      ? 'há 4 minutos' 
      : idx === 1 
        ? 'há 28 minutos' 
        : idx === 2 
          ? 'há 1 hora' 
          : idx === 3
            ? 'há 3 horas'
            : 'há 12 horas';

    const productRel = products.find(p => p.id === sale.product_id);
    return {
      ...sale,
      relativeTime: relativeTimeLabel,
      productName: productRel ? productRel.name : 'Viapath Premium'
    };
  });

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ========================================================== */}
        {/* CARD 1: O COFRE (Financeiro & Saque) - Ocupa 2 Colunas */}
        {/* ========================================================== */}
        <div 
          id="overview-cofre-card"
          className="lg:col-span-2 p-8 rounded-2xl border border-[#241E30] bg-[#14101B] relative overflow-hidden flex flex-col justify-between group shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        >
          {/* Spatial luxury subtle glowing top linear line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5521B6]/30 to-transparent" />
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#9c94b0] uppercase block">EXCLUSIVO // COFRE VUSK CLUB</span>
                <h3 className="text-xs font-mono font-bold tracking-widest text-[#F8F7FF] uppercase">SALDO FINANCEIRO DISPONÍVEL</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#5521B6]/10 border border-[#241E30] flex items-center justify-center text-[#5521B6] group-hover:scale-105 transition-all duration-300">
                <Wallet className="w-5 h-5" />
              </div>
            </div>

            <div className="py-2">
              <span className="text-xs text-[#9c94b0] font-mono block mb-1">DISPONÍVEL PARA RETIRADA</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-[#10b981] drop-shadow-[0_4px_20px_rgba(16,185,129,0.15)]">
                  R$ {balanceDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-mono text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/25 flex items-center gap-1">
                  ⚡ INSTANTÂNEO
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#241E30]">
              <div>
                <span className="text-[10px] text-[#9c94b0] font-mono uppercase block">Total Faturado Histórico</span>
                <span className="text-lg font-mono font-semibold text-[#F8F7FF]">
                  R$ {totalFaturado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#9c94b0] font-mono uppercase block">Taxa de Liberação PIX</span>
                <span className="text-lg font-mono font-semibold text-[#10b981]">
                  GRÁTIS ⚡
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              id="overview-open-withdaw-modal-btn"
              onClick={handleOpenWalletModal}
              className="w-full h-12 rounded-xl bg-[#10b981] hover:bg-emerald-600 font-mono text-xs font-bold tracking-wider text-[#0B080F] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.35)] hover:scale-[1.005] active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>Sacar Comissões via PIX Imediato ⚡</span>
            </button>
          </div>
        </div>

        {/* ========================================================== */}
        {/* CARD 2: A JORNADA DE CONQUISTAS (Premiações) - Ocupa 1 Coluna */}
        {/* ========================================================== */}
        <div 
          id="overview-jornada-card"
          className="p-8 rounded-2xl border border-[#241E30] bg-[#14101B] relative overflow-hidden flex flex-col justify-between group shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        >
          {/* Spatial luxury subtle glowing top linear line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5521B6]/30 to-transparent" />

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#9c94b0] uppercase block">PREMIAÇÕES FISÍCAS</span>
                <h3 className="text-xs font-mono font-bold tracking-widest text-[#F8F7FF] uppercase">JORNADA VUSK CLUB</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#5521B6]/10 border border-[#241E30] flex items-center justify-center text-[#5521B6] group-hover:scale-105 transition-all duration-300">
                <Award className="w-5 h-5" />
              </div>
            </div>

            {/* Next reward description */}
            <div className="space-y-1.5 p-4 rounded-xl border border-[#241E30] bg-[#0B080F]/50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-[#5521B6] animate-pulse" />
                <span className="text-xs font-bold text-[#F8F7FF]">Moletom Vusk Club Black-Elite</span>
              </div>
              <p className="text-[11px] text-[#9c94b0] leading-relaxed">
                Prêmio tátil exclusivo para parceiros que superarem a marca de R$ 1.000,00 faturados na plataforma.
              </p>
            </div>

            {/* Premium Vertical/Horizontal Progress Section with Spring Motion */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-[#9c94b0]">
                <span>Status de Vendas</span>
                <span>{targetPercent}%</span>
              </div>
              
              <div className="w-full h-2.5 bg-[#0B080F] border border-[#241E30] rounded-full overflow-hidden p-[2px]">
                {/* Framer motion spring bar animation */}
                <motion.div 
                  id="overview-jornada-progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${targetPercent}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#5521B6] to-[#7c3aed] relative shadow-[0_0_10px_rgba(85,33,182,0.5)]"
                />
              </div>

              <div className="text-[10px] font-mono text-center pt-1">
                {hasUnlockedReward ? (
                  <span className="text-[#10b981] font-bold flex items-center justify-center gap-1 uppercase">
                    💥 Meta Batida! Prêmio Liberado!
                  </span>
                ) : (
                  <span className="text-[#9c94b0]">
                    Faltam apenas <span className="text-[#5521B6] font-bold">R$ {missingAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> para o moletom.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-5">
            {hasUnlockedReward ? (
              <button
                id="overview-claim-reward-btn"
                onClick={() => claimLevelReward('Moletom Vusk Club Black-Elite')}
                className="w-full h-11 rounded-xl bg-[#5521B6] hover:bg-[#6d35d9] font-mono text-xs font-bold tracking-wider text-white transition-all duration-300 shadow-[0_4px_15px_rgba(85,33,182,0.3)] hover:scale-[1.01]"
              >
                Reivindicar Moletom 📦
              </button>
            ) : (
              <button
                disabled
                className="w-full h-11 rounded-xl bg-[#14101B] border border-[#241E30] text-[#9c94b0] font-mono text-xs flex items-center justify-center gap-2 cursor-not-allowed opacity-70"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Bloqueado (Meta de R$ 1.000)</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Second Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ========================================================== */}
        {/* CARD 3: VITRINE DE ATALHOS (Afiliação Rápida) - Ocupa 1 Coluna */}
        {/* ========================================================== */}
        <div 
          id="overview-vitrine-card"
          className="p-8 rounded-2xl border border-[#241E30] bg-[#14101B] relative overflow-hidden flex flex-col justify-between group shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        >
          {/* Spatial luxury subtle glowing top linear line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5521B6]/30 to-transparent" />

          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#9c94b0] uppercase block">Selecione e Fature</span>
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#F8F7FF] uppercase">AFILIAÇÃO RÁPIDA DE MINI-SAAS</h3>
            </div>

            {/* List of 3 available SaaS Products */}
            <div className="space-y-4">
              {affiliationProducts.map(product => {
                const isAffiliated = affiliations.some(a => a.product_id === product.id);
                const affiliationData = affiliations.find(a => a.product_id === product.id);
                // Safe ref_code derivation
                const refCode = affiliationData?.ref_code || `VUSK_${product.name.split(' ')[0].toUpperCase()}_GABRIEL`;

                return (
                  <div 
                    id={`overview-vitrine-product-row-${product.id}`}
                    key={product.id} 
                    className="p-3.5 rounded-xl border border-[#241E30] bg-[#0B080F]/50 flex items-center justify-between gap-3 hover:border-[#5521B6]/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      {/* Logo or placeholder letter */}
                      {product.logo_url ? (
                        <img 
                          src={product.logo_url} 
                          alt={product.name} 
                          className="w-9 h-9 rounded-lg object-cover border border-[#241E30]"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-[#5521B6]/15 border border-[#241E30] flex items-center justify-center text-[#F8F7FF] font-bold text-sm">
                          {product.name.charAt(0)}
                        </div>
                      )}

                      <div className="space-y-0.5">
                        <h4 className="text-[11px] font-bold text-[#F8F7FF] truncate max-w-[120px]">{product.name}</h4>
                        <span className="text-[9px] font-mono text-[#10b981] bg-[#10b981]/5 px-1.5 py-0.5 rounded border border-[#10b981]/15 leading-none block w-max">
                          Até {product.commission_percentage}% Comissário
                        </span>
                      </div>
                    </div>

                    {isAffiliated ? (
                      <button
                        id={`overview-copiar-link-btn-${product.id}`}
                        onClick={() => copyProductLinkToClipboard(product.id, refCode)}
                        className="py-1.5 px-3 rounded-lg bg-[#5521B6]/20 hover:bg-[#5521B6]/30 border border-[#5521B6]/40 text-[#F8F7FF] text-[10px] font-mono font-bold flex items-center gap-1.5 active:scale-95 transition-all"
                      >
                        {copiedProducts[product.id] ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#10b981]" />
                            <span className="text-[#10b981]">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#9c94b0]" />
                            <span>Link</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-[#9c94b0] bg-[#14101B] border border-[#241E30] px-2 py-1 rounded">
                        Sem afiliação
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6">
            <span className="text-[10px] text-[#9c94b0] font-mono text-center block italic">
              💡 Os links já incluem o seu identificador de parceiro com comissão automática direta.
            </span>
          </div>
        </div>

        {/* ========================================================== */}
        {/* CARD 4: ATIVIDADE EM TEMPO REAL (Últimas Vendas) - Ocupa 1 Coluna */}
        {/* ========================================================== */}
        <div 
          id="overview-atividades-card"
          className="p-8 rounded-2xl border border-[#241E30] bg-[#14101B] relative overflow-hidden flex flex-col justify-between group shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        >
          {/* Spatial luxury subtle glowing top linear line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5521B6]/30 to-transparent" />

          <div className="space-y-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#9c94b0] uppercase block">AUDITORIA AO VIVO</span>
                <h3 className="text-xs font-mono font-bold tracking-widest text-[#F8F7FF] uppercase">ATIVIDADE EM TEMPO REAL</h3>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                <span className="text-[9px] font-mono text-[#10b981] font-bold">ALERTA</span>
              </div>
            </div>

            {/* Sales feed list container */}
            <div className="space-y-3.5 flex-1 max-h-[240px] overflow-y-auto pr-1">
              {processedSales.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 bg-[#0B080F]/40 border border-[#241E30] rounded-xl text-center">
                  <span className="text-xs text-[#9c94b0] italic">Nenhuma venda gerada ainda.</span>
                </div>
              ) : (
                processedSales.map(sale => (
                  <div 
                    id={`overview-sale-row-${sale.id}`}
                    key={sale.id}
                    className="p-3 rounded-xl border border-[#241E30]/75 bg-[#0B080F]/45 hover:border-[#241E30] flex items-center justify-between gap-2.5 transition-all text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] text-[10px] font-bold shrink-0">
                        ✓
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-mono text-[10.5px] text-[#F8F7FF] truncate max-w-[125px]">
                          {maskEmailAddress(sale.customer_email)}
                        </h5>
                        <p className="text-[9px] text-[#9c94b0] truncate max-w-[120px]">
                          {sale.productName}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-[#10b981] block">
                        + R$ {sale.commission_value.toFixed(2)}
                      </span>
                      <span className="text-[8px] font-mono text-[#9c94b0] flex items-center justify-end gap-1 gap-x-0.5">
                        <Clock className="w-2.5 h-2.5 text-[#9c94b0]" />
                        {sale.relativeTime}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-6">
            <div className="p-3 bg-[#5521B6]/5 border border-[#5521B6]/10 rounded-xl flex items-center justify-between text-[10px] font-mono text-[#9c94b0]">
              <span>Rastreador de leads e cookies ativo</span>
              <span className="text-[#10b981] font-bold">100% OK</span>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* CARD 5: SCRIPT DE OURO (Dica do Bernardo) - Ocupa 1 Coluna */}
        {/* ========================================================== */}
        <div 
          id="overview-script-gold-card"
          className="p-8 rounded-2xl border border-[#241E30] bg-[#14101B] relative overflow-hidden flex flex-col justify-between group shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        >
          {/* Spatial luxury subtle glowing top linear line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5521B6]/30 to-transparent" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#9c94b0] uppercase block">Dica do Bernardo</span>
                <h3 className="text-xs font-mono font-bold tracking-widest text-[#F8F7FF] uppercase">SCRIPT DE OURO 🔥</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-all duration-300">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Text message from Bernardo */}
            <p className="text-[11px] text-[#9c94b0] italic leading-relaxed">
              &ldquo;{scriptDeOuro.quote}&rdquo;
            </p>

            {/* Script Block Area */}
            <div className="relative p-3.5 rounded-xl bg-[#0B080F] border border-[#241E30] group/script">
              <div className="max-h-[140px] overflow-y-auto text-[10.5px] font-mono text-[#F8F7FF] leading-relaxed whitespace-pre-wrap select-all pr-1">
                {scriptDeOuro.body}
              </div>

              {/* Float copy script action */}
              <button
                id="overview-copiar-script-ouro-btn"
                onClick={() => copyGoldScriptToClipboard(scriptDeOuro.body)}
                className="absolute right-2 top-2 p-1.5 rounded-lg bg-[#14101B] border border-[#241E30] hover:border-[#5521B6] text-[#9c94b0] hover:text-[#F8F7FF] transition-all active:scale-95"
                title="Copiar Script Copioso"
              >
                {copiedScript ? (
                  <Check className="w-3.5 h-3.5 text-[#10b981]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-5">
            <button
              id="overview-copiar-script-ouro-btn-large"
              onClick={() => copyGoldScriptToClipboard(scriptDeOuro.body)}
              className="w-full h-11 rounded-xl bg-[#5521B6]/15 hover:bg-[#5521B6]/30 border border-[#5521B6]/30 hover:border-[#5521B6]/60 text-xs font-mono text-[#F8F7FF] flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              {copiedScript ? (
                <>
                  <Check className="w-4 h-4 text-[#10b981]" />
                  <span className="text-[#10b981]">Script Copiado!</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 text-[#9c94b0]" />
                  <span>Copiar Script de Abordagem</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================== */}
      {/* PREMIUM GLASSMORPHISM MODAL: SAQUE PIX (COFRE) - AnimatePresence */}
      {/* ========================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            id="overview-withdraw-pix-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B080F]/80 backdrop-blur-md"
          >
            {/* Modal Box */}
            <motion.div
              id="overview-withdraw-pix-modalbox"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              className="w-full max-w-lg p-8 rounded-2xl border border-[#241E30] bg-[#14101B]/95 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative space-y-7 overflow-hidden"
            >
              {/* Top ambient lights indicator inside the modal */}
              <div className="absolute top-[-30px] left-[50%] -translate-x-1/2 w-48 h-12 bg-[#5521B6]/20 blur-xl rounded-full" />

              {/* Close Button Header */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
                    <Wallet className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono font-bold text-[#F8F7FF] tracking-wider uppercase">COFRE // RETIRADA IMEDIATA</h3>
                    <span className="text-[10px] text-[#9c94b0] font-mono block">MÍNIMO REQUERIDO: R$ 20,00</span>
                  </div>
                </div>
                <button
                  id="overview-close-withdraw-modal-btn"
                  onClick={handleCloseWalletModal}
                  disabled={isProcessing}
                  className="p-1.5 rounded-lg border border-[#241E30] hover:border-[#5521B6] text-[#9c94b0] hover:text-[#F8F7FF] transition-all disabled:opacity-50"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Current balance indicator box */}
              <div className="p-4 rounded-xl border border-[#241E30] bg-[#0B080F]/40 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-[#9c94b0] font-mono uppercase block">Saldo Líquido Disponível</span>
                  <span className="text-xl font-mono font-bold text-[#10b981]">
                    R$ {balanceDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-[#9c94b0] font-mono uppercase block">Chave PIX Cadastrada</span>
                  <span className="text-xs font-mono font-semibold text-[#F8F7FF] italic">
                    {currentUser.pix_key || 'Chave pendente'}
                  </span>
                </div>
              </div>

              {/* Submission Form */}
              <form onSubmit={executePayoutWithTactileFeedback} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#9c94b0] font-mono uppercase tracking-wider block">VALOR PARA EXTRAIR (R$)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-[#9c94b0] font-mono text-xs select-none">R$</span>
                    <input
                      id="overview-withdraw-amount-input"
                      type="number"
                      step="0.01"
                      min="20"
                      required
                      placeholder="Ex: 250.00"
                      disabled={isProcessing}
                      value={withdrawAmount}
                      onChange={e => setWithdrawAmount(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-[#0B080F] border border-[#241E30] hover:border-[#5521B6]/50 focus:border-[#5521B6] text-xs font-mono text-[#F8F7FF] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#5521B6] transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#9c94b0] font-mono uppercase tracking-wider block">CHAVE PIX DESTINATÁRIA</label>
                  <input
                    id="overview-withdraw-pix-key-input"
                    type="text"
                    required
                    disabled={isProcessing}
                    placeholder="E-mail, CPF, CNPJ ou telefone"
                    value={pixKey}
                    onChange={e => setPixKey(e.target.value)}
                    className="w-full h-11 px-4 bg-[#0B080F] border border-[#241E30] hover:border-[#5521B6]/50 focus:border-[#5521B6] text-xs text-[#F8F7FF] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#5521B6] transition-all disabled:opacity-60"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="overview-confirm-payout-btn"
                    disabled={isProcessing}
                    className="w-full h-12 rounded-xl bg-[#10b981] disabled:bg-emerald-800 hover:bg-emerald-600 font-mono text-xs font-bold tracking-wider text-[#0B080F] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(16,185,129,0.15)]"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#0B080F]" />
                        <span>Processando robôs integrados...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirmar Transferência Instantânea ⚡</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Footnote */}
              <p className="text-[10px] font-mono text-center text-[#9c94b0] italic">
                🔒 Nosso motor automatizado dispara o PIX imediatamente. Tolerância de conexões de até 5 segundos.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
