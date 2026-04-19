import { useState } from 'react';
import { glossaryData, GlossaryTerm } from '../../data/glossary';
import { Search, Book, HelpCircle, Zap, Brain } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'הכל', icon: Book },
    { id: 'abbreviation', name: 'ראשי תיבות', icon: HelpCircle },
    { id: 'slang', name: 'סלנג', icon: Zap },
    { id: 'technical', name: 'מונחים טכניים', icon: Brain },
    { id: 'general', name: 'כללי', icon: Book },
  ];

  const filteredData = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.meaning.includes(searchTerm) || 
                          (item.fullForm && item.fullForm.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || !selectedCategory || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 h-full overflow-y-auto" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-emerald-400">אוצר מילים ומונחים</h1>
            <div className="text-zinc-500 text-sm font-mono">
              {filteredData.length} מונחים נמצאו
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="חפש מונח, ראשי תיבות או פירוש..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pr-12 pl-4 text-zinc-100 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                    (selectedCategory === cat.id || (cat.id === 'all' && !selectedCategory))
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Glossary List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredData.map((item, index) => (
            <div 
              key={index}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-emerald-300 group-hover:text-emerald-400 transition-colors">
                    {item.term}
                  </h3>
                  <span className={cn(
                    "text-[10px] uppercase tracking-widest px-2 py-1 rounded font-mono",
                    item.category === 'technical' ? "bg-purple-500/10 text-purple-400" :
                    item.category === 'slang' ? "bg-yellow-500/10 text-yellow-400" :
                    item.category === 'abbreviation' ? "bg-cyan-500/10 text-cyan-400" :
                    "bg-zinc-800 text-zinc-400"
                  )}>
                    {categories.find(c => c.id === item.category)?.name}
                  </span>
                </div>
                
                {item.fullForm && (
                  <div className="text-zinc-500 text-sm font-mono italic">
                    {item.fullForm}
                  </div>
                )}
                
                <p className="text-zinc-300 leading-relaxed mt-2">
                  {item.meaning}
                </p>
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
              <Book className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500">לא נמצאו מונחים התואמים את החיפוש שלך.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
