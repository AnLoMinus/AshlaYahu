import React from 'react';
import { motion } from 'motion/react';
import { RegionId, bodyRegions, ViewMode } from './bodyMapData';
import { cn } from '../../lib/utils';

interface HumanBodySVGProps {
  selectedRegion: RegionId | null;
  onSelectRegion: (id: RegionId) => void;
  viewMode: ViewMode;
}

export const HumanBodySVG: React.FC<HumanBodySVGProps> = ({ selectedRegion, onSelectRegion, viewMode }) => {
  // Base SVG dimensions
  const viewBox = "0 0 200 400";

  return (
    <div className="relative w-full max-w-[300px] mx-auto aspect-[1/2]">
      <svg
        viewBox={viewBox}
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base Body Silhouette (Abstract/Cyber) */}
        <motion.path
          d="M 100 20 C 80 20 70 40 70 55 C 70 70 85 80 100 80 C 115 80 130 70 130 55 C 130 40 120 20 100 20 Z M 100 90 C 60 90 40 110 40 140 L 50 220 L 70 220 L 70 380 L 90 380 L 90 250 L 110 250 L 110 380 L 130 380 L 130 220 L 150 220 L 160 140 C 160 110 140 90 100 90 Z"
          fill="currentColor"
          className="text-white/5 dark:text-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Central Nervous System / Energy Channel (Sushumna) */}
        <motion.line
          x1="100"
          y1="40"
          x2="100"
          y2="280"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          className={cn(
            "transition-colors duration-500",
            viewMode === 'energetic' ? "text-white/30" : "text-transparent"
          )}
        />

        {/* Interactive Regions */}
        {bodyRegions.map((region) => {
          const isSelected = selectedRegion === region.id;
          const isHoverable = !selectedRegion || isSelected;

          // Determine color based on view mode and selection
          let nodeColor = "text-white/20"; // default
          if (isSelected) {
            nodeColor = region.color; // e.g., text-purple-400
          } else if (viewMode === 'energetic') {
            nodeColor = region.color.replace('400', '500/50'); // Dimmer version for energetic view
          }

          return (
            <g
              key={region.id}
              onClick={() => onSelectRegion(region.id)}
              className={cn(
                "cursor-pointer transition-all duration-300",
                isHoverable ? "opacity-100" : "opacity-30"
              )}
              style={{ transformOrigin: `100px ${region.cy}px` }}
            >
              {/* Pulse effect for energetic mode or selected state */}
              {(isSelected || viewMode === 'energetic') && (
                <motion.circle
                  cx="100"
                  cy={region.cy}
                  r={isSelected ? 35 : 25}
                  fill="currentColor"
                  className={cn(region.color, "opacity-20")}
                  animate={{
                    scale: isSelected ? [1, 1.2, 1] : [1, 1.1, 1],
                    opacity: isSelected ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: isSelected ? 2 : 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Core Node */}
              <motion.circle
                cx="100"
                cy={region.cy}
                r={isSelected ? 15 : 10}
                fill="currentColor"
                className={cn(
                  "transition-colors duration-300",
                  isSelected ? region.color : (viewMode === 'energetic' ? region.color : "text-white/40 hover:text-white/80")
                )}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />

              {/* Label (Visible on hover or if selected) */}
              {isSelected && (
                <motion.text
                  x="140"
                  y={region.cy + 5}
                  fill="currentColor"
                  className={cn("text-xs font-bold", region.color)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {viewMode === 'energetic' ? region.energeticName.split(' ')[0] : region.name.split(' ')[0]}
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
