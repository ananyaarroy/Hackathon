import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Appliances } from './pages/Appliances';
import { CarbonCalculatorPage } from './pages/CarbonCalculatorPage';
import { Alerts } from './pages/Alerts';
import { Settings } from './pages/Settings';
import { Admin } from './pages/Admin';
import { Marketplace } from './pages/Marketplace';
import { Sustainability } from './pages/Sustainability';
import { NavigationItem } from './types';

function App() {
  const [activeItem, setActiveItem] = useState<NavigationItem>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Listen for navigation events
    const handleNavigateToCalculator = () => {
      setActiveItem('calculator');
    };

    window.addEventListener('navigateToCalculator', handleNavigateToCalculator);

    return () => {
      window.removeEventListener('navigateToCalculator', handleNavigateToCalculator);
    };
  }, []);

  const AppContent = () => {
    const renderPage = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'appliances':
        return <Appliances />;
      case 'calculator':
        return <CarbonCalculatorPage />;
      case 'alerts':
        return <Alerts />;
      case 'marketplace':
        return <Marketplace />;
      case 'sustainability':
        return <Sustainability />;
      case 'settings':
        return <Settings />;
      case 'admin':
        return <Admin />;
      default:
        return <Dashboard />;
    }
    };

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar
            activeItem={activeItem}
            onItemClick={setActiveItem}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              {renderPage()}
            </div>
          </main>
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/calculator" element={
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <div className="flex h-screen">
                <Sidebar
                  activeItem="calculator"
                  onItemClick={(item) => {
                    setActiveItem(item);
                    if (item !== 'calculator') {
                      window.history.pushState({}, '', '/');
                    }
                  }}
                  isCollapsed={isSidebarCollapsed}
                  onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
                <main className="flex-1 overflow-y-auto">
                  <div className="p-6">
                    <CarbonCalculatorPage />
                  </div>
                </main>
              </div>
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;