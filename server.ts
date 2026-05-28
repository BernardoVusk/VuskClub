/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Safe initialize Gemini: fail-fast or graceful fallback if key is missing or is placeholder
  const isKeyValid = process.env.GEMINI_API_KEY && 
                     process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY' &&
                     process.env.GEMINI_API_KEY.trim() !== '';

  let ai: GoogleGenAI | null = null;
  if (isKeyValid) {
    ai = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API endpoint: Copywriting Copilot (Gemini powered)
  app.post('/api/copypilot', async (req, res) => {
    try {
      const { platform, title, code, context, prompt } = req.body;

      if (!isKeyValid || !ai) {
        return res.json({
          success: false,
          error: 'GEMINI_API_KEY_MISSING',
          message: 'Olá Parceiro! A chave de inteligência artificial GEMINI_API_KEY não foi configurada nos Segredos do painel do Google AI Studio. Vamos simular essa resposta usando inteligência artificial local para fins de demonstração!',
          simulatedText: `🚀 *Roteiro de Elite Vusk Club - Adaptado para ${platform || 'SaaS'}* 🔥\n\n[GATILHO DE ATENÇÃO PARA ${platform.toUpperCase()}]\n"Se você quer escalar vendas e parar de queimar dinheiro com anúncios mal otimizados, o código ${code || 'VUSKREF'} de afiliado é a chave do jogo."\n\n📌 *Destaques de Conversão:*\n- Alta retenção comportamental\n- CTA magnético personalizado\n- Escala acelerada de cliques\n\n👉 Aproveite hoje mesmo o segredo clicando em {checkout_link}!`
        });
      }

      const systemInstruction = `
        Você é o Copilot de Copywriting Oficial do Vusk Club. Seu objetivo é ajudar afiliados e criadores de conteúdo a otimizar scripts de vendas de mini-SaaS para conversão explosiva.
        Estilo de redação: Altamente persuasivo, agressivo ("Direct Response"), direto ao ponto, com ganchos estouradores nos primeiros 3 segundos, emojis marcantes, layout escaneável, moderno. Inspirado no estilo Apple/Linear e gatilhos mentais fortes.
        Gere os textos em Português do Brasil de forma extremamente polida.
      `;

      const geminiPrompt = `
        Adapte ou melhore o seguinte script de vendas para a plataforma: ${platform}.
        Título original: "${title || 'Script de Vendas'}"
        Código de Afiliação para incluir implicitamente se necessário (como {checkout_link}): ${code || 'VUSKREF'}
        Instruções ou alterações desejadas pelo afiliado: "${prompt || 'Tornar mais persuasivo e direto'}"
        
        Conteúdo atual do script para refinar ou servir de referência:
        "${context || ''}"
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: geminiPrompt,
        config: {
          systemInstruction,
          temperature: 0.8
        }
      });

      const generatedText = response.text;

      return res.json({
        success: true,
        text: generatedText
      });

    } catch (error: any) {
      console.error('Error in copypilot endpoint:', error);
      return res.status(500).json({
        success: false,
        error: 'GENAI_ERROR',
        message: 'Ocorreu um erro no servidor ao chamar a API do Gemini: ' + error.message
      });
    }
  });

  // Mock static Supabase database helper info endpoint for local developer insight
  app.get('/api/vusk-truth', (req, res) => {
    res.json({
      database: 'Supabase v4 Relational Schema Active',
      connection: 'Simulated Environment State Single Source of Truth',
      tables: ['profiles', 'products', 'affiliations', 'lessons', 'sale_scripts', 'sales', 'payouts']
    });
  });

  // Serve static assets with Vite middleware in development, and built static folder in production
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[VUSK MASTER] Servidor rodando com sucesso no endereço http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[VUSK CORRUPT STARTUP]:', err);
});
