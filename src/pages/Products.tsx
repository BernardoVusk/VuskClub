/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Package, 
  ChevronRight, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Video, 
  FileText, 
  MessageSquare,
  Search,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const Products: React.FC = () => {
  const { 
    products, 
    requestAffiliation, 
    getAffiliationForProduct, 
    lessons, 
    saleScripts,
    showNotification,
    currentUser
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductDetails, setSelectedProductDetails] = useState<string | null>(null);

  // Clipboard state
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

  const handleCopyLink = (id: string, refLink: string) => {
    navigator.clipboard.writeText(refLink);
    setCopiedLinkId(id);
    showNotification('success', 'Seu Link de Afiliado Exclusivo foi copiado! Copie e divulgue para comissionar! ⚡');
    setTimeout(() => {
      setCopiedLinkId(null);
    }, 3000);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Search Header Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-vusk-card/40 border border-vusk-border p-4 rounded-xl glass-effect">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-vusk-text-secondary" />
          <input
            id="products-search-bar"
            type="text"
            placeholder="Pesquisar SaaS validados para se afiliar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10.5 pr-4 bg-vusk-bg border border-vusk-border focus:border-vusk-purple focus:outline-none rounded-lg text-xs font-mono text-vusk-secondary placeholder-vusk-text-secondary/50"
          />
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/5 px-3 py-2 rounded-lg border border-emerald-500/10">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>AFILIAÇÕES INSTANTÂNEAS E COMISSÃO DE ATÉ 60%</span>
        </div>
      </div>

      {/* Main Grid display layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const affiliation = getAffiliationForProduct(product.id);
          const isAffiliated = !!affiliation;
          const detailsOpen = selectedProductDetails === product.id;

          // Custom generated affiliation link
          const mockRefLink = affiliation 
            ? `https://vusk.club/ref/${affiliation.ref_code}`
            : '';

          // Gather dedicated product specs
          const productLessons = lessons.filter(l => l.product_id === product.id);
          const productScripts = saleScripts.filter(s => s.product_id === product.id);

          return (
            <div
              id={`product-card-${product.id}`}
              key={product.id}
              className={`rounded-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative group ${
                detailsOpen 
                  ? 'border-vusk-purple bg-gradient-to-b from-vusk-card/50 to-purple-950/10' 
                  : 'border-vusk-border bg-vusk-card/30 hover:border-vusk-purple/20'
              }`}
            >
              {/* Product Logo / Card Header info */}
              <div className="p-5.5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-13 h-13 rounded-xl border border-white/10 overflow-hidden shrink-0">
                    <img 
                      src={product.logo_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <span className="text-[10px] uppercase font-mono px-2.5 py-1 bg-vusk-purple/20 border border-vusk-purple/30 text-vusk-secondary rounded-lg font-bold">
                    {product.commission_percentage}% Comiss
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold text-[#F8F7FF] mb-0.5">
                    {product.name}
                  </h3>
                  <p className="text-[11px] font-mono text-vusk-purple tracking-wide leading-relaxed">
                    {product.tagline}
                  </p>
                  <p className="text-xs text-[#9c94b0] leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Affiliate link or request action button */}
              <div className="px-5.5 pb-5.5 pt-2 space-y-3.5 border-t border-vusk-border/40 bg-[#0B080F]/10">
                {isAffiliated ? (
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-widest block uppercase">
                      ✓ Você é Afiliado do Produto
                    </span>
                    <div className="flex gap-2">
                      <div className="flex-1 h-9 px-2.5 bg-vusk-bg border border-vusk-border rounded-lg flex items-center overflow-hidden min-w-0">
                        <span className="text-[10px] font-mono text-[#9c94b0] truncate select-all">
                          {mockRefLink}
                        </span>
                      </div>
                      <button
                        id={`copy-ref-link-${product.id}`}
                        onClick={() => handleCopyLink(product.id, mockRefLink)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${
                          copiedLinkId === product.id
                            ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30'
                            : 'bg-vusk-purple/15 text-vusk-secondary border-vusk-purple/30 hover:bg-vusk-purple hover:text-white'
                        }`}
                        title="Copiar link de afiliado"
                      >
                        {copiedLinkId === product.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    id={`request-aff-btn-${product.id}`}
                    onClick={() => requestAffiliation(product.id)}
                    className="w-full h-10 px-4 bg-vusk-purple hover:bg-vusk-purple/95 border border-vusk-purple text-vusk-secondary hover:text-white rounded-lg text-xs font-mono font-bold tracking-wide transition-all shadow-[0_4px_15px_rgba(85,33,182,0.25)] hover:scale-[1.01] active:scale-95"
                  >
                    Solicitar Afiliação Instantânea R$ ⚡
                  </button>
                )}

                {/* Expanding footer info toggle toggle */}
                <button
                  id={`toggle-details-btn-${product.id}`}
                  onClick={() => setSelectedProductDetails(detailsOpen ? null : product.id)}
                  className="w-full flex items-center justify-between text-[11px] font-mono text-[#9c94b0] hover:text-vusk-secondary py-1.5 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-vusk-purple" />
                    <span>Materiais, Roteiros e Aulas</span>
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${detailsOpen ? 'rotate-90 text-vusk-purple' : ''}`} />
                </button>
              </div>

              {/* Sliding details subsection inside product card */}
              {detailsOpen && (
                <div className="p-5.5 pt-0 border-t border-vusk-border/40 bg-vusk-bg/30 text-xs text-[#9c94b0] space-y-4 animate-fade-in">
                  <div className="border-b border-[#241E30] pb-2.5">
                    <h5 className="text-[10px] font-mono text-vusk-secondary uppercase font-bold mb-1">Ficha Técnica de Afiliado</h5>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-vusk-bg/50 p-2.5 rounded-lg border border-vusk-border/40">
                      <div>
                        <span className="text-[#9c94b0] block text-[9px]">DIREITO DE CONVERSÃO:</span>
                        <strong className="text-white">Cookieset vitalício</strong>
                      </div>
                      <div>
                        <span className="text-[#9c94b0] block text-[9px]">DURAÇÃO COMISSÃO:</span>
                        <strong className="text-white">Último clique</strong>
                      </div>
                    </div>
                  </div>

                  {/* Materials & scripts summary specs */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-mono text-vusk-secondary uppercase font-bold">Resumo dos Materiais de Apoio</h5>
                    <ul className="space-y-1.5 text-[11px] list-disc list-inside">
                      <li>{productLessons.length} treinamentos práticos de escala</li>
                      <li>{productScripts.length} criativos de copy de elite prontos</li>
                      <li>Drive de criativos em formato alta definição 4K</li>
                    </ul>

                    <div className="pt-2">
                      <p className="text-[10pt] text-vusk-secondary">
                        Acesse as abas <strong className="text-vusk-purple uppercase">Treinamentos</strong> e <strong className="text-vusk-purple uppercase">Arquivos</strong> no menu lateral para visualizar e fazer o download de todos os ativos associados!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
