import { useState } from 'react';
import { experiences, Experience } from '../../data/experiences';
import { ChemicalDetail } from './ChemicalDetail';

interface SubstanceInfo {
  name: string;
  experiences: Experience[];
}

export function ChemicalLibrary() {
  const [selectedSubstance, setSelectedSubstance] = useState<SubstanceInfo | null>(null);

  // Extract all unique substances
  const substanceMap = new Map<string, Experience[]>();
  experiences.forEach(exp => {
    exp.activeIngredients.forEach(ing => {
      if (!substanceMap.has(ing)) {
        substanceMap.set(ing, []);
      }
      substanceMap.get(ing)?.push(exp);
    });
  });

  const substances = Array.from(substanceMap.entries()).map(([name, exps]) => ({ name, experiences: exps }));

  return (
    <div className="p-6 h-full overflow-y-auto" dir="rtl">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">ספריית חומרים פעילים</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {substances.map(sub => (
          <div 
            key={sub.name} 
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-emerald-500/50 transition-colors"
            onClick={() => setSelectedSubstance(sub)}
          >
            <h2 className="text-xl font-bold text-zinc-100 mb-2">{sub.name}</h2>
            <p className="text-zinc-400 text-sm">מופיע ב-{sub.experiences.length} סאטלות</p>
          </div>
        ))}
      </div>

      {selectedSubstance && (
        <ChemicalDetail substance={selectedSubstance} onClose={() => setSelectedSubstance(null)} />
      )}
    </div>
  );
}
