import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Leaf, Activity, Zap, Info } from 'lucide-react';
import { HumanBodySVG } from './HumanBodySVG';
import { bodyRegions, RegionId, ViewMode } from './bodyMapData';
import { cn } from '../../lib/utils';

export const BodyMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>('head');
  const [viewMode, setViewMode] = useState<ViewMode>('physical');

  const activeRegion = bodyRegions.find(r => r.id === selectedRegion);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Activity className="w-8 h-8 text-emerald-400" />
            מפת גוף אינטראקטיבית
          </h2>
          <p className="text-white/60 max-w-xl">
            גלו כיצד חומרים שונים משפיעים על המערכות הפיזיות והאנרגטיות בגופכם,
            ומצאו את התרופות הטבעיות (התחליפים) שנועדו לרפא ולחזק את אותם אזורים.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
          <button
            onClick={() => setViewMode('physical')}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
              viewMode === 'physical'
                ? "bg-white/10 text-white shadow-lg"
                : "text-white/40 hover:text-white/80"
            )}
          >
            <Activity className="w-4 h-4" />
            פיזי
          </button>
          <button
            onClick={() => setViewMode('energetic')}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
              viewMode === 'energetic'
                ? "bg-purple-500/20 text-purple-300 shadow-lg"
                : "text-white/40 hover:text-white/80"
            )}
          >
            <Zap className="w-4 h-4" />
            אנרגטי
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Info (Takes up 7 cols on large screens) */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            {activeRegion ? (
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md"
              >
                {/* Region Header */}
                <div className="mb-8">
                  <h3 className={cn("text-3xl font-bold mb-3", activeRegion.color)}>
                    {viewMode === 'physical' ? activeRegion.name : activeRegion.energeticName}
                  </h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {viewMode === 'physical' ? activeRegion.description : activeRegion.energeticDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chemical Impacts (The Damage) */}
                  <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
                    <h4 className="text-red-400 font-bold text-lg mb-4 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5" />
                      השפעת כימיקלים (נזק)
                    </h4>
                    <ul className="space-y-4">
                      {activeRegion.chemicalImpacts.map((impact, idx) => (
                        <li key={idx} className="text-sm">
                          <span className="font-bold text-red-300 block mb-1">{impact.substance}</span>
                          <span className="text-white/70">{impact.effect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Natural Healers (The Cure) */}
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
                    <h4 className="text-emerald-400 font-bold text-lg mb-4 flex items-center gap-2">
                      <Leaf className="w-5 h-5" />
                      תרופות הטבע (ריפוי)
                    </h4>
                    <ul className="space-y-4">
                      {activeRegion.naturalHealers.map((healer, idx) => (
                        <li key={idx} className="text-sm">
                          <span className="font-bold text-emerald-300 block mb-1">{healer.substitute}</span>
                          <span className="text-white/70">{healer.effect}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-white/40 border border-white/5 rounded-3xl bg-white/5 border-dashed p-8 text-center">
                <Info className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-xl">בחרו אזור במפת הגוף כדי לראות את ההשפעות</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel: SVG Map (Takes up 5 cols on large screens) */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center bg-black/20 rounded-3xl p-8 border border-white/5">
          <HumanBodySVG
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            viewMode={viewMode}
          />
        </div>

      </div>
    </div>
  );
};
