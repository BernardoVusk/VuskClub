/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FolderOpen, 
  ExternalLink, 
  Download, 
  FileImage, 
  FileText, 
  Video, 
  Layers, 
  Search, 
  Check, 
  Sparkles,
  Palette
} from 'lucide-react';

interface MarketingAsset {
  id: string;
  productId: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'canva' | 'drive';
  size: string;
  format: string;
  url: string;
  thumbnail?: string;
}

export const Files: React.FC = () => {
  const { products, getAffiliationForProduct, showNotification } = useApp();
  const [selectedProductId, setSelectedProductId] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // High quality realistic marketing files data
  const premiumAssets: MarketingAsset[] = [
    {
      id: 'ast-01',
      productId: 'prod-01',
      name: 'Criativos em Vídeo TikTok & Reels (Foco em Comentários)',
      type: 'video',
      size: '142 MB',
      format: 'MP4 1080x1920',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80'
    },
    {
      id: 'ast-02',
      productId: 'prod-01',
      name: 'Template do Canva Editável - Carrosséis Rápidos',
      type: 'canva',
      size: 'Feed & Stories',
      format: 'Direct Canva Link',
      url: 'https://canva.com/design/vusk-audius-template'
    },
    {
      id: 'ast-03',
      productId: 'prod-01',
      name: 'Drive de Criativos Oficiais e Provas Sociais de Ganhos',
      type: 'drive',
      size: 'Pasta Nuvem',
      format: 'Google Drive',
      url: 'https://drive.google.com/drive/folders/vusk-audius-proofs'
    },
    {
      id: 'ast-04',
      productId: 'prod-02',
      name: 'Logo Oficial GhostWriter PRO (Vetorizado + PNG transparente)',
      type: 'image',
      size: '4.5 MB',
      format: 'SVG / PNG 4K',
      url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=150',
      thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&q=80'
    },
    {
      id: 'ast-05',
      productId: 'prod-02',
      name: 'PDF Script Completo de Vendas - Whatsapp 1X1',
      type: 'document',
      size: '1.2 MB',
      format: 'PDF de Instrução',
      url: 'https://vusk.club/assets/ghostwriter-playbook.pdf'
    },
    {
      id: 'ast-06',
      productId: 'prod-02',
      name: 'Banco de Anúncios Ganhadores da Semana (Criativos Estáticos)',
      type: 'image',
      size: '22 MB',
      format: 'ZIP (JPEG 4K)',
      url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=400&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=400&q=80'
    },
    {
      id: 'ast-07',
      productId: 'prod-03',
      name: 'Cortes Virais de Demonstração (Prontos p/ Postar TikTok)',
      type: 'video',
      size: '210 MB',
      format: 'ZIP (MP4 vertical)',
      url: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=150',
      thumbnail: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400&q=80'
    },
    {
      id: 'ast-08',
      productId: 'prod-03',
      name: 'Layout de Página de Lançamento (JSON Elementor)',
      type: 'document',
      size: '480 KB',
      format: 'JSON Elementor',
      url: 'https://vusk.club/assets/viralsync-landing.json'
    }
  ];

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(id);
    showNotification('success', 'Link do material de apoio copiado para a área de transferência! 🚀');
    setTimeout(() => {
      setCopiedLink(null);
    }, 3000);
  };

  const filteredAssets = selectedProductId === 'all'
    ? premiumAssets
    : premiumAssets.filter(a => a.productId === selectedProductId);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'video':
        return { label: 'VÍDEO', icon: Video, color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
      case 'image':
        return { label: 'IMAGEM', icon: FileImage, color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' };
      case 'canva':
        return { label: 'CANVA DESIGN', icon: Palette, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' };
      case 'document':
        return { label: 'DOCUMENTO', icon: FileText, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
      case 'drive':
        return { label: 'GOOGLE DRIVE', icon: FolderOpen, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      default:
        return { label: 'ARQUIVO', icon: Layers, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Intro banner */}
      <div className="p-6 rounded-2xl border border-vusk-border bg-vusk-card/30 glass-effect flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 text-vusk-purple">
            <Sparkles className="w-4.5 h-4.5" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">KIT DE MARCA & ANÚNCIOS</span>
          </div>
          <h3 className="text-lg font-stretch tracking-wider text-[#F8F7FF] uppercase">Kit de Divulgação Profissional</h3>
          <p className="text-xs text-[#9c94b0] max-w-2xl leading-relaxed">
            Tenha acesso instantâneo a todos os materiais de marketing validados desenvolvidos diretamente pelos donos dos produtos. Use criativos estáticos e lives de demonstrações para engajar seu público orgânico ou pago.
          </p>
        </div>

        {/* Filter Selection drop */}
        <div className="flex items-center gap-3 shrink-0 z-10">
          <span className="text-[10px] text-[#9c94b0] font-mono uppercase">Selecionar Produto:</span>
          <select
            id="files-product-filter"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="h-10 px-3.5 bg-vusk-bg border border-vusk-border rounded-lg text-xs font-mono text-vusk-secondary focus:border-vusk-purple focus:outline-none"
          >
            <option value="all">TODOS OS MATERIAIS</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid displays assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const matchingProduct = products.find(p => p.id === asset.productId);
          const meta = getTypeBadge(asset.type);
          const MetaIcon = meta.icon;
          const isAffiliated = !!getAffiliationForProduct(asset.productId);

          return (
            <div
              id={`asset-card-${asset.id}`}
              key={asset.id}
              className="rounded-xl border border-vusk-border bg-vusk-card/30 hover:border-vusk-purple/20 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
            >
              {/* Asset Preview Thumbnail */}
              {asset.thumbnail ? (
                <div className="w-full h-42 overflow-hidden relative border-b border-vusk-border/60">
                  <img 
                    src={asset.thumbnail} 
                    alt={asset.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B080F] to-transparent opacity-60" />
                </div>
              ) : (
                <div className="w-full h-24 bg-vusk-purple/5 border-b border-vusk-border/40 flex items-center justify-center">
                  <MetaIcon className="w-8 h-8 opacity-25 text-vusk-purple" />
                </div>
              )}

              {/* Card Context Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-[#9c94b0] font-mono">
                      {matchingProduct?.name || 'VUSK CLUB'}
                    </span>
                    <span className={`text-[8px] font-bold font-mono px-2 py-0.5 rounded-md border ${meta.color} flex items-center gap-1`}>
                      <MetaIcon className="w-3 h-3" />
                      {meta.label}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-[#F8F7FF] line-clamp-2 leading-relaxed min-h-8">
                    {asset.name}
                  </h4>
                </div>

                <div className="space-y-3 pt-2">
                  {/* File specifications meta */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#9c94b0] bg-vusk-bg/40 p-2 rounded-lg border border-vusk-border/40">
                    <span>Espaço: {asset.size}</span>
                    <span>Formato: {asset.format}</span>
                  </div>

                  {/* Actions buttons */}
                  {!isAffiliated ? (
                    <div className="text-[10px] font-mono text-amber-400 text-center bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                      ⚠️ Requer afiliação ativa para divulgar
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id={`copy-asset-link-${asset.id}`}
                        onClick={() => handleCopyLink(asset.id, asset.url)}
                        className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                          copiedLink === asset.id
                            ? 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30'
                            : 'bg-vusk-purple/15 text-vusk-secondary border-vusk-purple/30 hover:bg-vusk-purple hover:text-white'
                        }`}
                      >
                        {copiedLink === asset.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copiado ✓</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Pegar Link</span>
                          </>
                        )}
                      </button>

                      <a
                        id={`download-asset-${asset.id}`}
                        href={asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 text-xs font-mono bg-vusk-bg hover:bg-white/[0.04] border border-vusk-border text-vusk-secondary rounded-lg flex items-center justify-center gap-1.5 transition-all text-center"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
