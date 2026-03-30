import React, { useState } from 'react';
import { BookOpen, Calculator } from 'lucide-react';
import { GDNTKnowledgeBase } from './components/GDNTKnowledgeBase';
import { FitCalculator } from './components/FitCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'gdnt' | 'calculator'>('calculator');

  return (
    <div className="min-h-screen pb-20">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-bg border-b-2 border-fg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white border-2 border-fg shadow-pop">
              <BookOpen size={20} strokeWidth={2.5} />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight text-fg">
              PF Precision<span className="text-accent">Suite</span>
            </span>
          </div>
          
          <nav className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('gdnt')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] border-2 border-fg ${
                activeTab === 'gdnt' 
                  ? 'bg-accent text-white shadow-pop shadow-pop-hover shadow-pop-active' 
                  : 'bg-transparent text-fg hover:bg-tertiary'
              }`}
            >
              <BookOpen size={18} strokeWidth={2.5} />
              <span className="hidden sm:inline">GD&T Reference</span>
            </button>
            <button 
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] border-2 border-fg ${
                activeTab === 'calculator' 
                  ? 'bg-tertiary text-fg shadow-pop shadow-pop-hover shadow-pop-active' 
                  : 'bg-transparent text-fg hover:bg-tertiary'
              }`}
            >
              <Calculator size={18} strokeWidth={2.5} />
              <span className="hidden sm:inline">Fit Calculator</span>
            </button>
          </nav>
        </div>
      </header>

      {activeTab === 'gdnt' ? <GDNTKnowledgeBase /> : <FitCalculator />}
    </div>
  );
}
