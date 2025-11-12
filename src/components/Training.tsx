import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bike, Dumbbell, Calendar, Clock, Zap, Target, ChevronRight, X } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { GradientCard } from './design-system/GradientCard';
import { StatBadge } from './design-system/StatBadge';

type WorkoutType = 'cycling' | 'gym';

type Workout = {
  id: string;
  type: WorkoutType;
  title: string;
  duration: number;
  tss?: number;
  description: string;
  status: 'scheduled' | 'completed' | 'skipped';
  date: string;
  details: {
    warmup?: string;
    main: string[];
    cooldown?: string;
  };
  zones?: string;
};

export default function Training() {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const weeklyWorkouts: Workout[] = [
    {
      id: '1',
      type: 'cycling',
      title: 'Intervalos de Umbral',
      duration: 90,
      tss: 85,
      description: '2×20min @ FTP - Trabajo de umbral anaeróbico',
      status: 'scheduled',
      date: 'Hoy - Lun 11 Nov',
      details: {
        warmup: '15min @ Z2 (171-228W) con 3 sprints de 10s',
        main: [
          '20min @ 285W (FTP) - mantener cadencia 90-95rpm',
          '10min recuperación @ Z1 (<171W)',
          '20min @ 285W (FTP) - mantener cadencia 90-95rpm'
        ],
        cooldown: '10min @ Z1 rodaje suave'
      },
      zones: 'Z4-Z5'
    },
    {
      id: '2',
      type: 'gym',
      title: 'Core + Estabilidad',
      duration: 30,
      description: 'Trabajo de core enfocado en ciclismo',
      status: 'scheduled',
      date: 'Hoy - Lun 11 Nov',
      details: {
        main: [
          'Plancha frontal: 3×60s',
          'Plancha lateral: 3×45s cada lado',
          'Dead bug: 3×15 repeticiones',
          'Bird dog: 3×12 cada lado',
          'Pallof press: 3×15 cada lado',
          'Glute bridge: 3×20 repeticiones'
        ]
      }
    },
    {
      id: '3',
      type: 'gym',
      title: 'Fuerza Máxima - Tren Inferior',
      duration: 75,
      description: 'Bloque de fuerza - Semana 2/4',
      status: 'scheduled',
      date: 'Mar 12 Nov',
      details: {
        warmup: 'Movilidad + activación glúteos 10min',
        main: [
          'Sentadilla back: 4×5 @ 85% 1RM (110kg)',
          'Peso muerto rumano: 3×8 @ 75% (90kg)',
          'Zancadas búlgaras: 3×10 cada pierna @ 20kg',
          'Extensión nórdica: 3×6 (asistida)',
          'Calf raises: 3×15 @ 40kg'
        ],
        cooldown: 'Estiramientos 10min'
      }
    },
    {
      id: '4',
      type: 'cycling',
      title: 'Rodaje Z2 - Resistencia',
      duration: 90,
      tss: 55,
      description: 'Volumen aeróbico - mantener Z2',
      status: 'scheduled',
      date: 'Mié 13 Nov',
      details: {
        warmup: '10min progresivo hasta Z2',
        main: [
          '70min @ Z2 (171-228W)',
          'Mantener cadencia 85-90rpm',
          'FC objetivo: 130-145 bpm'
        ],
        cooldown: '10min rodaje suave'
      },
      zones: 'Z2'
    },
    {
      id: '5',
      type: 'cycling',
      title: 'Intervalos VO2max',
      duration: 75,
      tss: 92,
      description: '5×5min @ 120% FTP - Potencia aeróbica máxima',
      status: 'scheduled',
      date: 'Jue 14 Nov',
      details: {
        warmup: '15min @ Z2 progresivo',
        main: [
          '5 × 5min @ 342W (120% FTP)',
          'Recuperación: 5min @ Z1 entre series',
          'Cadencia objetivo: 95-100rpm',
          'FC máx esperada: ~180 bpm'
        ],
        cooldown: '10min @ Z1'
      },
      zones: 'Z5-Z6'
    },
    {
      id: '6',
      type: 'cycling',
      title: 'Salida Larga - Fondo',
      duration: 180,
      tss: 180,
      description: 'Volumen Z2-Z3 con trabajo de tempo',
      status: 'scheduled',
      date: 'Sáb 16 Nov',
      details: {
        warmup: '20min @ Z1-Z2 progresivo',
        main: [
          '60min @ Z2 (171-228W)',
          '40min @ Z3 Tempo (228-257W)',
          '40min @ Z2',
          '20min @ Z3 Tempo'
        ],
        cooldown: '20min @ Z1 rodaje muy suave'
      },
      zones: 'Z2-Z3'
    }
  ];

  const weeklyStats = {
    totalDuration: 540,
    totalTSS: 412,
    cyclingHours: 7.5,
    gymHours: 1.75,
    completedWorkouts: 0,
    scheduledWorkouts: 6
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Weekly Overview */}
      <GradientCard gradient="green-blue" delay={0}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-white font-bold text-xl mb-2">Plan Semanal</h2>
            <p className="text-green-100 text-sm">Semana del 11-17 Nov • Bloque: Base 2</p>
          </div>
          <div className="text-right">
            <motion.p 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.6 }}
              className="text-white text-4xl font-bold"
            >
              {weeklyStats.totalTSS}
            </motion.p>
            <p className="text-green-100 text-sm">TSS Total</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { icon: Calendar, label: 'Entrenamientos', value: `${weeklyStats.completedWorkouts}/${weeklyStats.scheduledWorkouts}` },
            { icon: Clock, label: 'Tiempo Total', value: `${Math.floor(weeklyStats.totalDuration / 60)}h ${weeklyStats.totalDuration % 60}m` },
            { icon: Bike, label: 'Ciclismo', value: `${weeklyStats.cyclingHours}h` },
            { icon: Dumbbell, label: 'Gimnasio', value: `${weeklyStats.gymHours}h` },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-green-200" />
                  <span className="text-green-100 text-xs font-medium">{stat.label}</span>
                </div>
                <p className="text-white text-lg font-bold">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div>
          <div className="flex justify-between text-sm text-green-100 mb-2">
            <span className="font-medium">Progreso semanal</span>
            <span>{weeklyStats.completedWorkouts}/{weeklyStats.scheduledWorkouts}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(weeklyStats.completedWorkouts / weeklyStats.scheduledWorkouts) * 100}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </GradientCard>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-1 rounded-xl">
          <TabsTrigger value="all" className="flex-1 rounded-lg data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700">Todos</TabsTrigger>
          <TabsTrigger value="cycling" className="flex-1 rounded-lg data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700">
            <Bike className="w-4 h-4 mr-2" />
            Ciclismo
          </TabsTrigger>
          <TabsTrigger value="gym" className="flex-1 rounded-lg data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700">
            <Dumbbell className="w-4 h-4 mr-2" />
            Gimnasio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {weeklyWorkouts.map((workout, idx) => (
            <WorkoutCard 
              key={workout.id} 
              workout={workout} 
              onClick={() => setSelectedWorkout(workout)}
              delay={idx * 0.05}
            />
          ))}
        </TabsContent>

        <TabsContent value="cycling" className="space-y-3 mt-4">
          {weeklyWorkouts.filter(w => w.type === 'cycling').map((workout, idx) => (
            <WorkoutCard 
              key={workout.id} 
              workout={workout} 
              onClick={() => setSelectedWorkout(workout)}
              delay={idx * 0.05}
            />
          ))}
        </TabsContent>

        <TabsContent value="gym" className="space-y-3 mt-4">
          {weeklyWorkouts.filter(w => w.type === 'gym').map((workout, idx) => (
            <WorkoutCard 
              key={workout.id} 
              workout={workout} 
              onClick={() => setSelectedWorkout(workout)}
              delay={idx * 0.05}
            />
          ))}
        </TabsContent>
      </Tabs>

      {/* Workout Detail Modal */}
      <AnimatePresence>
        {selectedWorkout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSelectedWorkout(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50"
            >
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 p-6 overflow-y-auto max-h-[90vh] shadow-2xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      selectedWorkout.type === 'cycling' 
                        ? 'bg-blue-500/10 dark:bg-blue-500/20' 
                        : 'bg-green-500/10 dark:bg-green-500/20'
                    }`}>
                      {selectedWorkout.type === 'cycling' ? (
                        <Bike className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Dumbbell className="w-7 h-7 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-slate-900 dark:text-white font-bold text-lg">{selectedWorkout.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{selectedWorkout.date}</p>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedWorkout(null)}
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="flex gap-2 mb-6">
                  <StatBadge variant="neutral" icon={<Clock className="w-3 h-3" />}>
                    {selectedWorkout.duration} min
                  </StatBadge>
                  {selectedWorkout.tss && (
                    <StatBadge variant="warning" icon={<Target className="w-3 h-3" />}>
                      TSS: {selectedWorkout.tss}
                    </StatBadge>
                  )}
                  {selectedWorkout.zones && (
                    <StatBadge variant="info">{selectedWorkout.zones}</StatBadge>
                  )}
                </div>

                <div className="space-y-4">
                  {selectedWorkout.details.warmup && (
                    <div>
                      <h4 className="text-slate-700 dark:text-slate-300 font-semibold mb-2">Calentamiento</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3">
                        {selectedWorkout.details.warmup}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="text-slate-700 dark:text-slate-300 font-semibold mb-2">Parte Principal</h4>
                    <div className="space-y-2">
                      {selectedWorkout.details.main.map((item, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">{idx + 1}</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 text-sm flex-1">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {selectedWorkout.details.cooldown && (
                    <div>
                      <h4 className="text-slate-700 dark:text-slate-300 font-semibold mb-2">Vuelta a la calma</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3">
                        {selectedWorkout.details.cooldown}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl transition-all font-semibold shadow-lg"
                  >
                    Iniciar Entrenamiento
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedWorkout(null)}
                    className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white py-3 rounded-xl transition-colors font-semibold"
                  >
                    Cerrar
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function WorkoutCard({ workout, onClick, delay = 0 }: { workout: Workout; onClick: () => void; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ x: 4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Card 
        onClick={onClick}
        className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-5 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all cursor-pointer group backdrop-blur-sm hover:shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex gap-4 flex-1">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
              workout.type === 'cycling' 
                ? 'bg-blue-500/10 dark:bg-blue-500/20' 
                : 'bg-green-500/10 dark:bg-green-500/20'
            }`}>
              {workout.type === 'cycling' ? (
                <Bike className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              ) : (
                <Dumbbell className="w-6 h-6 text-green-600 dark:text-green-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 dark:text-white font-semibold mb-1">{workout.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{workout.description}</p>
              <div className="flex gap-2 flex-wrap">
                <StatBadge variant="neutral" icon={<Clock className="w-3 h-3" />}>
                  {workout.duration} min
                </StatBadge>
                {workout.tss && (
                  <StatBadge variant="warning" icon={<Zap className="w-3 h-3" />}>
                    TSS: {workout.tss}
                  </StatBadge>
                )}
                <StatBadge variant="info">{workout.date}</StatBadge>
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
        </div>
      </Card>
    </motion.div>
  );
}
