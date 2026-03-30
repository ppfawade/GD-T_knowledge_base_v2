import React from 'react';
import { motion } from 'motion/react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { Tolerance } from '../data/gdnt';

interface ToleranceCardProps {
  tolerance: Tolerance;
}

const categoryColors = {
  Form: 'bg-quaternary text-fg shadow-sticker-green',
  Profile: 'bg-accent text-white shadow-sticker',
  Orientation: 'bg-tertiary text-fg shadow-sticker-yellow',
  Location: 'bg-secondary text-white shadow-sticker-pink',
  Runout: 'bg-fg text-white shadow-sticker',
};

export const ToleranceCard: React.FC<ToleranceCardProps> = ({ tolerance }) => {
  const colorClass = categoryColors[tolerance.category];
  
  const hasSplitDescription = tolerance.description.includes('For Learners:');
  let isoText = tolerance.description;
  let learnerText = '';

  if (hasSplitDescription) {
    const parts = tolerance.description.split('For Learners:');
    isoText = parts[0].replace('ISO 1101:', '').replace('ISO 1101 (Coaxiality):', '').trim();
    learnerText = parts[1].trim();
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className={`group relative flex flex-col bg-white border-2 border-fg rounded-xl p-6 transition-all duration-300 hover:-rotate-1 hover:scale-[1.02] ${colorClass.split(' ')[2]}`}
    >
      <div className="flex justify-between items-start mb-6 mt-2">
        <div className="flex items-center gap-4">
          {/* Floating Icon */}
          <div className={`absolute -top-6 left-6 flex items-center justify-center w-12 h-12 rounded-full border-2 border-fg shadow-pop ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]}`}>
            <span className="text-2xl font-mono font-bold">{tolerance.symbol}</span>
          </div>
          <div className="ml-14">
            <h3 className="text-xl font-heading font-bold text-fg tracking-tight">
              {tolerance.name}
            </h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border-2 border-fg mt-2 ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]}`}>
              {tolerance.category}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col gap-3 mb-6">
        {hasSplitDescription ? (
          <>
            <div className="bg-muted p-3 rounded-xl border-2 border-border">
              <span className="text-[10px] text-muted-fg font-bold uppercase tracking-widest block mb-1">ISO 1101 Definition</span>
              <p className="text-sm text-fg font-medium leading-relaxed">
                {isoText}
              </p>
            </div>
            <div className="bg-accent/10 p-3 rounded-xl border-2 border-accent/30">
              <span className="text-[10px] text-accent font-bold uppercase tracking-widest block mb-1">For Learners</span>
              <p className="text-sm text-fg font-bold leading-relaxed">
                {learnerText}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-fg font-medium leading-relaxed">
            {tolerance.description}
          </p>
        )}
      </div>

      <div className="mt-auto pt-4 border-t-2 border-dashed border-border">
        <div className="text-[10px] text-muted-fg font-bold uppercase tracking-widest mb-2">Feature Control Frame</div>
        <div className="bg-muted rounded-lg p-3 overflow-x-auto border-2 border-border flex items-center justify-center min-h-[60px]">
          <InlineMath math={tolerance.latexExample} />
        </div>
      </div>
    </motion.div>
  );
};
