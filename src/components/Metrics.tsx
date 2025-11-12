import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Activity, Heart, Zap, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, ComposedChart } from 'recharts';
import { GradientCard } from './design-system/GradientCard';
import { StatBadge } from './design-system/StatBadge';
import { MetricCard } from './design-system/MetricCard';

export default function Metrics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const ftpData = [
    { date: '15 Ago', ftp: 270, wkg: 3.6 },
    { date: '1 Sep', ftp: 273, wkg: 3.64 },
    { date: '15 Sep', ftp: 278, wkg: 3.7 },
    { date: '1 Oct', ftp: 280, wkg: 3.73 },
    { date: '15 Oct', ftp: 283, wkg: 3.77 },
    { date: '1 Nov', ftp: 285, wkg: 3.8 },
    { date: '11 Nov', ftp: 285, wkg: 3.8 }
  ];

  const hrvData = [
    { date: 'Lun 4', hrv: 54, stress: 42 },
    { date: 'Mar 5', hrv: 56, stress: 38 },
    { date: 'Mié 6', hrv: 52, stress: 45 },
    { date: 'Jue 7', hrv: 58, stress: 35 },
    { date: 'Vie 8', hrv: 61, stress: 30 },
    { date: 'Sáb 9', hrv: 59, stress: 33 },
    { date: 'Dom 10', hrv: 60, stress: 32 },
    { date: 'Lun 11', hrv: 62, stress: 35 }
  ];

  const trainingLoadData = [
    { week: 'S1', tss: 420, acute: 380, chronic: 390 },
    { week: 'S2', tss: 465, acute: 410, chronic: 405 },
    { week: 'S3', tss: 490, acute: 455, chronic: 425 },
    { week: 'S4', tss: 380, acute: 430, chronic: 435 }
  ];

  const sleepData = [
    { date: 'Lun 4', sleep: 7.2, deep: 1.8, rem: 1.5 },
    { date: 'Mar 5', sleep: 7.5, deep: 2.0, rem: 1.6 },
    { date: 'Mié 6', sleep: 6.8, deep: 1.5, rem: 1.3 },
    { date: 'Jue 7', sleep: 8.0, deep: 2.2, rem: 1.8 },
    { date: 'Vie 8', sleep: 7.8, deep: 2.1, rem: 1.7 },
    { date: 'Sáb 9', sleep: 7.3, deep: 1.9, rem: 1.5 },
    { date: 'Dom 10', sleep: 7.7, deep: 2.0, rem: 1.6 }
  ];

  const performanceMetrics = [
    {
      title: 'FTP Actual',
      value: '285W',
      subValue: '3.8 W/kg',
      change: '+2.5%',
      trend: 'up' as const,
      icon: Zap,
      color: 'blue',
    },
    {
      title: 'HRV Promedio',
      value: '58ms',
      subValue: '7 días',
      change: '+7.4%',
      trend: 'up' as const,
      icon: Heart,
      color: 'red',
    },
    {
      title: 'TSS Semanal',
      value: '487',
      subValue: 'Esta semana',
      change: 'Óptimo',
      trend: 'up' as const,
      icon: Activity,
      color: 'green',
    },
    {
      title: 'Readiness',
      value: '78/100',
      subValue: 'Hoy',
      change: 'Excelente',
      trend: 'up' as const,
      icon: Target,
      color: 'purple',
    }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500 dark:text-red-400" />;
    return <Activity className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <GradientCard gradient="cyan-blue" delay={0}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-white font-bold text-xl mb-2">Análisis de Rendimiento</h2>
            <p className="text-cyan-100 text-sm">Últimos 30 días • Progresión óptima</p>
          </div>
          <div className="flex gap-2">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <motion.button
                key={range}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'bg-white/10 text-cyan-100 hover:bg-white/15'
                }`}
              >
                {range}
              </motion.button>
            ))}
          </div>
        </div>
      </GradientCard>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            icon={metric.icon}
            iconColor={metric.color}
            title={metric.title}
            value={metric.value}
            subtitle={`${metric.subValue} • ${metric.change}`}
            trendIcon={getTrendIcon(metric.trend)}
            delay={0.1 + index * 0.05}
          />
        ))}
      </div>

      {/* Charts Tabs */}
      <Tabs defaultValue="ftp" className="w-full">
        <TabsList className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-1 rounded-xl grid grid-cols-4">
          <TabsTrigger value="ftp" className="rounded-lg data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700">FTP</TabsTrigger>
          <TabsTrigger value="hrv" className="rounded-lg data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700">HRV & Estrés</TabsTrigger>
          <TabsTrigger value="load" className="rounded-lg data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700">Carga</TabsTrigger>
          <TabsTrigger value="sleep" className="rounded-lg data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700">Sueño</TabsTrigger>
        </TabsList>

        {/* FTP Evolution Chart */}
        <TabsContent value="ftp" className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold mb-1">Evolución de FTP</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Últimos 90 días</p>
                </div>
                <StatBadge variant="success">
                  +15W (+5.5%)
                </StatBadge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={ftpData}>
                  <defs>
                    <linearGradient id="ftpGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                    domain={[260, 290]}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                    domain={[3.5, 4.0]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="ftp"
                    fill="url(#ftpGradient)"
                    stroke="none"
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="ftp" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                    name="FTP (W)"
                    activeDot={{ r: 7 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="wkg" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#10b981', r: 4 }}
                    name="W/kg"
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                {[
                  { label: 'FTP Inicial', value: '270W', color: 'slate' },
                  { label: 'FTP Actual', value: '285W', color: 'blue' },
                  { label: 'Proyección 60d', value: '295W', color: 'green' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-medium">{stat.label}</p>
                    <p className={`text-${stat.color}-600 dark:text-${stat.color}-400 text-xl font-bold`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* HRV & Stress Chart */}
        <TabsContent value="hrv" className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold mb-1">HRV & Nivel de Estrés</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Últimos 7 días</p>
                </div>
                <StatBadge variant="success">
                  Recuperación óptima
                </StatBadge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={hrvData}>
                  <defs>
                    <linearGradient id="hrvGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="hrv"
                    fill="url(#hrvGradient)"
                    stroke="none"
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="hrv" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    dot={{ fill: '#ef4444', r: 5, strokeWidth: 2, stroke: '#fff' }}
                    name="HRV (ms)"
                    activeDot={{ r: 7 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="stress" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#f59e0b', r: 4 }}
                    name="Estrés"
                  />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4">
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  💡 <strong>Análisis:</strong> Tu HRV ha mejorado un 7.4% en la última semana. 
                  El nivel de estrés se mantiene bajo. Estado óptimo para entrenamientos de alta intensidad.
                </p>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Training Load Chart */}
        <TabsContent value="load" className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold mb-1">Carga de Entrenamiento</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">TSS Agudo vs Crónico</p>
                </div>
                <StatBadge variant="info">
                  Ratio: 0.99 (óptimo)
                </StatBadge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={trainingLoadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  />
                  <YAxis 
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="tss" fill="#3b82f6" name="TSS Semanal" radius={[8, 8, 0, 0]} />
                  <Line type="monotone" dataKey="acute" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} name="Carga Aguda" />
                  <Line type="monotone" dataKey="chronic" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5 }} name="Carga Crónica" />
                </ComposedChart>
              </ResponsiveContainer>
              <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                {[
                  { label: 'TSS Esta Semana', value: '487', color: 'blue' },
                  { label: 'Ratio A:C', value: '0.99', color: 'green' },
                  { label: 'Riesgo Lesión', value: 'Bajo', color: 'green' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-medium">{stat.label}</p>
                    <p className={`text-${stat.color}-600 dark:text-${stat.color}-400 text-xl font-bold`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Sleep Chart */}
        <TabsContent value="sleep" className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold mb-1">Análisis del Sueño</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Últimos 7 días</p>
                </div>
                <StatBadge variant="info">
                  Promedio: 7.5h
                </StatBadge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  />
                  <YAxis 
                    stroke="#64748b"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    itemStyle={{ fontSize: '13px', fontWeight: 500 }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="sleep" fill="#6366f1" name="Sueño Total (h)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="deep" fill="#8b5cf6" name="Sueño Profundo (h)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="rem" fill="#a78bfa" name="REM (h)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/30 rounded-xl p-4">
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  💤 <strong>Calidad del sueño:</strong> Excelente (85/100). 
                  Promedio de sueño profundo: 1.9h (óptimo). Continúa con esta rutina para maximizar recuperación.
                </p>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-cyan-500/10 dark:from-purple-900/20 dark:via-purple-900/10 dark:to-cyan-900/20 border-purple-500/20 dark:border-purple-700/30 p-6 backdrop-blur-sm">
          <div className="flex gap-4">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg"
            >
              <Activity className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-slate-900 dark:text-white font-semibold mb-3">Análisis Predictivo del Agente IA</h3>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  ✅ <strong>Progresión FTP:</strong> +15W en 90 días (+5.5%). Proyección: 295-300W en 60 días si mantienes consistencia.
                </p>
                <p>
                  ✅ <strong>Recuperación:</strong> HRV en tendencia positiva. Tu cuerpo se está adaptando correctamente al entrenamiento.
                </p>
                <p>
                  ⚡ <strong>Carga óptima:</strong> Ratio agudo/crónico en 0.99 (zona verde). Bajo riesgo de sobreentreno o lesión.
                </p>
                <p>
                  💡 <strong>Recomendación:</strong> Considera hacer un test FTP este domingo. Tus datos sugieren que has mejorado ~5W más.
                </p>
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                <StatBadge variant="success">Forma pico: 87/100</StatBadge>
                <StatBadge variant="info">Riesgo lesión: 12/100</StatBadge>
                <StatBadge variant="warning">Readiness: 78/100</StatBadge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
