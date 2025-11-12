import { motion } from 'motion/react';
import { Activity, Heart, Moon, Zap, TrendingUp, TrendingDown, Bike, Dumbbell, Clock, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { GradientCard } from './design-system/GradientCard';
import { MetricCard } from './design-system/MetricCard';
import { StatBadge } from './design-system/StatBadge';

export default function Dashboard() {
  const readinessScore = 78;
  const hrvScore = 62;
  const sleepScore = 85;
  const stressLevel = 35;

  return (
    <div className="space-y-6 pb-24">
      {/* Readiness Score - Hero Card */}
      <GradientCard gradient="blue-purple" delay={0}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-blue-100 text-sm mb-2 font-medium">Estado de Forma Hoy</p>
            <div className="flex items-baseline gap-3 mb-4">
              <motion.h2 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                className="text-white text-6xl font-bold tracking-tight"
              >
                {readinessScore}
              </motion.h2>
              <span className="text-blue-200 text-xl">/ 100</span>
            </div>
            <StatBadge variant="success" icon={<TrendingUp className="w-3 h-3" />}>
              Óptimo para entrenar
            </StatBadge>
          </div>
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', bounce: 0.6 }}
            className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <Activity className="w-10 h-10 text-white" />
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 pt-6 border-t border-white/20"
        >
          <p className="text-blue-100 text-sm leading-relaxed">
            Tu recuperación es excelente. Hoy es un buen día para una sesión de alta intensidad.
          </p>
        </motion.div>
      </GradientCard>

      {/* Vital Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          icon={Heart}
          iconColor="red"
          title="HRV"
          value={`${hrvScore}`}
          subtitle="ms (promedio 7 días: 58)"
          trendIcon={<TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400" />}
          progress={hrvScore}
          delay={0.1}
        />
        <MetricCard
          icon={Moon}
          iconColor="indigo"
          title="Sueño"
          value={`${sleepScore}`}
          subtitle="7h 45min (óptimo)"
          trendIcon={<TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400" />}
          progress={sleepScore}
          delay={0.2}
        />
        <MetricCard
          icon={Zap}
          iconColor="orange"
          title="Estrés"
          value={`${stressLevel}`}
          subtitle="Bajo (bueno)"
          trendIcon={<TrendingDown className="w-4 h-4 text-green-500 dark:text-green-400" />}
          progress={100 - stressLevel}
          delay={0.3}
        />
      </div>

      {/* AI Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-blue-500/10 dark:from-purple-900/20 dark:via-purple-900/10 dark:to-blue-900/20 border-purple-500/20 dark:border-purple-700/30 p-6 backdrop-blur-sm">
          <div className="flex gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Recomendación del Agente IA</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3 leading-relaxed">
                Basado en tu HRV elevado y buena calidad de sueño, hoy es ideal para hacer intervalos de umbral. 
                He preparado una sesión de 2×20min @ FTP con recuperación completa.
              </p>
              <div className="flex gap-2 flex-wrap">
                <StatBadge variant="info">Sesión optimizada</StatBadge>
                <StatBadge variant="warning">TSS: 85</StatBadge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Today's Training */}
      <div>
        <h2 className="text-slate-900 dark:text-white font-bold mb-4 text-xl">Entrenamientos de Hoy</h2>
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ x: 4 }}
          >
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-6 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all cursor-pointer group backdrop-blur-sm hover:shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4 flex-1">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bike className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-900 dark:text-white font-semibold mb-1">Intervalos de Umbral</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Ciclismo • 90 min • TSS: 85</p>
                    <div className="flex gap-2">
                      <StatBadge variant="success">Hoy</StatBadge>
                      <StatBadge variant="info" icon={<Target className="w-3 h-3" />}>Z4-Z5</StatBadge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5 text-sm bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Calentamiento</span>
                  <span className="text-slate-900 dark:text-slate-200">15 min @ Zona 2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Principal</span>
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">2 × 20 min @ 285W (FTP)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Recuperación</span>
                  <span className="text-slate-900 dark:text-slate-200">10 min @ Zona 1</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ x: 4 }}
          >
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-6 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all cursor-pointer group backdrop-blur-sm hover:shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4 flex-1">
                  <div className="w-14 h-14 rounded-xl bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Dumbbell className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-900 dark:text-white font-semibold mb-1">Core + Estabilidad</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Gimnasio • 30 min • Recuperación activa</p>
                    <StatBadge variant="neutral">Opcional</StatBadge>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5 text-sm bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Plancha frontal</span>
                  <span className="text-slate-900 dark:text-slate-200">3 × 60s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Plancha lateral</span>
                  <span className="text-slate-900 dark:text-slate-200">3 × 45s cada lado</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Dead bug</span>
                  <span className="text-slate-900 dark:text-slate-200">3 × 15 reps</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Nutrition Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-semibold">Nutrición Hoy</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-medium">Calorías</p>
              <p className="text-slate-900 dark:text-white text-2xl font-bold">2,850</p>
              <p className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">kcal objetivo</p>
            </div>
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-medium">Proteína</p>
              <p className="text-slate-900 dark:text-white text-2xl font-bold">165g</p>
              <p className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">2.2g/kg</p>
            </div>
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-medium">Carbohidratos</p>
              <p className="text-slate-900 dark:text-white text-2xl font-bold">380g</p>
              <p className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">Alto entreno</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              💡 <strong>Pre-entreno:</strong> Consume 60-80g de carbohidratos 2-3 horas antes de los intervalos.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
