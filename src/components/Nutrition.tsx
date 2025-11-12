import { motion } from 'motion/react';
import { Apple, Flame, Droplets, Clock, TrendingUp, Info, Pill } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { GradientCard } from './design-system/GradientCard';
import { StatBadge } from './design-system/StatBadge';

type Meal = {
  time: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description: string;
};

export default function Nutrition() {
  const dailyGoals = {
    calories: 2850,
    protein: 165,
    carbs: 380,
    fats: 75
  };

  const currentIntake = {
    calories: 1420,
    protein: 82,
    carbs: 185,
    fats: 38
  };

  const meals: Meal[] = [
    {
      time: '07:00',
      name: 'Desayuno',
      calories: 750,
      protein: 35,
      carbs: 95,
      fats: 22,
      description: 'Avena con plátano, mantequilla de cacahuete y 3 huevos revueltos'
    },
    {
      time: '10:30',
      name: 'Pre-Entreno',
      calories: 400,
      protein: 8,
      carbs: 80,
      fats: 5,
      description: 'Tostadas con mermelada y plátano'
    },
    {
      time: '13:00',
      name: 'Durante Entreno',
      calories: 240,
      protein: 0,
      carbs: 60,
      fats: 0,
      description: 'Bebida isotónica (60g carbohidratos/hora)'
    },
    {
      time: '14:30',
      name: 'Post-Entreno',
      calories: 500,
      protein: 30,
      carbs: 80,
      fats: 5,
      description: 'Batido de recuperación'
    },
    {
      time: '16:00',
      name: 'Comida',
      calories: 700,
      protein: 55,
      carbs: 85,
      fats: 18,
      description: 'Arroz con pollo y verduras'
    },
    {
      time: '21:00',
      name: 'Cena',
      calories: 260,
      protein: 37,
      carbs: 20,
      fats: 25,
      description: 'Salmón con ensalada y patata dulce'
    }
  ];

  const waterIntake = 2.8;
  const waterGoal = 3.5;

  const macroPercentage = (current: number, goal: number) => (current / goal) * 100;

  return (
    <div className="space-y-6 pb-24">
      {/* Daily Overview */}
      <GradientCard gradient="orange-pink" delay={0}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-white font-bold text-xl mb-2">Nutrición Hoy</h2>
            <p className="text-orange-100 text-sm">Lunes 11 Nov • Día de entrenamiento intenso</p>
          </div>
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <Apple className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-orange-100 text-sm mb-1 font-medium">Consumido</p>
            <motion.p 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.6 }}
              className="text-white text-4xl font-bold"
            >
              {currentIntake.calories}
            </motion.p>
            <p className="text-orange-100 text-xs mt-1">de {dailyGoals.calories} kcal</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-orange-100 text-sm mb-1 font-medium">Restante</p>
            <motion.p 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.6, delay: 0.1 }}
              className="text-white text-4xl font-bold"
            >
              {dailyGoals.calories - currentIntake.calories}
            </motion.p>
            <p className="text-orange-100 text-xs mt-1">kcal por consumir</p>
          </div>
        </div>

        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${macroPercentage(currentIntake.calories, dailyGoals.calories)}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-white rounded-full shadow-lg"
          />
        </div>
      </GradientCard>

      {/* Macros Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { 
            color: 'blue', 
            name: 'Proteína', 
            current: currentIntake.protein, 
            goal: dailyGoals.protein, 
            unit: 'g',
            badge: '2.2 g/kg',
            delay: 0.1
          },
          { 
            color: 'green', 
            name: 'Carbohidratos', 
            current: currentIntake.carbs, 
            goal: dailyGoals.carbs, 
            unit: 'g',
            badge: '5 g/kg',
            delay: 0.2
          },
          { 
            color: 'orange', 
            name: 'Grasas', 
            current: currentIntake.fats, 
            goal: dailyGoals.fats, 
            unit: 'g',
            badge: '25%',
            delay: 0.3
          },
        ].map((macro) => (
          <motion.div
            key={macro.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: macro.delay }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-5 backdrop-blur-sm hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${macro.color}-500`}></div>
                  <h3 className="text-slate-900 dark:text-white font-semibold">{macro.name}</h3>
                </div>
                <StatBadge variant={macro.color === 'blue' ? 'info' : macro.color === 'green' ? 'success' : 'warning'}>
                  {macro.badge}
                </StatBadge>
              </div>
              <div className="mb-3">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-slate-900 dark:text-white text-3xl font-bold">{macro.current}{macro.unit}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">/ {macro.goal}{macro.unit}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${macroPercentage(macro.current, macro.goal)}%` }}
                    transition={{ duration: 0.8, delay: macro.delay + 0.2 }}
                    className={`h-full bg-${macro.color}-500 rounded-full`}
                  />
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                {macro.goal - macro.current}{macro.unit} restantes
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Hydration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white font-semibold">Hidratación</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{waterIntake}L / {waterGoal}L</p>
              </div>
            </div>
            <StatBadge variant="info">
              {Math.round((waterIntake / waterGoal) * 100)}%
            </StatBadge>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(waterIntake / waterGoal) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            />
          </div>
          <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800/30 rounded-xl p-3">
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              💧 Bebe {(waterGoal - waterIntake).toFixed(1)}L más. Durante el entreno consume 750ml/hora.
            </p>
          </div>
        </Card>
      </motion.div>

      {/* AI Nutrition Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-orange-500/10 dark:from-purple-900/20 dark:via-purple-900/10 dark:to-orange-900/20 border-purple-500/20 dark:border-purple-700/30 p-5 backdrop-blur-sm">
          <div className="flex gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg"
            >
              <Info className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Recomendación Nutricional IA</h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3 leading-relaxed">
                Hoy realizarás intervalos de umbral (TSS: 85). Asegúrate de consumir 60-80g de carbohidratos 
                2-3 horas antes. Durante el entreno, toma 60g/hora de carbohidratos simples. 
                Post-entreno: ventana anabólica 30-45min con ratio 3:1 carbs:proteína.
              </p>
              <div className="flex gap-2 flex-wrap">
                <StatBadge variant="warning" icon={<Flame className="w-3 h-3" />}>
                  Alto gasto calórico
                </StatBadge>
                <StatBadge variant="success" icon={<TrendingUp className="w-3 h-3" />}>
                  Día de carga
                </StatBadge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Meal Plan */}
      <div>
        <h2 className="text-slate-900 dark:text-white font-bold mb-4 text-xl">Plan de Comidas</h2>
        <div className="space-y-3">
          {meals.map((meal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-5 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all backdrop-blur-sm hover:shadow-xl group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex flex-col items-center bg-orange-500/10 dark:bg-orange-500/20 px-3 py-2 rounded-xl">
                      <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 mb-1" />
                      <span className="text-slate-900 dark:text-white text-xs font-bold">{meal.time}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-900 dark:text-white font-semibold mb-1">{meal.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{meal.description}</p>
                    </div>
                  </div>
                  <div className="text-right bg-slate-50 dark:bg-slate-900/50 px-3 py-2 rounded-xl">
                    <p className="text-slate-900 dark:text-white text-2xl font-bold">{meal.calories}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">kcal</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">Proteína</span>
                    </div>
                    <p className="text-slate-900 dark:text-white font-bold">{meal.protein}g</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">Carbs</span>
                    </div>
                    <p className="text-slate-900 dark:text-white font-bold">{meal.carbs}g</p>
                  </div>
                  <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">Grasas</span>
                    </div>
                    <p className="text-slate-900 dark:text-white font-bold">{meal.fats}g</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Supplements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center">
              <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-semibold">Suplementación Recomendada</h3>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Creatina', desc: 'Mejora fuerza y recuperación', dose: '5g/día', color: 'blue' },
              { name: 'Cafeína', desc: 'Pre-entreno intenso', dose: '200mg', color: 'green' },
              { name: 'Beta-Alanina', desc: 'Reduce fatiga muscular', dose: '3-4g/día', color: 'orange' },
              { name: 'Omega-3', desc: 'Antiinflamatorio, salud cardiovascular', dose: '2-3g/día', color: 'purple' },
            ].map((supplement, idx) => (
              <motion.div
                key={supplement.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + idx * 0.05 }}
                className="flex items-center justify-between py-3 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-${supplement.color}-500`}></div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-semibold text-sm">{supplement.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{supplement.desc}</p>
                  </div>
                </div>
                <StatBadge variant="neutral">{supplement.dose}</StatBadge>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
