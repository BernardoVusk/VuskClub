/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Profile, Product, Affiliation, Lesson, SaleScript, Sale, Payout, GamificationLevel } from './types';

// Seed Products
export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Audius Automation',
    tagline: 'Filtro de directs para viralização e funil de vendas automático',
    description: 'Transforme interações e comentários em leads qualificados instantaneamente. Nosso robô integra-se com APIs seguras para disparar ofertas no direct do Instagram exatamente quando alguém comenta nas suas postagens ou reels.',
    logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    checkout_url: 'https://checkout.vusk.club/audius-automation',
    commission_percentage: 60,
    created_at: '2026-01-10T12:00:00Z'
  },
  {
    id: 'prod-02',
    name: 'GhostWriter PRO',
    tagline: 'Copilot de Copywriting treinado nos anúncios que mais faturam no país',
    description: 'Uma ferramenta revolucionária de inteligência artificial focada exclusivamente em gerar directs, páginas de vendas, scripts de WhatsApp de altíssima conversão. Esqueça o bloqueio criativo.',
    logo_url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=150&auto=format&fit=crop&q=80',
    checkout_url: 'https://checkout.vusk.club/ghostwriter-pro',
    commission_percentage: 50,
    created_at: '2026-02-15T15:30:00Z'
  },
  {
    id: 'prod-03',
    name: 'ViralSync SaaS',
    tagline: 'Multiplicador de cortes virais de vídeos longos guiado por retenção',
    description: 'Faça upload de qualquer podcast ou vídeo do YouTube e receba em segundos dezenas de cortes otimizados verticalmente para TikTok, YouTube Shorts e Instagram Reels com legendas dinâmicas.',
    logo_url: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=150&auto=format&fit=crop&q=80',
    checkout_url: 'https://checkout.vusk.club/viralsync-saas',
    commission_percentage: 55,
    created_at: '2026-03-20T09:15:00Z'
  }
];

// Seed Training Lessons
export const SEED_LESSONS: Lesson[] = [
  {
    id: 'les-01',
    product_id: 'prod-01',
    title: 'Dominando o Tráfego Orgânico no Instagram',
    description: 'Aprenda a criar reels magnéticos de 15 segundos que induzem o usuário a comentar uma palavra-chave para acionar o funil da Audius Automation.',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Standard stable embed
    sequence_order: 1,
    duration_minutes: 12,
    created_at: '2026-01-12T10:00:00Z'
  },
  {
    id: 'les-02',
    product_id: 'prod-01',
    title: 'Configurando o Robô de Comentários passo a passo',
    description: 'Nesta aula prática tiramos todas as dúvidas de como configurar o gatilho, as palavras reservadas e as respostas instantâneas.',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    sequence_order: 2,
    duration_minutes: 18,
    created_at: '2026-01-13T14:20:00Z'
  },
  {
    id: 'les-03',
    product_id: 'prod-02',
    title: 'O Funil Secreto de 4 Mensagens no WhatsApp',
    description: 'A estrutura perfeita de conversão de leads vindo dos Reels para fechar pelo menos 18% em menos de 24 horas usando o GhostWriter.',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    sequence_order: 1,
    duration_minutes: 15,
    created_at: '2026-02-18T11:00:00Z'
  },
  {
    id: 'les-04',
    product_id: 'prod-03',
    title: 'Hackeando o Algoritmo do TikTok em 2026',
    description: 'Análise aprofundada das métricas de retenção: como os primeiros 3 segundos decidem se o seu corte alcançará 100 mil visualizações no ViralSync.',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    sequence_order: 1,
    duration_minutes: 22,
    created_at: '2026-03-22T16:45:00Z'
  }
];

// Seed Copywriting Sale Scripts
export const SEED_SCRIPTS: SaleScript[] = [
  {
    id: 'scr-01',
    product_id: 'prod-01',
    platform: 'whatsapp',
    title: 'Script de Abordagem Altamente Persuasivo',
    content: 'Opa, tudo bem? Vi que você comentou lá no Reels pedindo o acesso ao método Audius! 🚀\n\nCara, deixa eu te fazer uma pergunta rápida: Quanto tempo você perde hoje respondendo direct manualmente ou perdendo leads porque demorou pra ver a notificação?\n\nA Audius resolve isso entregando o link em 2 segundos. Dá uma olhada nesse vídeo rápido mostrando o robô faturando no piloto automático: {checkout_link}\n\nTirei 40% de desconto pros primeiros 50 que entrarem hoje. Bora virar essa chave?',
    created_at: '2026-01-15T09:00:00Z'
  },
  {
    id: 'scr-02',
    product_id: 'prod-01',
    platform: 'instagram_direct',
    title: 'Gatilho de Comentário Quente',
    content: 'Sensacional sua iniciativa de comentar "MÁQUINA"! 🔥\n\nEu acabei de liberar um plano experimental onde você pode instalar o Audius e testar de graça por 7 dias. Seu link de afiliado exclusivo está anexo abaixo:\n\n👉 {checkout_link}\n\nVocê vai ver as vendas caindo nos primeiros minutos rodando reels rápidos. Se precisar de apoio me chama aqui!',
    created_at: '2026-01-16T18:00:00Z'
  },
  {
    id: 'scr-03',
    product_id: 'prod-02',
    platform: 'tiktok_organic',
    title: 'Roteiro de Gancho de 3 Segundos',
    content: 'Gancho: "Se você ainda está escrevendo legendas ou textos de venda da sua cabeça, você está deixando dinheiro na mesa para quem usa inteligência artificial."\n\nProblema: Mostrar na tela o Word em branco e o desespero.\n\nSolução: Apresentar o GhostWriter PRO gerando um anúncio em 5 segundos.\n\nCTA: Link na bio com bônus de afiliação ou no direct {checkout_link}!',
    created_at: '2026-02-20T10:00:00Z'
  },
  {
    id: 'scr-04',
    product_id: 'prod-03',
    platform: 'facebook_ads',
    title: 'Copy de Anúncio Pago Conversão Direta',
    content: '🔴 Cansado de pagar caro por editores de vídeo que demoram 3 dias para entregar um corte?\n\nO ViralSync faz isso em 12 segundos usando inteligência artificial de retenção comportamental. Você faz upload, ele corta, gera legendas sincronizadas e edita.\n\nComece a povoar a internet hoje com mais de 30 vídeos diários. Clique em Saiba Mais e garanta por menos de R$ 5 por dia: {checkout_link}',
    created_at: '2026-03-25T11:20:00Z'
  }
];

