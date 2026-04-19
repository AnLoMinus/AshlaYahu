import { useState, useMemo } from 'react';
import { categories, experiences, Experience, BodyPart } from '../data/experiences';
import { Search, ChevronLeft, Sparkles, Zap, Clock, Filter, ArrowUpDown, AlertTriangle, Leaf, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface LibraryProps {
  onSelectExperience: (exp: Experience) => void;
}

type SortOption = 'name' | 'intensity' | 'duration' | 'naturalness';

export function Library({ onSelectExperience }: LibraryProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeBodyPart, setActiveBodyPart] = useState<BodyPart | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  const bodyParts: { id: BodyPart | 'all'; name: string }[] = [
    { id: 'all', name: 'כל הגוף' },
    { id: 'brain', name: 'מוח' },
    { id: 'heart', name: 'לב' },
    { id: 'lungs', name: 'ריאות' },
    { id: 'stomach', name: 'בטן' },
    { id: 'muscles', name: 'שרירים' },
    { id: 'nervous_system', name: 'מערכת העצבים' },
  ];

  const filteredAndSortedExperiences = useMemo(() => {
    let result = experiences.filter(exp => {
      const matchesCategory = activeCategory ? exp.category === activeCategory : true;
      const matchesSearch = exp.name.includes(searchQuery) || exp.shortDescription.includes(searchQuery);
      const matchesBodyPart = activeBodyPart === 'all' ? true : exp.affectedBodyParts.includes(activeBodyPart as BodyPart);
      return matchesCategory && matchesSearch && matchesBodyPart;
    });

    return result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'intensity') return b.rating.intensity - a.rating.intensity;
      if (sortBy === 'naturalness') return b.rating.naturalness - a.rating.naturalness;
      return 0;
    });
  }, [activeCategory, activeBodyPart, searchQuery, sortBy]);

  return (
    <div className="h-full overflow-y-auto p-6 bg-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 flex items-center gap-3">
              <Sparkles className="w-10 h-10 text-emerald-500 animate-pulse" />
              מפת הסטלות העולמית
            </h1>
            <p className="text-zinc-400 mt-2 text-lg">ספריית החוויות המלאה - חקור, הבן ומצא תחליפים קדושים.</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="חפש חוויה..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                dir="rtl"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono uppercase tracking-widest ml-2">
                <ArrowUpDown className="w-3 h-3" />
                מיון:
              </div>
              {(['name', 'intensity', 'naturalness'] as SortOption[]).map(option => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={cn(
                    "px-3 py-1 rounded-md text-[10px] font-bold transition-all whitespace-nowrap",
                    sortBy === option ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {option === 'name' ? 'שם' : option === 'intensity' ? 'עוצמה' : 'טבעיות'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="space-y-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all border flex items-center gap-2",
                activeCategory === null
                  ? "bg-zinc-100 text-zinc-900 border-zinc-100 shadow-lg shadow-white/10"
                  : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:bg-zinc-800"
              )}
            >
              🌈 הכל
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all border flex items-center gap-2",
                  activeCategory === cat.id
                    ? `${cat.bg} ${cat.color} ${cat.border} shadow-lg`
                    : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:bg-zinc-800"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Body Part Filter */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium whitespace-nowrap ml-2">
              <Activity className="w-4 h-4" />
              השפעה על:
            </div>
            {bodyParts.map(part => (
              <button
                key={part.id}
                onClick={() => setActiveBodyPart(part.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border",
                  activeBodyPart === part.id
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                    : "bg-zinc-900/30 text-zinc-500 border-zinc-800/50 hover:border-zinc-700"
                )}
              >
                {part.name}
              </button>
            ))}
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedExperiences.map(exp => {
              const cat = categories.find(c => c.id === exp.category);
              const isHighRisk = exp.risks.length > 2 || exp.intensityScale.includes('גבוהה מאוד');
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={exp.id}
                  onClick={() => onSelectExperience(exp)}
                  className={cn(
                    "group relative overflow-hidden bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 hover:border-emerald-500/50 rounded-[2rem] p-7 cursor-pointer transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.2)] hover:-translate-y-2 flex flex-col h-full",
                    exp.category === 'stimulant' && "hover:animate-[pulse_3s_infinite]"
                  )}
                >
                  {/* Cyber Glow Background */}
                  <div className={cn(
                    "absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl",
                    cat?.id === 'psychedelic' && "bg-gradient-to-br from-purple-500/20 via-fuchsia-500/10 to-transparent",
                    cat?.id === 'stimulant' && "bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-transparent",
                    cat?.id === 'relaxant' && "bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent",
                    cat?.id === 'euphoric' && "bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent",
                    cat?.id === 'dissociative' && "bg-gradient-to-br from-cyan-500/20 via-indigo-500/10 to-transparent"
                  )} />
                  
                  <div className="relative z-10 flex items-start justify-between mb-6">
                    <div className="flex flex-col gap-2">
                      <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md inline-block", cat?.bg, cat?.color, cat?.border)}>
                        {cat?.name}
                      </div>
                      {isHighRisk && (
                        <div className="flex items-center gap-1 text-[9px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md w-fit">
                          <AlertTriangle className="w-3 h-3" />
                          זהירות: עוצמה גבוהה
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="w-10 h-10 rounded-2xl bg-zinc-800/50 flex items-center justify-center text-zinc-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all duration-300 group-hover:rotate-12">
                        <ChevronLeft className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-500/70 font-bold bg-emerald-500/5 px-2 py-1 rounded-lg border border-emerald-500/10">
                        <Leaf className="w-3 h-3" />
                        {exp.substitutes.length} תחליפים
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex-1">
                    <h3 className="text-2xl font-black text-zinc-100 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-300">
                      {exp.name}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-5 group-hover:text-zinc-300 transition-colors duration-300">
                      {exp.shortDescription}
                    </p>

                    {/* Tags / Positive Effects */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {exp.positiveEffects.slice(0, 3).map((effect, i) => (
                        <span key={i} className="text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-zinc-400 group-hover:text-emerald-300 group-hover:border-emerald-500/20 transition-all hover:scale-105">
                          {effect}
                        </span>
                      ))}
                    </div>

                    {/* Mini Rating Bars */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-3 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[8px] uppercase tracking-tighter text-zinc-500 font-bold">
                          <span>מודעות</span>
                          <span className="text-emerald-500/70">{exp.rating.awareness}/10</span>
                        </div>
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${exp.rating.awareness * 10}%` }}
                            className="h-full bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[8px] uppercase tracking-tighter text-zinc-500 font-bold">
                          <span>רגש</span>
                          <span className="text-cyan-500/70">{exp.rating.emotional}/10</span>
                        </div>
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${exp.rating.emotional * 10}%` }}
                            className="h-full bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-5 mt-auto border-t border-zinc-800/50 group-hover:border-emerald-500/20 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-yellow-500/70" />
                      <span className="font-bold">עוצמה: {exp.intensityScale}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-500/70" />
                      <span className="font-bold">{exp.duration}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {filteredAndSortedExperiences.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center"
            >
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-10 max-w-md mx-auto">
                <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-300 mb-2">לא נמצאו חוויות</h3>
                <p className="text-zinc-500 text-sm">נסה לשנות את מסנני החיפוש או את קטגוריית הגוף.</p>
                <button 
                  onClick={() => { setActiveCategory(null); setActiveBodyPart('all'); setSearchQuery(''); }}
                  className="mt-6 px-6 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all"
                >
                  אפס מסננים
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
