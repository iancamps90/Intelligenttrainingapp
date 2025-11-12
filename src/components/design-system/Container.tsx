import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { animations } from '../../lib/design-tokens';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
};

export function Container({ children, className = '', animate = false, delay = 0 }: ContainerProps) {
  if (animate) {
    return (
      <motion.div
        initial={animations.fadeIn.initial}
        animate={animations.fadeIn.animate}
        transition={{ duration: 0.3, delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={className}>{children}</div>;
}
