import { Experience } from '../../data/experiences';
import { X } from 'lucide-react';

interface ChemicalDetailProps {
  substance: { name: string; experiences: Experience[] };
  onClose: () => void;
}

export function ChemicalDetail({ substance, onClose }: ChemicalDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 sticky top-0 bg-zinc-950">
          <h2 className="text-2xl font-bold text-emerald-400">{substance.name}</h2>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-zinc-100">מופיע בסאטלות הבאות:</h3>
          {substance.experiences.map(exp => (
            <div key={exp.id} className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <h4 className="text-lg font-bold text-emerald-300 mb-2">{exp.name}</h4>
              <p className="text-zinc-400 text-sm mb-4">{exp.shortDescription}</p>
              
              <h5 className="text-sm font-bold text-zinc-500 uppercase mb-2">תחליפים טבעיים:</h5>
              <ul className="space-y-2">
                {exp.substitutes.map((sub, i) => (
                  <li key={i} className="bg-zinc-950 p-2 rounded border border-zinc-800">
                    <span className="font-bold text-emerald-500">{sub.name}:</span> {sub.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
