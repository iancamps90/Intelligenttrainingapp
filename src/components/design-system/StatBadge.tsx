import { ReactNode } from 'react';
import { Badge } from '../ui/badge';

type StatBadgeProps = {
  children: ReactNode;
  variant: 'success' | 'warning' | 'info' | 'neutral' | 'error';
  icon?: ReactNode;
};

export function StatBadge({ children, variant, icon }: StatBadgeProps) {
  const variants = {
    success: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 dark:border-green-500/30',
    warning: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 dark:border-orange-500/30',
    info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 dark:border-blue-500/30',
    neutral: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 dark:border-slate-500/30',
    error: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 dark:border-red-500/30',
  };

  return (
    <Badge className={`${variants[variant]} font-medium px-3 py-1 text-xs`}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </Badge>
  );
}
