import React from 'react';
import { motion } from 'motion/react';

interface Props {
  hole: { ES: number; EI: number };
  shaft: { es: number; ei: number };
}

export function ToleranceVisualizer({ hole, shaft }: Props) {
  // Determine scale to fit both bars comfortably
  const maxVal = Math.max(hole.ES, shaft.es, 15);
  const minVal = Math.min(hole.EI, shaft.ei, -15);
  const range = maxVal - minVal;
  const padding = range * 0.25; // 25% padding top and bottom
  const top = maxVal + padding;
  const bottom = minVal - padding;
  const totalHeight = top - bottom;

  const getTopPct = (val: number) => ((top - val) / totalHeight) * 100;
  const getHeightPct = (upper: number, lower: number) => ((upper - lower) / totalHeight) * 100;

  const zeroTop = getTopPct(0);

  return (
    <div 
      className="relative w-full h-80 bg-bg rounded-2xl border-2 border-fg overflow-hidden font-mono text-xs shadow-inner"
      style={{ 
        backgroundImage: 'radial-gradient(var(--color-border) 2px, transparent 2px)', 
        backgroundSize: '20px 20px' 
      }}
    >
      {/* Zero Line */}
      <div 
        className="absolute left-0 right-0 border-t-4 border-dashed border-fg flex items-center z-10"
        style={{ top: `${zeroTop}%` }}
      >
        <span className="absolute left-4 -top-4 text-fg font-bold bg-white border-2 border-fg shadow-pop px-2 py-1 rounded-lg z-30">0 (Nominal)</span>
      </div>

      {/* Hole Bar */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: 1, 
          top: `${getTopPct(hole.ES)}%`, 
          height: `${getHeightPct(hole.ES, hole.EI)}%` 
        }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute left-[15%] sm:left-[25%] w-[30%] sm:w-[20%] bg-secondary border-4 border-fg rounded-xl flex flex-col items-center justify-center z-20 shadow-pop"
      >
        <span className="text-white font-extrabold tracking-widest text-sm drop-shadow-md">HOLE</span>
        <span className="text-white font-bold bg-fg/20 px-2 py-0.5 rounded mt-1">{hole.ES - hole.EI}µm</span>
      </motion.div>

      {/* Shaft Bar */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: 1, 
          top: `${getTopPct(shaft.es)}%`, 
          height: `${getHeightPct(shaft.es, shaft.ei)}%` 
        }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
        className="absolute right-[15%] sm:right-[25%] w-[30%] sm:w-[20%] bg-tertiary border-4 border-fg rounded-xl flex flex-col items-center justify-center z-20 shadow-pop"
      >
        <span className="text-fg font-extrabold tracking-widest text-sm drop-shadow-sm">SHAFT</span>
        <span className="text-fg font-bold bg-white/50 px-2 py-0.5 rounded mt-1">{shaft.es - shaft.ei}µm</span>
      </motion.div>

      {/* Y-Axis Scale Indicators */}
      <div className="absolute right-4 top-4 text-fg font-bold bg-white border-2 border-fg px-2 py-1 rounded-lg shadow-pop-sm z-30">+{Math.round(top)}µm</div>
      <div className="absolute right-4 bottom-4 text-fg font-bold bg-white border-2 border-fg px-2 py-1 rounded-lg shadow-pop-sm z-30">{Math.round(bottom)}µm</div>
    </div>
  );
}
