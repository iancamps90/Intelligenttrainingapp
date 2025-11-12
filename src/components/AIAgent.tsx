import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Zap, TrendingUp, Activity, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { StatBadge } from './design-system/StatBadge';
import { GradientCard } from './design-system/GradientCard';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
};

export default function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola Carlos! 👋 Soy tu agente de entrenamiento inteligente. He analizado tus métricas de hoy:\n\n• HRV: 62ms (+7% vs promedio)\n• Sueño: 85/100 (7h 45min)\n• Estrés: Bajo (35/100)\n• FTP actual: 285W (3.8 W/kg)\n\n**Tu estado es óptimo para un entrenamiento de alta intensidad.** He preparado una sesión de intervalos de umbral para hoy.\n\n¿Qué te gustaría saber o ajustar?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      suggestions: [
        '¿Cuál es mi plan de la semana?',
        'Ajusta mi FTP',
        'Recomendación de nutrición',
        'Analiza mi progreso'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();

    if (input.includes('plan') && input.includes('semana')) {
      return {
        content: '📅 **Plan de Entrenamiento - Semana del 11-17 Nov**\n\n**Lunes (Hoy)**\n• Ciclismo: 2×20min @ FTP (TSS: 85)\n• Core: 30min opcional\n\n**Martes**\n• Gimnasio: Fuerza máxima - Tren inferior\n  - Sentadilla: 4×5 @ 85% 1RM\n  - Peso muerto rumano: 3×8\n  - Zancadas búlgaras: 3×10/pierna\n\n**Miércoles**\n• Rodaje Z2: 90min (TSS: 55)\n• Recuperación activa\n\n**Jueves**\n• VO2max: 5×5min @ 120% FTP (TSS: 92)\n• Core dinámico: 20min\n\n**Viernes**\n• Descanso / movilidad\n\n**Sábado**\n• Salida larga Z2-Z3: 3h (TSS: 180)\n\n**Domingo**\n• Gimnasio: Fuerza - Tren superior\n• Rodaje suave: 60min\n\n**TSS semanal total: 487** (carga óptima para tu nivel)',
        suggestions: ['Ajusta la carga semanal', '¿Cómo mejoro mi FTP?', 'Nutrición para el sábado']
      };
    }

    if (input.includes('ftp')) {
      return {
        content: '🎯 **Análisis de FTP**\n\nTu FTP actual es **285W (3.8 W/kg)**.\n\n**Evolución últimos 3 meses:**\n• Agosto: 270W (3.6 W/kg)\n• Septiembre: 278W (3.7 W/kg)\n• Noviembre: 285W (3.8 W/kg)\n\n**Progresión: +15W (+5.5%)**\n\nBasándome en tus últimas sesiones de umbral, estimo que tu FTP podría estar cerca de **290W**.\n\n**Recomendación:** Programa un test FTP para el próximo domingo. Tus métricas de potencia en las últimas semanas sugieren que has mejorado.\n\n**Zonas actualizadas (base 285W):**\n• Z1 Recuperación: <171W\n• Z2 Resistencia: 171-228W\n• Z3 Tempo: 228-257W\n• Z4 Umbral: 257-285W\n• Z5 VO2max: 285-342W\n• Z6 Anaeróbico: >342W',
        suggestions: ['Programa test FTP', 'Ver entrenamientos de umbral', 'Comparar con otros ciclistas']
      };
    }

    if (input.includes('nutrición') || input.includes('nutricion')) {
      return {
        content: '🍽️ **Recomendación Nutricional para Hoy**\n\n**Objetivo:** 2,850 kcal (día de entrenamiento intenso)\n\n**Macros:**\n• Proteína: 165g (2.2g/kg)\n• Carbohidratos: 380g (5g/kg)\n• Grasas: 75g (25% calorías)\n\n**Distribución del día:**\n\n**Desayuno (7:00)** - 750 kcal\n• Avena con plátano y mantequilla de cacahuete\n• 3 huevos revueltos\n• Café\n\n**Pre-entreno (10:30)** - 400 kcal\n• Tostadas con mermelada\n• Plátano\n• 60-80g carbohidratos\n\n**Durante entreno (13:00)** - 240 kcal\n• Bebida isotónica: 60g carbohidratos/hora\n• 750ml agua/hora\n\n**Post-entreno (14:30)** - 500 kcal\n• Batido recuperación: 30g proteína + 80g carbs\n\n**Comida (16:00)** - 700 kcal\n• Arroz/pasta con pollo y verduras\n\n**Cena (21:00)** - 260 kcal\n• Salmón con ensalada\n• Patata dulce\n\n💡 **Importante:** Hoy necesitas más carbohidratos por el trabajo de umbral.',
        suggestions: ['Suplementación recomendada', 'Recetas rápidas', 'Nutrición para perder grasa']
      };
    }

    if (input.includes('progreso') || input.includes('analiza')) {
      return {
        content: '📊 **Análisis de Progreso - Últimos 30 días**\n\n**Rendimiento:**\n✅ FTP: +7W (+2.5%)\n✅ Peso: 75kg (estable, óptimo)\n✅ W/kg: 3.8 (+0.1)\n✅ TSS promedio semanal: 450-520 (zona óptima)\n\n**Recuperación:**\n✅ HRV promedio: 58ms (mejorado desde 54ms)\n✅ Calidad sueño: 82/100 (consistente)\n⚠️ Estrés: Ocasionalmente alto (2-3 días/semana)\n\n**Fortalezas:**\n• Excelente progresión en trabajo de umbral\n• Buena consistencia en el entrenamiento\n• Recuperación adecuada\n\n**Áreas de mejora:**\n• VO2max: Necesitas más sesiones cortas de alta intensidad\n• Fuerza explosiva: Añadir pliometría\n• Gestión del estrés: Considera técnicas de relajación\n\n**Predicción FTP a 60 días:** 295-300W si mantienes la progresión actual.\n\n**Riesgo de lesión:** Bajo (12/100)\n**Forma actual:** Pico (87/100)',
        suggestions: ['Plan para llegar a 300W', 'Ejercicios de VO2max', 'Prevención de lesiones']
      };
    }

    return {
      content: 'Entiendo tu consulta. Como tu agente de entrenamiento, puedo ayudarte con:\n\n• 📅 Planificación de entrenamientos\n• 📈 Análisis de métricas y progreso\n• 🍽️ Recomendaciones nutricionales\n• 💪 Ajustes de carga y periodización\n• 🎯 Optimización de zonas de entrenamiento\n\n¿En qué aspecto específico te gustaría que te ayude?',
      suggestions: ['Ver plan semanal', 'Analizar mi FTP', 'Consejos de nutrición', 'Estado de forma']
    };
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col pb-24 space-y-4">
      {/* Header Stats */}
      <GradientCard gradient="purple-blue" delay={0}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-white font-bold">Agente IA Activo</h3>
              <p className="text-purple-200 text-sm">Análisis en tiempo real</p>
            </div>
          </div>
          <StatBadge variant="success" icon={<Activity className="w-3 h-3" />}>
            Online
          </StatBadge>
        </div>
      </GradientCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Readiness', value: '78/100', icon: Zap, color: 'blue' },
          { label: 'FTP', value: '285W', icon: TrendingUp, color: 'green' },
          { label: 'TSS/sem', value: '487', icon: Activity, color: 'purple' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 text-${stat.color}-500 dark:text-${stat.color}-400`} />
                  <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">{stat.label}</span>
                </div>
                <p className="text-slate-900 dark:text-white text-xl font-bold">{stat.value}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Messages */}
      <Card className="flex-1 bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-4 overflow-hidden flex flex-col backdrop-blur-sm">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', bounce: 0.3 }}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'assistant'
                      ? 'bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg'
                      : 'bg-gradient-to-br from-orange-500 to-pink-600 shadow-lg'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </motion.div>
                <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`rounded-2xl p-4 max-w-[85%] ${
                      message.role === 'assistant'
                        ? 'bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600'
                        : 'bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-500/30'
                    }`}
                  >
                    <p className="text-slate-900 dark:text-slate-100 text-sm whitespace-pre-line leading-relaxed">
                      {message.content}
                    </p>
                    {message.suggestions && message.suggestions.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600 flex flex-wrap gap-2"
                      >
                        {message.suggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSendMessage(suggestion)}
                            className="px-3 py-1.5 bg-white dark:bg-slate-600/50 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-lg text-xs text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-500 font-medium"
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl p-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ 
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15
                      }}
                      className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(inputValue)}
            placeholder="Pregunta al agente IA..."
            className="flex-1 bg-slate-100 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => handleSendMessage(inputValue)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-4 shadow-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </Card>
    </div>
  );
}
