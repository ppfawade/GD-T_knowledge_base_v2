import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InlineMath } from 'react-katex';
import { calculateFit } from '../data/iso286';
import { ToleranceVisualizer } from './ToleranceVisualizer';
import { Settings, AlertTriangle, CheckCircle2, ChevronDown } from 'lucide-react';

const FIT_OPTIONS = [
  { value: 'H7/g6', label: 'H7 / g6', tooltip: 'Clearance - Sliding Fit' },
  { value: 'H8/f7', label: 'H8 / f7', tooltip: 'Clearance - Running Fit' },
  { value: 'H7/p6', label: 'H7 / p6', tooltip: 'Interference - Press Fit' }
] as const;

export function FitCalculator() {
  const [nominal, setNominal] = useState<number>(20);
  const [fitPair, setFitPair] = useState<'H7/g6' | 'H7/p6' | 'H8/f7'>('H7/g6');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const result = calculateFit(nominal || 1, fitPair);

  const getDifficulty = (it: number) => {
    if (it <= 13) return { label: 'High Precision / Grinding', color: 'bg-secondary text-white', icon: <AlertTriangle size={16} strokeWidth={2.5} /> };
    if (it <= 25) return { label: 'Precision Turning / Milling', color: 'bg-tertiary text-fg', icon: <Settings size={16} strokeWidth={2.5} /> };
    return { label: 'Standard Machining', color: 'bg-quaternary text-fg', icon: <CheckCircle2 size={16} strokeWidth={2.5} /> };
  };

  const difficulty = getDifficulty(Math.min(result.hole.IT, result.shaft.IT));

  // Format for LaTeX: e.g. +0.021
  const formatTolerance = (val: number) => val > 0 ? `+${(val/1000).toFixed(3)}` : (val/1000).toFixed(3);
  
  const holeLatex = `${nominal} \\text{${result.hole.class}} \\binom{${formatTolerance(result.hole.ES)}}{${formatTolerance(result.hole.EI)}}`;
  const shaftLatex = `${nominal} \\text{${result.shaft.class}} \\binom{${formatTolerance(result.shaft.es)}}{${formatTolerance(result.shaft.ei)}}`;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16 relative">
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary rounded-tl-3xl rounded-br-3xl rounded-tr-none rounded-bl-none -z-10 border-2 border-fg shadow-pop"></div>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-5xl sm:text-7xl font-heading font-extrabold text-fg tracking-tight mb-4"
        >
          ISO 286 Fit <span className="text-white bg-accent px-4 py-1 rounded-2xl border-4 border-fg shadow-pop inline-block rotate-2">Calculator</span>
        </motion.h1>
        <p className="text-xl text-muted-fg font-medium mt-6">
          Compute precise limits and fits for engineering assemblies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Controls */}
        <section className="col-span-1 space-y-8 bg-white p-8 rounded-3xl border-2 border-fg shadow-sticker">
          <div>
            <label className="block text-sm font-bold text-fg uppercase tracking-widest mb-3">Basic Size (mm)</label>
            <input 
              type="number" 
              value={nominal}
              onChange={(e) => setNominal(Number(e.target.value))}
              className="w-full bg-white border-2 border-border rounded-xl px-5 py-4 text-fg font-mono text-xl font-bold focus:ring-0 focus:border-accent focus:shadow-[4px_4px_0px_0px_#8B5CF6] outline-none transition-all"
              min="1" max="500"
            />
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-bold text-fg uppercase tracking-widest mb-3">Fit Class Pair</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center bg-white border-2 border-border rounded-xl px-5 py-4 text-fg font-mono text-xl font-bold focus:ring-0 focus:border-accent focus:shadow-[4px_4px_0px_0px_#8B5CF6] outline-none transition-all"
            >
              <span>{FIT_OPTIONS.find(o => o.value === fitPair)?.label}</span>
              <ChevronDown size={24} strokeWidth={3} className={`transition-transform text-fg ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute z-50 w-full mt-3 bg-white border-2 border-fg rounded-xl shadow-pop overflow-visible"
                >
                  {FIT_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="group relative px-5 py-4 hover:bg-muted cursor-pointer transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center justify-between border-b-2 border-border last:border-b-0"
                      onClick={() => {
                        setFitPair(option.value as any);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span className="font-mono text-lg font-bold text-fg">{option.label}</span>
                      {fitPair === option.value && <div className="w-6 h-6 rounded-full bg-tertiary border-2 border-fg flex items-center justify-center"><CheckCircle2 size={14} strokeWidth={3} className="text-fg" /></div>}
                      
                      {/* Tooltip */}
                      <div className="absolute left-0 right-0 bottom-full mb-2 hidden group-hover:flex justify-center z-[60] pointer-events-none">
                        <div className="bg-fg border-2 border-fg text-white font-bold text-sm px-4 py-2 rounded-xl shadow-pop whitespace-nowrap flex items-center gap-3">
                          <span className="w-3 h-3 rounded-full bg-tertiary border-2 border-fg"></span>
                          {option.tooltip}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-6 border-t-2 border-dashed border-border">
            <div className="text-xs text-muted-fg font-bold uppercase tracking-widest mb-3">Machining Difficulty</div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold border-2 border-fg shadow-pop-sm ${difficulty.color}`}>
              {difficulty.icon}
              {difficulty.label}
            </div>
          </div>
        </section>

        {/* Results & Visualization */}
        <section className="col-span-1 lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Hole Output */}
            <output className="bg-white p-8 rounded-3xl border-2 border-fg shadow-sticker-pink relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-3 bg-secondary border-b-2 border-fg"></div>
              <div className="text-sm font-bold text-muted-fg uppercase tracking-widest mb-2 mt-2">Hole Limits</div>
              <div className="text-3xl font-mono font-bold text-fg mb-6">
                <InlineMath math={holeLatex} />
              </div>
              <div className="grid grid-cols-2 gap-6 text-base font-mono font-bold">
                <div className="bg-muted p-3 rounded-xl border-2 border-border">
                  <div className="text-muted-fg text-xs uppercase mb-1">Max (mm)</div>
                  <div className="text-fg text-xl">{(nominal + result.hole.ES/1000).toFixed(3)}</div>
                </div>
                <div className="bg-muted p-3 rounded-xl border-2 border-border">
                  <div className="text-muted-fg text-xs uppercase mb-1">Min (mm)</div>
                  <div className="text-fg text-xl">{(nominal + result.hole.EI/1000).toFixed(3)}</div>
                </div>
              </div>
            </output>

            {/* Shaft Output */}
            <output className="bg-white p-8 rounded-3xl border-2 border-fg shadow-sticker-yellow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-3 bg-tertiary border-b-2 border-fg"></div>
              <div className="text-sm font-bold text-muted-fg uppercase tracking-widest mb-2 mt-2">Shaft Limits</div>
              <div className="text-3xl font-mono font-bold text-fg mb-6">
                <InlineMath math={shaftLatex} />
              </div>
              <div className="grid grid-cols-2 gap-6 text-base font-mono font-bold">
                <div className="bg-muted p-3 rounded-xl border-2 border-border">
                  <div className="text-muted-fg text-xs uppercase mb-1">Max (mm)</div>
                  <div className="text-fg text-xl">{(nominal + result.shaft.es/1000).toFixed(3)}</div>
                </div>
                <div className="bg-muted p-3 rounded-xl border-2 border-border">
                  <div className="text-muted-fg text-xs uppercase mb-1">Min (mm)</div>
                  <div className="text-fg text-xl">{(nominal + result.shaft.ei/1000).toFixed(3)}</div>
                </div>
              </div>
            </output>
          </div>

          {/* Fit Details & Graph */}
          <div className="bg-white p-8 rounded-3xl border-2 border-fg shadow-sticker">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
              <div>
                <div className="text-sm font-bold text-muted-fg uppercase tracking-widest mb-2">Fit Type</div>
                <div className="text-3xl font-heading font-extrabold text-fg bg-quaternary px-4 py-1 rounded-xl border-2 border-fg shadow-pop inline-block rotate-1">{result.fit.type}</div>
              </div>
              <div className="text-right font-mono font-bold bg-muted p-4 rounded-xl border-2 border-border w-full sm:w-auto">
                <div className="text-muted-fg flex justify-between gap-6 mb-2">
                  <span>Max Clearance:</span> 
                  <span className="text-fg">{(result.fit.maxClearance/1000).toFixed(3)} mm</span>
                </div>
                <div className="text-muted-fg flex justify-between gap-6">
                  <span>Min Clearance:</span> 
                  <span className="text-fg">{(result.fit.minClearance/1000).toFixed(3)} mm</span>
                </div>
              </div>
            </div>
            
            <ToleranceVisualizer hole={result.hole} shaft={result.shaft} />
          </div>
        </section>
      </div>
    </main>
  );
}
