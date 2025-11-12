import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/card';

type MetricCardProps = {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendIcon?: ReactNode;
  progress?: number;
  delay?: number;
};

export function MetricCard({
  icon: Icon,
  iconColor,
  title,
  value,
  subtitle,
  trend,
  trendIcon,
  progress,
  delay = 0,
}: MetricCardProps) {
  const iconBgColors: Record<string, string> = {
    red: 'bg-red-500/10 dark:bg-red-500/20',
    blue: 'bg-blue-500/10 dark:bg-blue-500/20',
    green: 'bg-green-500/10 dark:bg-green-500/20',
    purple: 'bg-purple-500/10 dark:bg-purple-500/20',
    orange: 'bg-orange-500/10 dark:bg-orange-500/20',
    indigo: 'bg-indigo-500/10 dark:bg-indigo-500/20',
  };

  const iconColors: Record<string, string> = {
    red: 'text-red-500 dark:text-red-400',
    blue: 'text-blue-500 dark:text-blue-400',
    green: 'text-green-500 dark:text-green-400',
    purple: 'text-purple-500 dark:text-purple-400',
    orange: 'text-orange-500 dark:text-orange-400',
    indigo: 'text-indigo-500 dark:text-indigo-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 p-5 backdrop-blur-xl transition-all duration-200 hover:shadow-lg hover:border-blue-500/30 dark:hover:border-blue-500/30">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl ${iconBgColors[iconColor]} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}>
            <Icon className={`w-5 h-5 ${iconColors[iconColor]}`} />
          </div>
          {trendIcon && <div>{trendIcon}</div>}
        </div>
        <div className="space-y-2">
          <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium">{title}</h3>
          <p className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-slate-500 dark:text-slate-500 text-xs">{subtitle}</p>
          )}
          {progress !== undefined && (
            <div className="pt-2">
              <div className="h-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
