/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, Product, Affiliation, Lesson, SaleScript, Sale, GamificationLevel, RoleType, ActiveTabType } from '../types';
import { SEED_PRODUCTS, SEED_LESSONS, SEED_SCRIPTS, SEED_SALES, SEED_LEVELS } from '../data';

interface AppContextType {
  // Current active view
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  
  // Auth simulations
  isLoggedIn: boolean;
  login: (name: string, role: RoleType) => void;
  logout: () => void;
  currentUser: Profile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<Profile | null>>;
  switchRole: () => void;

  // Data arrays (Supabase parallel states)
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  affiliations: Affiliation[];
  setAffiliations: React.Dispatch<React.SetStateAction<Affiliation[]>>;
  lessons: Lesson[];
  saleScripts: SaleScript[];
  sales: Sale[];
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
  levels: GamificationLevel[];

  // Action methods (Simulating database writes)
  createProduct: (product: Omit<Product, 'id' | 'created_at'>) => void;
  requestAffiliation: (productId: string) => void;
  getAffiliationForProduct: (productId: string) => Affiliation | undefined;
  triggerMockSale: () => void;
  addSaleScript: (script: Omit<SaleScript, 'id' | 'created_at'>) => void;

  // UI status / feedback
  notification: { type: 'success' | 'info' | 'error'; message: string } | null;
  showNotification: (type: 'success' | 'info' | 'error', message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<ActiveTabType>('products');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Logged in by default with custom user
  
  // Create current active user mirroring profiles table
  const [currentUser, setCurrentUser] = useState<Profile | null>({
    id: 'user-affiliate',
    name: 'Gabriel Vusk',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'affiliate',
    pix_key: 'espetoclips@gmail.com',
    balance: 1450.60,
    total_earned: 9480.15,
    created_at: '2026-01-01T00:00:00Z'
  });

  // State caches for database tables
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [lessons, setLessons] = useState<Lesson[]>(SEED_LESSONS);
  const [saleScripts, setSaleScripts] = useState<SaleScript[]>(SEED_SCRIPTS);
  const [sales, setSales] = useState<Sale[]>(SEED_SALES);
  
  // Initial affiliations ( Gabriel starts affiliated with Audius Automation )
  const [affiliations, setAffiliations] = useState<Affiliation[]>([
    {
      id: 'aff-01',
      profile_id: 'user-affiliate',
      product_id: 'prod-01',
      ref_code: 'VUSK_AUDIUS_GABRIEL',
      created_at: '2026-01-12T15:00:00Z'
    }
  ]);

  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'info' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const login = (name: string, role: RoleType) => {
    const defaultEmail = 'espetoclips@gmail.com';
    setCurrentUser({
      id: 'user-affiliate',
      name: name || 'Parceiro Vusk',
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: role,
      pix_key: defaultEmail,
      balance: role === 'affiliate' ? 1450.60 : 12400.00,
      total_earned: role === 'affiliate' ? 9480.15 : 28400.00,
      created_at: new Date().toISOString()
    });
    setIsLoggedIn(true);
    setActiveTabState('products');
    showNotification('success', `Bem-vindo ao Vusk Club, ${name || 'Parceiro'}!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    showNotification('info', 'Sessão encerrada.');
  };

  // Safe swap role callback (Allows instant live demonstration of Dashboard as Producer vs Affiliate)
  const switchRole = () => {
    if (!currentUser) return;
    const newRole: RoleType = currentUser.role === 'affiliate' ? 'producer' : 'affiliate';
    setCurrentUser({
      ...currentUser,
      role: newRole,
      // Change mock values to highlight different profiles
      balance: newRole === 'producer' ? 14500.00 : 1450.60,
      total_earned: newRole === 'producer' ? 44800.00 : 9480.15,
    });
    showNotification('success', `Perfil alternado para: ${newRole === 'producer' ? '📦 Produtor' : '⚡ Afiliado'}`);
  };

  const setActiveTab = (tab: ActiveTabType) => {
    setActiveTabState(tab);
  };

  // Simulating INSERT INTO products
  const createProduct = (newProd: Omit<Product, 'id' | 'created_at'>) => {
    const product: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setProducts((prev) => [product, ...prev]);
    showNotification('success', `Produto "${product.name}" criado com sucesso e aberto para afiliação!`);
  };

  // Simulating INSERT INTO affiliations
  const requestAffiliation = (productId: string) => {
    if (!currentUser) return;
    
    // Check if already affiliated
    const exists = affiliations.some(a => a.product_id === productId && a.profile_id === currentUser.id);
    if (exists) {
      showNotification('error', 'Você já é afiliado deste produto.');
      return;
    }

    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const refCode = `VUSK_${prod.name.toUpperCase().replace(/\s+/g, '_')}_${currentUser.name.toUpperCase().split(' ')[0]}_${Math.floor(Math.random() * 900 + 100)}`;
    const newAff: Affiliation = {
      id: `aff-${Date.now()}`,
      profile_id: currentUser.id,
      product_id: productId,
      ref_code: refCode,
      created_at: new Date().toISOString()
    };

    setAffiliations((prev) => [...prev, newAff]);
    showNotification('success', `Parabéns! Afiliação aprovada instantaneamente para ${prod.name}!`);
  };

  const getAffiliationForProduct = (productId: string) => {
    if (!currentUser) return undefined;
    return affiliations.find(a => a.product_id === productId && a.profile_id === currentUser.id);
  };

  // Awesome Gamification simulator triggers (triggers artificial sales and ranks progression)
  const triggerMockSale = () => {
    if (!currentUser) return;

    // Pick a product current is affiliated with (or just pick first if none)
    const productPool = affiliations.length > 0 
      ? products.filter(p => affiliations.some(a => a.product_id === p.id))
      : [products[0]];

    const matchedProd = productPool[Math.floor(Math.random() * productPool.length)] || products[0];
    
    // Choose arbitrary pricing
    const priceMap: Record<string, number> = { 'prod-01': 197.00, 'prod-02': 297.00, 'prod-03': 147.00 };
    const price = priceMap[matchedProd.id] || 197.00;
    const commPct = matchedProd.commission_percentage;
    const commission = Number(((price * commPct) / 100).toFixed(2));

    const emails = ['pedro.costa@hotmail.com', 'marina.lima@gmail.com', 'roberto.sampaio@uol.com.br', 'fernanda.v@gmail.com'];
    const clientEmail = emails[Math.floor(Math.random() * emails.length)];

    const newSale: Sale = {
      id: `sale-${Date.now()}`,
      product_id: matchedProd.id,
      affiliate_id: currentUser.role === 'affiliate' ? currentUser.id : null,
      customer_email: clientEmail,
      transaction_value: price,
      commission_value: commission,
      status: 'approved',
      checkout_source: Math.random() > 0.4 ? 'stripe' : 'kiwify',
      created_at: new Date().toISOString()
    };

    // Update sales table and profile balance
    setSales(prev => [newSale, ...prev]);
    
    const isAff = currentUser.role === 'affiliate';
    const earned = isAff ? commission : price; // Producer gets full price, affiliate gets commission

    const oldEarned = currentUser.total_earned;
    const newEarned = Number((currentUser.total_earned + earned).toFixed(2));

    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        balance: Number((prev.balance + earned).toFixed(2)),
        total_earned: newEarned
      };
    });

    // Ring visual sales sound or premium notifications!
    showNotification('success', `⚡ VENDA REALIZADA! + R$ ${earned.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de ${matchedProd.name}!`);

    // Check gamification milestone level up!
    SEED_LEVELS.forEach(lvl => {
      if (oldEarned < lvl.target && newEarned >= lvl.target) {
        setTimeout(() => {
          showNotification('success', `🏆 CONQUISTA DESBLOQUEADA: Nível ${lvl.level} - ${lvl.reward}! Você atingiu a marca de R$ ${lvl.target.toLocaleString('pt-BR')}!`);
        }, 1500);
      }
    });
  };

  const addSaleScript = (script: Omit<SaleScript, 'id' | 'created_at'>) => {
    const newScript: SaleScript = {
      ...script,
      id: `scr-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setSaleScripts(prev => [newScript, ...prev]);
    showNotification('success', `Roteiro de vendas "${script.title}" adicionado!`);
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      isLoggedIn,
      login,
      logout,
      currentUser,
      setCurrentUser,
      switchRole,
      products,
      setProducts,
      affiliations,
      lessons,
      saleScripts,
      sales,
      setSales,
      levels: SEED_LEVELS,
      createProduct,
      requestAffiliation,
      getAffiliationForProduct,
      triggerMockSale,
      addSaleScript,
      notification,
      showNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
