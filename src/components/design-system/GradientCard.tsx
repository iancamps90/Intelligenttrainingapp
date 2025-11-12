import { ReactNode } from 'react';
import { motion } from 'motion/react';

type GradientCardProps = {
  children: ReactNode;
  gradient: 'blue-purple' | 'orange-pink' | 'green-blue' | 'purple-blue' | 'cyan-blue';
  className?: string;
  delay?: number;
};

export function GradientCard({ children, gradient, className = '', delay = 0 }: GradientCardProps) {
  const gradients = {
    'blue-purple': 'from-blue-600 via-blue-600 to-purple-700',
    'orange-pink': 'from-orange-600 via-orange-600 to-pink-600',
    'green-blue': 'from-green-600 via-green-600 to-blue-600',
    'purple-blue': 'from-purple-600 via-purple-600 to-blue-600',
    'cyan-blue': 'from-cyan-600 via-cyan-600 to-blue-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`bg-gradient-to-br ${gradients[gradient]} rounded-2xl p-6 shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