// Seed Historical Sales (for stats rendering)
export const SEED_SALES: Sale[] = [
  {
    id: 'sale-01',
    product_id: 'prod-01',
    affiliate_id: 'user-affiliate',
    customer_email: 'lucas.silva@gmail.com',
    transaction_value: 197.00,
    commission_value: 118.20,
    status: 'approved',
    checkout_source: 'stripe',
    created_at: '2026-05-27T10:30:00Z'
  },
  {
    id: 'sale-02',
    product_id: 'prod-03',
    affiliate_id: 'user-affiliate',
    customer_email: 'carla.costa@hotmail.com',
    transaction_value: 147.00,
    commission_value: 80.85,
    status: 'approved',
    checkout_source: 'stripe',
    created_at: '2026-05-26T16:45:00Z'
  },
  {
    id: 'sale-03',
    product_id: 'prod-02',
    affiliate_id: 'user-affiliate',
    customer_email: 'bruno.alves@yahoo.com.br',
    transaction_value: 297.00,
    commission_value: 148.50,
    status: 'approved',
    checkout_source: 'kiwify',
    created_at: '2026-05-25T08:12:00Z'
  },
  {
    id: 'sale-04',
    product_id: 'prod-01',
    affiliate_id: 'user-affiliate',
    customer_email: 'vanessa.p@gmail.com',
    transaction_value: 197.00,
    commission_value: 118.20,
    status: 'pending',
    checkout_source: 'stripe',
    created_at: '2026-05-27T22:15:00Z'
  },
  {
    id: 'sale-05',
    product_id: 'prod-03',
    affiliate_id: 'user-affiliate',
    customer_email: 'tiago.martins@outlook.com',
    transaction_value: 147.00,
    commission_value: 80.85,
    status: 'refunded',
    checkout_source: 'stripe',
    created_at: '2026-05-24T14:00:00Z'
  },
  {
    id: 'sale-06',
    product_id: 'prod-02',
    affiliate_id: 'user-affiliate',
    customer_email: 'mauricio.g@icloud.com',
    transaction_value: 297.00,
    commission_value: 148.50,
    status: 'approved',
    checkout_source: 'stripe',
    created_at: '2026-05-23T11:40:00Z'
  },
  {
    id: 'sale-07',
    product_id: 'prod-01',
    affiliate_id: 'user-affiliate',
    customer_email: 'claudia.m@gmail.com',
    transaction_value: 197.00,
    commission_value: 118.20,
    status: 'approved',
    checkout_source: 'kiwify',
    created_at: '2026-05-22T20:30:00Z'
  }
];

// Seed Historical Payouts
export const SEED_PAYOUTS: Payout[] = [
  {
    id: 'pay-01',
    profile_id: 'user-affiliate',
    amount: 150.00,
    pix_key: 'espetoclips@gmail.com',
    status: 'completed',
    created_at: '2026-05-15T10:00:00Z'
  },
  {
    id: 'pay-02',
    profile_id: 'user-affiliate',
    amount: 550.00,
    pix_key: 'espetoclips@gmail.com',
    status: 'completed',
    created_at: '2026-05-20T14:30:00Z'
  }
];

// Seed Gamification levels configuration
export const SEED_LEVELS: GamificationLevel[] = [
  {
    level: 1,
    name: 'Bronze - Desbravador',
    target: 1000.00,
    reward: 'Moletom Vusk Club',
    description: 'Fature R$ 1.000,00 reais acumulados para provar que você começou a escalar. Libera moletom oficial do ecossistema e tag exclusiva de Elite no Discord oficial.'
  },
  {
    level: 2,
    name: 'Prata - Conquistador',
    target: 10000.00,
    reward: 'Placa Físico Vusk Club 10K',
    description: 'Alcance R$ 10.000,00 reais em comissões aprovadas. Enviamos diretamente para a sua casa a Placa de Premiação física banhada a acrílico preto espacial.'
  },
  {
    level: 3,
    name: 'Ouro - Lenda',
    target: 50000.00,
    reward: 'Placa 50K + Mentoria Especial',
    description: 'Domine o ecossistema com R$ 50.000,00 faturados. Receba a placa lendária de 50K e ganhe acesso direto aos fundadores do Vusk Club para mentoring individual de escala.'
  }
];
