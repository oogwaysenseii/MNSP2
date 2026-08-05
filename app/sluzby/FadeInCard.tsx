'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Minimal client boundary.
 *
 * /sluzby and /sluzby/rodinne-domy were both entirely "use client" purely so
 * their cards could fade in. That shipped every service, icon and bit of markup
 * as client JS. Only this wrapper needs to be interactive.
 *
 * The stagger is capped at 3 steps: with 12 cards, `index * 0.05` meant the
 * last one waited 0.55s, which reads as sluggish on a grid scrolling into view.
 *
 * `variant="bare"` drops the default card chrome for callers that supply their
 * own (e.g. the two large image cards on the rodinné domy hub).
 */
export function FadeInCard({
  index,
  children,
  variant = 'default',
}: {
  index: number;
  children: ReactNode;
  variant?: 'default' | 'bare';
}) {
  const chrome =
    variant === 'bare'
      ? 'bg-zinc-50 border border-zinc-200 overflow-hidden shadow-sm group-hover:shadow-xl group-hover:border-amber-500/30 transition-all duration-500 flex flex-col h-full'
      : 'flex flex-col h-full justify-between bg-zinc-50 hover:bg-white border border-zinc-200/80 p-6 hover:shadow-xl hover:border-zinc-300/80 transition-all duration-300 cursor-pointer';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.05 }}
      className={chrome}
    >
      {children}
    </motion.div>
  );
}
