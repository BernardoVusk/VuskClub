/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
    <div className="flex bg-vusk-bg text-vusk-text-primary min-h-screen relative font-sans">
      {/* Aurora visual lighting spotlights */}
      <div className="aurora-bg top-[-5%] left-[-10%]" />
      <div className="aurora-bg bottom-[-15%] right-[-5%]" />

      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main viewport flow */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        {/* Spatial context upper header */}
        <Header />

        {/* Dynamic page scroll box container */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-10 py-8 max-w-7xl w-full mx-auto">
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
