/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { Login } from './pages/Login';
import { Products } from './pages/Products';
import { Training } from './pages/Training';
import { Scripts } from './pages/Scripts';
import { Files } from './pages/Files';
import { Rewards } from './pages/Rewards';

// Main Inner Controller that evaluates authenticated layouts
const AppInner: React.FC = () => {
  const { isLoggedIn, activeTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-close menu on tab changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  // If not authenticated, force premium login portal
  if (!isLoggedIn) {
    return (
      <>
        <Login />
        <Toast />
      </>
    );
  }

  // Active view switcher router logic
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'products':
        return <Products />;
      case 'training':
        return <Training />;
      case 'files':
        return <Files />;
      case 'tools':
        return <Scripts />;
      case 'rewards':
        return <Rewards />;
      default:
        return <Products />;
    }
  };

  return (
    <div className="flex bg-vusk-bg text-vusk-text-primary min-h-screen relative font-sans pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] overflow-x-hidden min-w-[320px]">
      {/* Aurora visual lighting spotlights */}
      <div className="aurora-bg top-[-5%] left-[-10%] opacity-50 md:opacity-100" />
      <div className="aurora-bg bottom-[-15%] right-[-5%] opacity-50 md:opacity-100" />

      {/* Mobile Drawer Backdrop overlay */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-drawer-backdrop"
          className="fixed inset-0 bg-[#0B080F]/90 backdrop-blur-md z-40 md:hidden transition-all duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar (Persistent on desktop, drawer slide-over on mobile) */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main viewport flow */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        {/* Spatial context upper header */}
        <Header onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        {/* Dynamic page scroll box container */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-6 sm:px-6 md:px-10 md:py-8 max-w-7xl w-full mx-auto">
          {renderActiveTab()}
        </main>
      </div>

      {/* Float notifications */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
