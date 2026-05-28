/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Plus, 
  MessageSquare, 
  Instagram, 
  Video, 
  VolumeX, 
  Terminal,
  ArrowRight,
  BrainCircuit,
  Settings
} from 'lucide-react';

export const Scripts: React.FC = () => {
  const { 
    saleScripts, 
    products, 
    affiliations, 
    currentUser, 
    addSaleScript, 
    showNotification 
  } = useApp();

  // Active platform tab
  const [activePlatform, setActivePlatform] = useState<'whatsapp' | 'instagram_direct' | 'tiktok_organic' | 'facebook_ads'>('whatsapp');
  
  // Create state to search/filter scripts by Product
  const [selectedProductId, setSelectedProductId] = useState<string>('all');

  // Clip feedback status
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  // Producer state to create script manually
  const [showAddScript, setShowAddScript] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newProdId, setNewProdId] = useState(products[0]?.id || '');

  // AI Copilot State
  const [aiPrompt, setAiPrompt] = useState('');
  const [targetScriptId, setTargetScriptId] = useState<string>('custom');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  if (!currentUser) return null;

  const isProducer = currentUser.role === 'producer';

  // Format and replace placeholders inside scripts
  const formatScriptContent = (content: string, productId: string) => {
    // Find affiliation ref code for this active user
    const aff = affiliations.find(a => a.product_id === productId && a.profile_id === currentUser.id);
    const refCode = aff ? aff.ref_code : 'VUSKREF';
    const finalUrl = `https://vusk.club/ref/${refCode}`;
    return content.replace(/{checkout_link}/g, finalUrl);
  };

  const handleCopyScript = (scriptId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptId(scriptId);
    showNotification('success', 'Script personalizado copiado para a área de transferência! Prontinho para colar. 🔥');
    setTimeout(() => {
      setCopiedScriptId(null);
    }, 3000);
  };

  const handleCreateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent || !newProdId) {
      showNotification('error', 'Alguns campos obrigatórios estão vazios.');
      return;
    }

    addSaleScript({
      title: newTitle,
      content: newContent,
      product_id: newProdId,
      platform: activePlatform
    });

    setNewTitle('');
    setNewContent('');
    setShowAddScript(false);
  };

  const handleAICopilotOptimization = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt) {
      showNotification('error', 'Por favor, escreva o que você deseja que a inteligência artificial faça.');
      return;
    }

    setAiGenerating(true);
    setAiResponse(null);

    // Grab original script values if referencing an existing copy
    let contextTitle = 'Geração Customizada';
    let contextContent = '';
    let currentProd = products[0]?.id;

    if (targetScriptId !== 'custom') {
      const match = saleScripts.find(s => s.id === targetScriptId);
      if (match) {
        contextTitle = match.title;
        contextContent = match.content;
        currentProd = match.product_id;
      }
    }

    // Get affiliation code
    const aff = affiliations.find(a => a.product_id === currentProd && a.profile_id === currentUser.id);
    const refCode = aff ? aff.ref_code : 'VUSKREF';

    try {
      const response = await fetch('/api/copypilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          platform: activePlatform,
          title: contextTitle,
          code: refCode,
          context: contextContent,
          prompt: aiPrompt
        })
      });

      const data = await response.json();

      if (data.success) {
        setAiResponse(data.text);
        showNotification('success', 'Roteiro de conversão otimizado com IA com sucesso! 🧠');
      } else {
        // Fallback or Simulated content due to API key missing
        if (data.error === 'GEMINI_API_KEY_MISSING') {
          setAiResponse(data.simulatedText);
          showNotification('info', 'Chave ausente: Demonstração ativada de forma graciosa!');
        } else {
          showNotification('error', data.message || 'Erro ao gerar cópia via IA.');
        }
      }
    } catch (err) {
      console.error(err);
      showNotification('error', 'Falha ao conectar com o servidor do Copilot.');
    } finally {
      setAiGenerating(false);
    }
  };

  // Filter scripts based on selected platform AND product
  const filteredScripts = saleScripts.filter(s => {
    const isPlatform = s.platform === activePlatform;
    const isProduct = selectedProductId === 'all' || s.product_id === selectedProductId;
    return isPlatform && isProduct;
  });

  const platformMeta = {
    whatsapp: { label: 'WhatsApp direct', icon: MessageSquare, color: 'text-emerald-400' },
    instagram_direct: { label: 'Instagram Direct', icon: Instagram, color: 'text-pink-400' },
    tiktok_organic: { label: 'TikTok Orgânico', icon: Video, color: 'text-cyan-400' },
    facebook_ads: { label: 'Facebook / Meta Ads', icon: Terminal, color: 'text-sky-400' }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Upper filter bar row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-vusk-card/40 border border-vusk-border p-4 rounded-xl glass-effect">
        {/* Platform tabs selection */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {(Object.keys(platformMeta) as Array<keyof typeof platformMeta>).map((plat) => {
            const Icon = platformMeta[plat].icon;
            const active = activePlatform === plat;
            return (
              <button
                id={`plat-tab-${plat}`}
                key={plat}
                onClick={() => {
                  setActivePlatform(plat);
                  setAiResponse(null);
                }}
                className={`px-3 py-2 text-xs font-mono tracking-wider font-semibold rounded-lg shrink-0 flex items-center gap-2 transition-all ${
                  active 
                    ? 'bg-vusk-purple text-vusk-secondary shadow-[0_4px_15px_rgba(85,33,182,0.2)]' 
                    : 'text-vusk-text-secondary hover:text-vusk-secondary hover:bg-white/[0.03]'
                }`}
              >
                <Icon className={`w-4 h-4 ${platformMeta[plat].color}`} />
                <span>{platformMeta[plat].label.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Dropdown product filter */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[10px] text-vusk-text-secondary font-mono uppercase">Filtrar por produto:</span>
          <select
            id="product-copy-filter"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="h-9 px-3 bg-vusk-bg border border-vusk-border rounded-lg text-xs font-mono text-vusk-secondary focus:border-vusk-purple focus:outline-none"
          >
            <option value="all">TODOS OS MINI-SAAS</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: 2 columns split. Left: List of template copies. Right: AI Copilot Assistant Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        {/* Left lists (3 Span) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-stretch tracking-wider text-vusk-secondary uppercase">
                ROTEIROS DE ELITE // {platformMeta[activePlatform].label}
              </h4>
              <p className="text-[11px] text-[#9c94b0] mt-0.5">Clique para copiar instantaneamente. Os links de {`{checkout_link}`} são convertidos dinamicamente.</p>
            </div>

            {isProducer && (
              <button
                id="toggle-add-script-btn"
                onClick={() => setShowAddScript(!showAddScript)}
                className="px-3 py-1.5 h-8 border border-vusk-purple/50 hover:bg-vusk-purple bg-vusk-purple/10 rounded-lg text-[10px] font-mono text-vusk-secondary hover:text-white transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Novo Roteiro</span>
              </button>
            )}
          </div>

          {/* Form to add manual scripts (Producer-only) */}
          {isProducer && showAddScript && (
            <form onSubmit={handleCreateScript} className="p-4 rounded-xl border border-vusk-border bg-vusk-card/30 glass-effect space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#9c94b0] font-mono block">TÍTULO DO ROTEIRO *</label>
                  <input
                    id="new-script-title"
                    type="text"
                    required
                    placeholder="Abordagem pós-comentário quente"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full h-10 px-3 bg-vusk-bg border border-vusk-border rounded-lg text-xs text-vusk-secondary focus:border-vusk-purple focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[#9c94b0] font-mono block font-bold">VINCULAR PRODUTO *</label>
                  <select
                    id="new-script-product"
                    value={newProdId}
                    onChange={e => setNewProdId(e.target.value)}
                    className="w-full h-10 px-3 bg-vusk-bg border border-vusk-border rounded-lg text-xs font-mono text-vusk-secondary focus:border-vusk-purple focus:outline-none"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#9c94b0] font-mono block">CÓPIA / ESBOÇO DO SCRIPT (Use {`{checkout_link}`} para converter dinamicamente)</label>
                <textarea
                  id="new-script-content"
                  rows={4}
                  required
                  placeholder="Seu roteiro matador do whatsapp..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  className="w-full p-3 bg-vusk-bg border border-vusk-border rounded-lg text-xs text-vusk-secondary focus:border-vusk-purple focus:outline-none font-sans"
                />
              </div>

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  id="cancel-add-script-btn"
                  onClick={() => setShowAddScript(false)}
                  className="px-3 py-1.5 rounded-lg border border-vusk-border hover:bg-white/[0.02] text-[10px] font-mono text-[#9c94b0]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  id="submit-add-script-btn"
                  className="px-4 py-1.5 rounded-lg bg-vusk-purple text-vusk-secondary hover:text-white transition-all text-[10px] font-mono font-bold"
                >
                  Salvar Roteiro 💾
                </button>
              </div>
            </form>
          )}

          {/* Scripts loop */}
          {filteredScripts.length === 0 ? (
            <div className="p-8 rounded-xl border border-vusk-border bg-vusk-card/10 text-center">
              <VolumeX className="w-8 h-8 text-[#9c94b0] mx-auto mb-2 opacity-50" />
              <p className="text-xs text-[#9c94b0]">Nenhum roteiro cadastrado para este produto nesta plataforma.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredScripts.map((script) => {
                const associatedProduct = products.find(p => p.id === script.product_id);
                const formattedText = formatScriptContent(script.content, script.product_id);

                return (
                  <div 
                    id={`script-card-${script.id}`}
                    key={script.id} 
                    className="p-5 rounded-xl border border-vusk-border bg-vusk-card/30 glass-effect relative group hover:border-vusk-purple/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-vusk-purple/20 border border-vusk-purple/30 text-vusk-text-secondary mr-2">
                          {associatedProduct?.name || 'VUSK CLUB'}
                        </span>
                        <h5 className="text-xs font-bold text-vusk-secondary inline-block">{script.title}</h5>
                      </div>

                      <button
                        id={`copy-script-action-btn-${script.id}`}
                        onClick={() => handleCopyScript(script.id, formattedText)}
                        className={`px-2.5 py-1.5 rounded bg-vusk-bg hover:bg-vusk-purple/10 border border-vusk-border transition-all flex items-center gap-1.5 ${
                          copiedScriptId === script.id
                            ? 'text-[#10b981] border-[#10b981]/40 bg-[#10b981]/5'
                            : 'text-[#9c94b0] hover:text-vusk-secondary hover:border-vusk-purple/40'
                        }`}
                        title="Copiar Roteiro Prontinho"
                      >
                        {copiedScriptId === script.id ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span className="text-[9px] font-mono">Copiado ✓</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[9px] font-mono">Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-[#f8f7ff]/95 leading-relaxed font-sans whitespace-pre-wrap bg-vusk-bg/40 p-3.5 rounded-lg border border-vusk-border/40">
                      {formattedText}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Section Copilot Assistant Editor (2 Span) */}
        <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-28">
          <div className="p-5 rounded-xl border border-vusk-border bg-gradient-to-br from-vusk-card/60 to-purple-950/20 glow-card space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-vusk-purple animate-pulse" />
                <h4 className="text-sm font-stretch tracking-wider text-vusk-secondary">GEMINI AI // COPILOT DE COPYWRITING</h4>
              </div>
              <p className="text-[10px] text-[#9c94b0] leading-relaxed">
                Nossa IA inteligente analisa os anúncios de maior conversão nacionais para reescrever e amolar seu script de afiliação ou criar ganchos orgânicos.
              </p>
            </div>

            <form onSubmit={handleAICopilotOptimization} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-[#9c94b0] font-mono block">1. QUAL ROTEIRO VOCÊ DESEJA MELHORAR?</label>
                <select
                  id="ai-script-context-dropdown"
                  value={targetScriptId}
                  onChange={(e) => setTargetScriptId(e.target.value)}
                  className="w-full h-10 px-3 bg-vusk-bg border border-vusk-border rounded-lg text-xs font-mono text-vusk-secondary focus:border-vusk-purple focus:outline-none"
                >
                  <option value="custom">Nenhum (Começar um Novo do zero)</option>
                  {saleScripts.filter(s => s.platform === activePlatform).map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#9c94b0] font-mono block">2. PEÇA À CONTROLLER DO VUSK CLUB SEU TIPO DE COPY</label>
                <textarea
                  id="ai-prompt-instruction"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ex: Torne o gancho mais agressivo para atrair adolescentes no TikTok, focando em liberdade e em testar de graça por 7 dias."
                  rows={4}
                  className="w-full p-3 bg-vusk-bg border border-vusk-border rounded-lg text-xs text-vusk-secondary focus:border-vusk-purple focus:outline-none placeholder-vusk-text-secondary/50 font-sans"
                />
              </div>

              <button
                type="submit"
                id="ai-generate-submit-btn"
                disabled={aiGenerating}
                className="w-full py-2.5 px-4 rounded-lg bg-vusk-purple hover:bg-vusk-purple/90 border border-vusk-purple text-vusk-secondary hover:text-white transition-all duration-300 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(85,33,182,0.25)] hover:scale-[1.01] disabled:opacity-50 disabled:pointer-events-none"
              >
                {aiGenerating ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-vusk-secondary border-t-transparent animate-spin" />
                    <span>Gerando Roteiros de Conversão...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Amolar Roteiro com Gemini AI 🚀</span>
                  </>
                )}
              </button>
            </form>

            {/* AI Copy result output */}
            {aiResponse && (
              <div className="p-4 bg-vusk-bg/85 border border-vusk-purple/35 rounded-lg space-y-3.5 relative animate-fade-in-up">
                <div className="flex items-center justify-between border-b border-vusk-border/80 pb-2">
                  <span className="text-[9px] font-mono text-[#10b981] font-bold tracking-widest flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 animate-pulse" />
                    <span>Roteiro Exclusivo Gerado</span>
                  </span>

                  <button
                    id="copy-ai-response-btn"
                    onClick={() => handleCopyScript('ai-response', aiResponse)}
                    className="p-1 px-2.5 bg-vusk-purple/20 hover:bg-vusk-purple border border-vusk-border text-[9px] font-mono text-vusk-secondary rounded flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copiar AI copy</span>
                  </button>
                </div>

                <div className="text-xs text-vusk-secondary leading-relaxed font-sans whitespace-pre-wrap select-all selection:bg-vusk-purple/40 max-h-56 overflow-y-auto">
                  {aiResponse}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
