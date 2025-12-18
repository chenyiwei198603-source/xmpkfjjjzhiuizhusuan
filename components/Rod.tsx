import React from 'react';
import { RodState } from '../types';
import Bead from './Bead';

interface RodProps {
  state: RodState;
  onChange: (id: number, newState: Partial<RodState>) => void;
  isActiveRod: boolean;
  isMentalMode: boolean;
}

const Rod: React.FC<RodProps> = ({ state, onChange, isActiveRod, isMentalMode }) => {
  
  const handleHeavenClick = (index: number) => {
    const currentCount = state.activeHeavenCount;
    let newCount = currentCount;

    if (currentCount === 0) {
      if (index === 0) newCount = 2; 
      if (index === 1) newCount = 1; 
    } else if (currentCount === 1) {
      if (index === 1) newCount = 0; 
      if (index === 0) newCount = 2; 
    } else if (currentCount === 2) {
      if (index === 0) newCount = 1; 
      if (index === 1) newCount = 0; 
    }

    onChange(state.id, {
      activeHeavenCount: newCount,
      value: (newCount * 5) + state.activeEarthCount 
    });
  };

  const handleEarthClick = (clickedIndex: number) => {
    const currentActiveCount = state.activeEarthCount;
    const clickedBeadIsActive = clickedIndex < currentActiveCount;
    
    let newActiveCount = currentActiveCount;

    if (clickedBeadIsActive) {
      newActiveCount = clickedIndex; 
    } else {
      newActiveCount = clickedIndex + 1;
    }

    onChange(state.id, {
      activeEarthCount: newActiveCount,
      value: (state.activeHeavenCount * 5) + newActiveCount
    });
  };

  return (
    <div className={`
      relative flex flex-col items-center mx-1 md:mx-2 xl:mx-3 select-none
      ${isActiveRod ? 'bg-amber-100/30 rounded-lg' : ''}
      transition-colors duration-200
    `}>
      {/* Value Display Removed - Moved to App.tsx external display */}

      {/* Mental Mode Mask */}
      {isMentalMode && (
        <div className="absolute inset-0 z-50 backdrop-blur-md bg-wood-light/10 rounded-lg flex items-center justify-center">
           <div className="w-2 h-full bg-gray-400/20 rounded-full"></div>
        </div>
      )}

      {/* The Rod */}
      <div className="absolute inset-y-0 w-1 md:w-2 xl:w-2.5 bg-gray-300 z-0 rounded-full"></div>

      {/* Heaven Section (2 Beads) */}
      <div className="relative pt-2 pb-1 z-10 h-24 md:h-32 xl:h-44 flex flex-col justify-start items-center space-y-1 md:space-y-2">
        {[0, 1].map((idx) => {
          let isActive = false;
          if (state.activeHeavenCount === 2) isActive = true;
          else if (state.activeHeavenCount === 1 && idx === 1) isActive = true;

          return (
            <Bead 
              key={`h-${idx}`}
              type="HEAVEN" 
              isActive={isActive} 
              onClick={() => handleHeavenClick(idx)} 
            />
          );
        })}
      </div>

      {/* The Beam */}
      <div className="w-16 md:w-24 xl:w-32 h-4 md:h-6 xl:h-8 bg-wood-dark z-20 rounded shadow-md flex items-center justify-center border-y-2 border-amber-950/50">
         {(state.id === 3 || state.id === 6 || state.id === 9) && (
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 xl:w-3 xl:h-3 bg-white rounded-full opacity-60 shadow-sm"></div>
         )}
      </div>

      {/* Earth Section (5 Beads) */}
      <div className="relative pt-1 pb-2 z-10 h-48 md:h-64 xl:h-96 flex flex-col justify-end items-center space-y-1 md:space-y-2">
        {[0, 1, 2, 3, 4].map((idx) => (
          <Bead 
            key={`e-${idx}`}
            type="EARTH"
            isActive={idx < state.activeEarthCount}
            onClick={() => handleEarthClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Rod;