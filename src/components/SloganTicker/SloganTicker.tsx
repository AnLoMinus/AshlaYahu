import { useState, useEffect } from 'react';
import { slogans } from './slogans';
import { motion, AnimatePresence } from 'motion/react';

export function SloganTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-zinc-950 border-b border-emerald-900/30 py-1 overflow-hidden relative">
      {/* Progress Bar */}
      <motion.div
        key={index}
        className="absolute bottom-0 left-0 h-[2px] bg-emerald-500/50"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 7, ease: 'linear' }}
      />
      
      <div className="relative h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.4 }}
            className="text-emerald-400 font-mono text-xs tracking-widest uppercase"
          >
            {slogans[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
