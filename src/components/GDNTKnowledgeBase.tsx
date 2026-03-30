import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { gdntData, Category } from '../data/gdnt';
import { ToleranceCard } from './ToleranceCard';

const categories: Category[] = ['Form', 'Profile', 'Orientation', 'Location', 'Runout'];

export function GDNTKnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const filteredData = useMemo(() => {
    return gdntData.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="mb-16 max-w-3xl relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-tertiary rounded-full -z-10 border-2 border-fg shadow-pop"></div>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-5xl sm:text-7xl font-heading font-extrabold text-fg tracking-tight mb-6 leading-tight"
        >
          Geometric Dimensioning <br className="hidden sm:block" />
          <span className="text-accent inline-block -rotate-2 bg-white px-4 py-1 border-4 border-fg rounded-2xl shadow-pop mt-2">
            & Tolerancing
          </span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-fg font-medium"
        >
          A playful, precision-engineered knowledge base.
          Search symbols, understand categories, and view feature control frames.
        </motion.p>
      </div>

      {/* Controls: Search & Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-6 mb-12"
      >
        <div className="relative flex-grow max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-fg" strokeWidth={2.5} />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 border-2 border-border rounded-xl leading-5 bg-white text-fg placeholder-muted-fg focus:outline-none focus:border-accent focus:shadow-[4px_4px_0px_0px_#8B5CF6] sm:text-lg font-medium transition-all duration-200"
            placeholder="Search symbols, names, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
          <div className="flex items-center pl-2 pr-4 border-r-2 border-border mr-2">
            <SlidersHorizontal className="h-6 w-6 text-fg" strokeWidth={2.5} />
          </div>
          <FilterButton 
            active={selectedCategory === 'All'} 
            onClick={() => setSelectedCategory('All')}
            color="bg-fg"
          >
            All
          </FilterButton>
          {categories.map((cat, i) => {
            const colors = ['bg-quaternary', 'bg-accent', 'bg-tertiary', 'bg-secondary', 'bg-fg'];
            return (
              <FilterButton 
                key={cat} 
                active={selectedCategory === cat} 
                onClick={() => setSelectedCategory(cat)}
                color={colors[i]}
              >
                {cat}
              </FilterButton>
            );
          })}
        </div>
      </motion.div>

      {/* Grid of Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
        <AnimatePresence mode="popLayout">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <ToleranceCard key={item.id} tolerance={item} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="col-span-full py-24 flex flex-col items-center justify-center text-fg bg-white border-2 border-fg rounded-3xl shadow-pop"
            >
              <div className="w-20 h-20 border-4 border-fg rounded-full flex items-center justify-center mb-6 bg-tertiary shadow-pop">
                <Search className="h-10 w-10 text-fg" strokeWidth={3} />
              </div>
              <p className="text-2xl font-heading font-bold text-fg">No tolerances found</p>
              <p className="text-lg font-medium text-muted-fg mt-2">Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

function FilterButton({ active, onClick, children, color }: { active: boolean, onClick: () => void, children: React.ReactNode, color: string }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-6 py-3 rounded-full text-base font-bold border-2 border-fg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        active 
          ? `${color} text-white shadow-pop shadow-pop-hover shadow-pop-active` 
          : 'bg-white text-fg hover:bg-muted shadow-sm'
      }`}
    >
      {children}
    </button>
  );
}
