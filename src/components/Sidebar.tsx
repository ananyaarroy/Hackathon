import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Zap, 
  Bell, 
  Settings, 
  Shield,
  ShoppingCart,
  TreePine,
  Calculator
} from 'lucide-react';
import { NavigationItem } from '../types';

interface SidebarProps {
  activeItem: NavigationItem;
  onItemClick: (item: NavigationItem) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems = [
  { id: 'dashboard' as NavigationItem, icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'analytics' as NavigationItem, icon: BarChart3, label: 'Analytics' },
  { id: 'appliances' as NavigationItem, icon: Zap, label: 'Appliances' },
  { id: 'calculator' as NavigationItem, icon: Calculator, label: 'Carbon Calculator' },
  { id: 'alerts' as NavigationItem, icon: Bell, label: 'Alerts' },
  { id: 'marketplace' as NavigationItem, icon: ShoppingCart, label: 'Marketplace' },
  { id: 'sustainability' as NavigationItem, icon: TreePine, label: 'ESG Reports' },
  { id: 'settings' as NavigationItem, icon: Settings, label: 'Settings' },
  { id: 'admin' as NavigationItem, icon: Shield, label: 'Admin' }
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeItem, 
  onItemClick, 
  isCollapsed,
  onToggleCollapse
}) => {

  return (
    <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
                    transition-all duration-300 flex flex-col
                    ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">EcoFlow</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Energy Optimizer</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg
                         transition-all duration-200 group relative
                         ${isActive 
                           ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' 
                           : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                         }`}
            >
              <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
              {!isCollapsed && <span>{item.label}</span>}
              
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 
                               text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 
                               group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Theme Toggle & Collapse */}
      <div className="p-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg
                     text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
                     transition-all duration-200"
        >
          <div className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
            ❮
          </div>
        </button>
      </div>
    </div>
  );
};