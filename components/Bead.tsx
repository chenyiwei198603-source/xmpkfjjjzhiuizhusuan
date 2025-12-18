import React from 'react';

interface BeadProps {
  isActive: boolean;
  type: 'HEAVEN' | 'EARTH';
  onClick: () => void;
}

const Bead: React.FC<BeadProps> = ({ isActive, type, onClick }) => {
  // Heaven Bead: Active = Down (Towards Beam).
  // Earth Bead: Active = Up (Towards Beam).
  
  const getTranslateClass = () => {
    if (type === 'HEAVEN') {
      // Heaven bead moves DOWN when active.
      // Increased translation to cross the gap from top of frame to beam.
      return isActive ? 'translate-y-10 md:translate-y-14 xl:translate-y-20' : 'translate-y-0';
    } else {
      // Earth bead moves UP when active.
      // Increased translation to cross the gap from bottom of frame to beam.
      return isActive ? '-translate-y-10 md:-translate-y-14 xl:-translate-y-20' : 'translate-y-0';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`
        relative 
        w-12 h-6 
        md:w-16 md:h-8 
        xl:w-24 xl:h-12 
        cursor-pointer 
        transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
        ${getTranslateClass()} 
        z-10 hover:brightness-110 active:scale-95 touch-manipulation
      `}
    >
      {/* Bead Shape - Diamond-ish/Oval for traditional look */}
      <div className={`
        absolute inset-0 rounded-[40%] shadow-lg border-b border-amber-950
        ${type === 'HEAVEN' ? 'bg-gradient-to-b from-amber-800 to-amber-950' : 'bg-gradient-to-t from-amber-800 to-amber-950'}
      `}>
         {/* Highlight */}
         <div className="absolute top-1 left-2 w-1/2 h-1 bg-white opacity-20 rounded-full blur-[1px]"></div>
      </div>
      {/* Center hole illusion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-900 rounded-full opacity-50"></div>
    </div>
  );
};

export default Bead;