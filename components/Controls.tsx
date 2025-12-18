
import React from 'react';
import { RotateCcw, Brain, Calculator, Trophy, Volume2, VolumeX, Eye, EyeOff, Play, Pause, ChevronRight, BookOpen } from 'lucide-react';
import { AppMode, AppSettings } from '../types';

interface ControlsProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  onReset: () => void;
  currentTotal: number;
  settings: AppSettings;
  toggleSetting: (key: keyof AppSettings) => void;
  generateProblem: () => void;
  onOpenReference: () => void;
}

const Controls: React.FC<ControlsProps> = ({ 
  mode, 
  setMode, 
  onReset, 
  currentTotal, 
  settings, 
  toggleSetting,
  generateProblem,
  onOpenReference
}) => {
  return (
    <div className="w-full max-w-5xl space-y-4">
      {/* Top Bar: Value & Basic Tools */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
        
        {/* Value Display */}
        <div className="flex items-center gap-4">
           <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">当前数值</span>
              <div className="text-4xl font-mono font-bold text-gray-900">
                {currentTotal.toLocaleString()}
              </div>
           </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto max-w-full">
          <button
            onClick={() => setMode(AppMode.Free)}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-md transition-all whitespace-nowrap ${
              mode === AppMode.Free ? 'bg-white text-amber-900 shadow-sm font-bold' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calculator size={18} />
            <span>自由练习</span>
          </button>
          <button
            onClick={() => setMode(AppMode.Training)}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-md transition-all whitespace-nowrap ${
              mode === AppMode.Training ? 'bg-white text-blue-900 shadow-sm font-bold' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Brain size={18} />
            <span>智能训练</span>
          </button>
        </div>

        {/* Settings & Tools */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenReference}
            className="p-2 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
            title="查看口诀表"
          >
            <BookOpen size={20} />
          </button>

          <div className="w-px h-6 bg-gray-200 mx-1"></div>

          <button 
            onClick={() => toggleSetting('voiceEnabled')}
            className={`p-2 rounded-full ${settings.voiceEnabled ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-400'}`}
            title="语音播报"
          >
            {settings.voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button 
            onClick={() => toggleSetting('mentalMode')}
            className={`p-2 rounded-full ${settings.mentalMode ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-400'}`}
            title="心算模式(隐藏珠子)"
          >
            {settings.mentalMode ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

          <button
            onClick={onReset}
            className="ml-2 flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-transform active:scale-95 shadow-md"
          >
            <RotateCcw size={18} />
            <span className="hidden md:inline">清盘</span>
          </button>
        </div>
      </div>

      {/* Training Controls (Conditional) */}
      {mode === AppMode.Training && (
        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl animate-in fade-in slide-in-from-top-2">
           <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-blue-800">题目控制:</span>
              <button onClick={generateProblem} className="flex items-center gap-1 px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded hover:bg-blue-50 text-sm font-medium shadow-sm">
                <Play size={14} /> 下一题
              </button>
           </div>
           <div className="text-xs text-blue-600 hidden md:block">
              提示: 点击"下一题"开始生成随机题目
           </div>
        </div>
      )}
    </div>
  );
};

export default Controls;
