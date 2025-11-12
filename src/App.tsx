import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, MessageSquare, Dumbbell, Apple, BarChart3, Moon, Sun } from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Dashboard from './components/Dashboard';
import AIAgent from './components/AIAgent';
import Training from './components/Training';
import Nutrition from './components/Nutrition';
import Metrics from './components/Metrics';

type ViewType = 'dashboard' | 'ai-agent' | 'training' | 'nutrition' | 'metrics';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const { theme, toggleTheme } = useTheme();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard key="dashboard" />;
      case 'ai-agent':
        return <AIAgent key="ai-agent" />;
      case 'training':
        return <Training key="training" />;
      case 'nutrition':
        return <Nutrition key="nutrition" />;
      case 'metrics':
        return <Metrics key="metrics" />;
      default:
        return <Dashboard key="dashboard" />;
    }
  };

  const navItems = [
    { id: 'dashboard' as ViewType, label: 'Inicio', icon: Home, color: 'blue' },
    { id: 'ai-agent' as ViewType, label: 'Agente IA', icon: MessageSquare, color: 'purple' },
    { id: 'training' as ViewType, label: 'Entrenos', icon: Dumbbell, color: 'green' },
    { id: 'nutrition' as ViewType, label: 'Nutrición', icon: Apple, color: 'orange' },
    { id: 'metrics' as ViewType, label: 'Métricas', icon: BarChart3, color: 'cyan' },
  ];

  const getNavColor = (color: string, isActive: boolean) => {
    if (!isActive) return 'text-slate-500 dark:text-slate-400';
    
    const colors: Record<string, string> = {
      blue: 'text-blue-600 dark:text-blue-400',
      purple: 'text-purple-600 dark:text-purple-400',
      green: 'text-green-600 dark:text-green-400',
      orange: 'text-orange-600 dark:text-orange-400',
      cyan: 'text-cyan-600 dark:text-cyan-400',
    };
    return colors[color];
  };

  const getNavBg = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/10 dark:bg-blue-500/20',
      purple: 'bg-purple-500/10 dark:bg-purple-500/20',
      green: 'bg-green-500/10 dark:bg-green-500/20',
      orange: 'bg-orange-500/10 dark:bg-orange-500/20',
      cyan: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black transition-colors duration-300">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Dumbbell className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-slate-900 dark:text-white font-bold tracking-tight">AthleteAI Pro</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Entrenamiento Inteligente</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-slate-900 dark:text-white text-sm font-semibold">Carlos Rodríguez</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">FTP: 285W • 3.8 W/kg</p>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                >
                  <span className="text-white font-semibold text-sm">CR</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl transition-all"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 ${getNavBg(item.color)} rounded-xl`}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 relative z-10 transition-colors ${getNavColor(item.color, isActive)}`} />
                  <span className={`text-xs relative z-10 font-medium transition-colors ${getNavColor(item.color, isActive)}`}>
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
