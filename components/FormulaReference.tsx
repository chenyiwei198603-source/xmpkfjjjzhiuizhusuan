
import React, { useState } from 'react';
import { X, BookOpen } from 'lucide-react';

interface FormulaReferenceProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormulaReference: React.FC<FormulaReferenceProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'ADD' | 'SUB' | 'MUL'>('ADD');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-amber-50/50">
          <div className="flex items-center gap-2 text-amber-900">
            <BookOpen size={24} />
            <h2 className="text-xl font-serif-sc font-bold">传统珠算运算口诀表</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button 
            onClick={() => setActiveTab('ADD')}
            className={`flex-1 py-3 text-sm md:text-base font-bold transition-colors ${activeTab === 'ADD' ? 'bg-white text-blue-800 border-t-2 border-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            一、加法口诀
          </button>
          <button 
            onClick={() => setActiveTab('SUB')}
            className={`flex-1 py-3 text-sm md:text-base font-bold transition-colors ${activeTab === 'SUB' ? 'bg-white text-red-800 border-t-2 border-red-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            二、减法口诀
          </button>
          <button 
            onClick={() => setActiveTab('MUL')}
            className={`flex-1 py-3 text-sm md:text-base font-bold transition-colors ${activeTab === 'MUL' ? 'bg-white text-amber-800 border-t-2 border-amber-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            三、乘法口诀
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white font-serif-sc leading-relaxed text-gray-800">
          {activeTab === 'ADD' && (
            <div className="space-y-6">
              <Section title="1. 直接加口诀" content={[
                "一上一，二上二，三上三，四上四，五上五，六上六，七上七，八上八，九上九"
              ]} />
              <Section title="2. 满五加口诀 (下五去X)" content={[
                "一下五去四", "二下五去三", "三下五去二", "四下五去一"
              ]} />
              <Section title="3. 进十加口诀 (去X进一)" content={[
                "一去九进一", "二去八进一", "三去七进一", "四去六进一", "五去五进一",
                "六去四进一", "七去三进一", "八去二进一", "九去一进一"
              ]} />
              <Section title="4. 破五进十加口诀 (X上Y去五进一)" content={[
                "六上一去五进一", "七上二去五进一", "八上三去五进一", "九上四去五进一"
              ]} />
            </div>
          )}

          {activeTab === 'SUB' && (
            <div className="space-y-6">
              <Section title="1. 直接减口诀" content={[
                "一去一，二去二，三去三，四去四，五去五，六去六，七去七，八去八，九去九"
              ]} />
              <Section title="2. 破五减口诀 (X上Y去五)" content={[
                "一上四去五", "二上三去五", "三上二去五", "四上一去五"
              ]} />
              <Section title="3. 退十减口诀 (X退一还Y)" content={[
                "一退一还九", "二退一还八", "三退一还七", "四退一还六", "五退一还五",
                "六退一还四", "七退一还三", "八退一还二", "九退一还一"
              ]} />
              <Section title="4. 退十补五减口诀 (X退一还五去Y)" content={[
                "六退一还五去一", "七退一还五去二", "八退一还五去三", "九退一还五去四"
              ]} />
            </div>
          )}

          {activeTab === 'MUL' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <h3 className="text-lg font-bold border-l-4 border-amber-500 pl-3">大九九乘法口诀</h3>
                 <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">横向：乘数 | 纵向：被乘数</span>
              </div>
              <div className="overflow-x-auto border border-amber-200 rounded-lg shadow-sm">
                <table className="w-full border-collapse text-sm min-w-[700px]">
                  <thead>
                    <tr className="bg-amber-100/50 text-amber-900">
                      <th className="border border-amber-200 p-2 text-left bg-amber-100 font-bold">被乘数 \ 乘数</th>
                      {['一','二','三','四','五','六','七','八','九'].map(n => (
                         <th key={n} className="border border-amber-200 p-2 font-bold">{n}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                     {multiplicationData.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-amber-50/20 hover:bg-blue-50'}>
                           <td className="border border-amber-100 p-2 font-bold bg-amber-50/50 text-amber-900">{row.num}</td>
                           {row.cols.map((cell, j) => (
                              <td key={j} className="border border-amber-100 p-2 text-center text-gray-600 hover:text-amber-800 hover:font-bold transition-all cursor-default">
                                {cell}
                              </td>
                           ))}
                        </tr>
                     ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 bg-amber-50 text-amber-800 rounded-lg text-sm italic border border-amber-100">
                备注：除法不用口诀。
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-bold text-sm"
            >
              关闭
            </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, content }: { title: string, content: string[] }) => (
  <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100 hover:border-amber-200 hover:bg-amber-50/20 transition-all duration-300">
    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {content.map((line, idx) => (
        <div key={idx} className="text-gray-700 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm text-sm md:text-base font-medium">
          {line}
        </div>
      ))}
    </div>
  </div>
);

const multiplicationData = [
  { num: '一', cols: ['一一01','二一02','三一03','四一04','五一05','六一06','七一07','八一08','九一09'] },
  { num: '二', cols: ['一二02','二二04','三二06','四二08','五二10','六二12','七二14','八二16','九二18'] },
  { num: '三', cols: ['一三03','二三06','三三09','四三12','五三15','六三18','七三21','八三24','九三27'] },
  { num: '四', cols: ['一四04','二四08','三四12','四四16','五四20','六四24','七四28','八四32','九四36'] },
  { num: '五', cols: ['一五05','二五10','三五15','四五20','五五25','六五30','七五35','八五40','九五45'] },
  { num: '六', cols: ['一六06','二六12','三六18','四六24','五六30','六六36','七六42','八六48','九六54'] },
  { num: '七', cols: ['一七07','二七14','三七21','四七28','五七35','六七42','七七49','八七56','九七63'] },
  { num: '八', cols: ['一八08','二八16','三八24','四八32','五八40','六八48','七八56','八八64','九八72'] },
  { num: '九', cols: ['一九09','二九18','三九27','四九36','五九45','六九54','七九63','八九72','九九81'] },
];

export default FormulaReference;
