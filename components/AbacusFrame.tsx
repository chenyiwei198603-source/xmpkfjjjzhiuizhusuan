import React from 'react';

interface AbacusFrameProps {
  children: React.ReactNode;
}

const AbacusFrame: React.FC<AbacusFrameProps> = ({ children }) => {
  return (
    <div className="p-3 md:p-6 xl:p-8 bg-wood-dark rounded-xl shadow-2xl border-y-8 border-x-4 border-amber-950 inline-block relative select-none">
      {/* Inner Padding/Frame */}
      <div className="bg-wood-light px-2 py-2 rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] border-2 border-amber-900/40">
        <div className="flex flex-row items-stretch justify-center px-4 md:px-8 xl:px-12 py-2">
          {children}
        </div>
      </div>
      
      {/* Decorative metal corners */}
      <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-t-4 border-l-4 border-amber-600/40 rounded-tl-sm"></div>
      <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-t-4 border-r-4 border-amber-600/40 rounded-tr-sm"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 border-b-4 border-l-4 border-amber-600/40 rounded-bl-sm"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-b-4 border-r-4 border-amber-600/40 rounded-br-sm"></div>
    </div>
  );
};

export default AbacusFrame;