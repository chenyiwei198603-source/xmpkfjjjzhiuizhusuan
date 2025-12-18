
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Minus, X as MultiplyIcon } from 'lucide-react';

interface AccordionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionProps> = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[#f8f8f8] border border-gray-200 rounded-lg shadow-sm mb-3 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-amber-700">{icon}</div>}
          <span className="font-bold text-gray-800 text-lg">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-4 text-[#333333] text-[14px] leading-7 font-sans bg-[#f8f8f8]">
          {children}
        </div>
      )}
    </div>
  );
};

const multiplicationRows = [
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

const FormulaAccordion: React.FC = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto mb-6 px-1">
      
      {/* Addition */}
      <AccordionItem title="传统珠算加法口诀" icon={<Plus size={20} />}>
        <div className="space-y-4">
           <div>
             <h4 className="font-bold mb-1 text-amber-900">1. 直接加口诀</h4>
             <p>一上一，二上二，三上三，四上四，五上五，六上六，七上七，八上八，九上九</p>
           </div>
           <div>
             <h4 className="font-bold mb-1 text-amber-900">2. 满五加口诀</h4>
             <p>一下五去四，二下五去三，三下五去二，四下五去一</p>
           </div>
           <div>
             <h4 className="font-bold mb-1 text-amber-900">3. 进十加口诀</h4>
             <p>一去九进一，二去八进一，三去七进一，四去六进一，五去五进一，六去四进一，七去三进一，八去二进一，九去一进一</p>
           </div>
           <div>
             <h4 className="font-bold mb-1 text-amber-900">4. 破五进十加口诀</h4>
             <p>六上一去五进一，七上二去五进一，八上三去五进一，九上四去五进一</p>
           </div>
        </div>
      </AccordionItem>

      {/* Subtraction */}
      <AccordionItem title="传统珠算减法口诀" icon={<Minus size={20} />}>
        <div className="space-y-4">
           <div>
             <h4 className="font-bold mb-1 text-amber-900">1. 直接减口诀</h4>
             <p>一去一，二去二，三去三，四去四，五去五，六去六，七去七，八去八，九去九</p>
           </div>
           <div>
             <h4 className="font-bold mb-1 text-amber-900">2. 破五减口诀</h4>
             <p>一上四去五，二上三去五，三上二去五，四上一去五</p>
           </div>
           <div>
             <h4 className="font-bold mb-1 text-amber-900">3. 退十减口诀</h4>
             <p>一退一还九，二退一还八，三退一还七，四退一还六，五退一还五，六退一还四，七退一还三，八退一还二，九退一还一</p>
           </div>
           <div>
             <h4 className="font-bold mb-1 text-amber-900">4. 退十补五减口诀</h4>
             <p>六退一还五去一，七退一还五去二，八退一还五去三，九退一还五去四</p>
           </div>
        </div>
      </AccordionItem>

      {/* Multiplication */}
      <AccordionItem title="传统珠算九九乘法口诀" icon={<MultiplyIcon size={20} />}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[#e5e5e5] text-center text-sm min-w-[600px] bg-white">
            <thead>
              <tr className="bg-amber-50 font-bold text-gray-800">
                 <th className="border border-[#e5e5e5] p-2">被乘数 \ 乘数</th>
                 {['一','二','三','四','五','六','七','八','九'].map(n => (
                   <th key={n} className="border border-[#e5e5e5] p-2">{n}</th>
                 ))}
              </tr>
            </thead>
            <tbody>
              {multiplicationRows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-[#e5e5e5] p-2 font-bold bg-amber-50/50">{row.num}</td>
                  {row.cols.map((cell, cIdx) => (
                    <td key={cIdx} className="border border-[#e5e5e5] p-2 text-gray-600">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-gray-500 text-xs text-right">备注：除法不用口诀。</p>
        </div>
      </AccordionItem>
    </div>
  );
};

export default FormulaAccordion;
