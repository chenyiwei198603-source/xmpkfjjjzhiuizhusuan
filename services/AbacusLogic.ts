
import { RodState, Formula, ProblemType, Challenge } from '../types';

export const INITIAL_RODS_COUNT = 13;

export const createInitialRods = (): RodState[] => {
  return Array.from({ length: INITIAL_RODS_COUNT }, (_, i) => ({
    id: i,
    value: 0,
    activeHeavenCount: 0,
    activeEarthCount: 0,
  }));
};

/**
 * Calculates the total value of the abacus board
 * Supports 2 Heaven (5 each) and 5 Earth (1 each)
 */
export const calculateTotalValue = (rods: RodState[]): number => {
  let total = 0;
  for (let i = 0; i < rods.length; i++) {
    const power = rods.length - 1 - i;
    // Heaven beads (worth 5 each) + Earth beads (worth 1 each)
    const rodValue = (rods[i].activeHeavenCount * 5) + rods[i].activeEarthCount;
    total += rodValue * Math.pow(10, power);
  }
  return total;
};

const chineseNum = (n: number) => {
  const map = ['零','一','二','三','四','五','六','七','八','九'];
  return map[n] || n;
};

/**
 * Identifies the traditional formula (Koujue) in Chinese
 * Updated to match the strict traditional list provided
 */
export const identifyFormula = (prevVal: number, newVal: number): Formula | null => {
  const diff = newVal - prevVal;
  if (diff === 0) return null;

  const absDiff = Math.abs(diff);
  const chNum = chineseNum(absDiff);
  
  // Current values on the specific rod (0-15 theoretically, but usually 0-9 for logic)
  // We use modulo 10 to simulate single rod behavior for standard digits, 
  // but keeping actual value to detect carries.
  const prevRodVal = prevVal % 10;
  const prevEarth = prevRodVal % 5;
  const prevHeaven = prevRodVal >= 5;

  // --- ADDITION (加法) ---
  if (diff > 0) {
    // 1. 直接加 (Direct Add)
    // If adding < 5 and we have enough earth beads inactive
    // OR if adding >= 5 and heaven is inactive and we have enough earth beads
    if ((absDiff < 5 && prevEarth + absDiff < 5) || 
        (absDiff >= 5 && !prevHeaven && prevEarth + (absDiff - 5) < 5)) {
      return { action: `+${diff}`, koujue: `${chNum}上${chNum}`, description: '直接拨入' };
    }

    // 2. 满五加 (Full 5 Add / Complements of 5)
    // Formula: +a = +5 - (5-a) => "X下五去Y"
    // Condition: prev < 5, new >= 5, no carry to next rod (diff < 5 implies this usually)
    if (prevRodVal < 5 && absDiff < 5 && prevRodVal + absDiff >= 5) {
      const removal = 5 - diff;
      return { action: `+${diff}`, koujue: `${chNum}下五去${chineseNum(removal)}`, description: `加${absDiff}不够，下5减${removal}` };
    }

    // 3. 进十加 (Carry 10 Add) & 4. 破五进十加 (Break 5 Carry 10)
    // If we are crossing 10 boundary
    if (newVal >= 10 && prevVal < 10) { // Simple check for single rod logic context
       const complement = 10 - diff;
       
       // 4. 破五进十加 (Break 5 Carry 10)
       // Occurs when adding 6,7,8,9 requires subtracting complement, but complement requires breaking 5.
       // Condition: We have 5 active (prev >= 5), and removing complement involves moving 5 up.
       // i.e., prevEarth < complement.
       // Example: 6+6. Prev=6 (5+1). Comp=4. Earth=1. 1<4. Need to remove 5 add 1.
       if (diff >= 6 && prevHeaven && prevEarth < complement) {
           if (diff === 6) return { action: '+6', koujue: '六上一去五进一', description: '加6，不够减4，上1去5进1' };
           if (diff === 7) return { action: '+7', koujue: '七上二去五进一', description: '加7，不够减3，上2去5进1' };
           if (diff === 8) return { action: '+8', koujue: '八上三去五进一', description: '加8，不够减2，上3去5进1' };
           if (diff === 9) return { action: '+9', koujue: '九上四去五进一', description: '加9，不够减1，上4去5进1' };
       }
       
       // 3. 进十加 (Standard Carry 10)
       return { action: `+${diff}`, koujue: `${chNum}去${chineseNum(complement)}进一`, description: `加${absDiff}不够，去${complement}进1` };
    }
  }

  // --- SUBTRACTION (减法) ---
  if (diff < 0) {
    // 1. 直接减 (Direct Sub)
    // If sub < 5 and we have enough earth beads
    // OR sub >= 5 and we have heaven active and enough earth beads
    if ((absDiff < 5 && prevEarth >= absDiff) ||
        (absDiff >= 5 && prevHeaven && prevEarth >= (absDiff - 5))) {
       return { action: `${diff}`, koujue: `${chNum}去${chNum}`, description: '直接拨去' };
    }

    // 2. 破五减 (Break 5 Sub)
    // Formula: -a = -5 + (5-a) => "X上Y去五"
    // Condition: prev >= 5, new < 5 (but same decade), and we couldn't direct sub (handled above)
    // Usually means we are subtracting < 5 but earth beads aren't enough, so we borrow from 5.
    if (prevHeaven && absDiff < 5 && prevEarth < absDiff) {
       const addBack = 5 - absDiff;
       return { action: `${diff}`, koujue: `${chNum}上${chineseNum(addBack)}去五`, description: `减${absDiff}不够，上${addBack}去5` };
    }

    // 3. 退十减 (Borrow 10 Sub) & 4. 退十补五减 (Borrow 10 Return 5)
    // Borrowing from next rod
    if (newVal < 0) {
       const complement = 10 - absDiff; // The amount we need to ADD back
       
       // 4. 退十补五减 (Borrow 10 Return 5)
       // We need to add 'complement'. If we can't add 'complement' directly to earth, we use 5.
       // Condition: prevEarth + complement >= 5 AND prevHeaven is false (5 is available to be added/returned)
       if (!prevHeaven && (prevEarth + complement) >= 5) {
           if (absDiff === 6) return { action: '-6', koujue: '六退一还五去一', description: '退1，还5去1' }; 
           if (absDiff === 7) return { action: '-7', koujue: '七退一还五去二', description: '退1，还5去2' };
           if (absDiff === 8) return { action: '-8', koujue: '八退一还五去三', description: '退1，还5去3' };
           if (absDiff === 9) return { action: '-9', koujue: '九退一还五去四', description: '退1，还5去4' };
       }

       // 3. 退十减 (Standard Borrow 10)
       return { action: `${diff}`, koujue: `${chNum}退一还${chineseNum(complement)}`, description: `减${absDiff}不够，退1还${complement}` };
    }
  }

  return { 
    action: diff > 0 ? `+${diff}` : `${diff}`, 
    koujue: '混合运算', 
    description: '复杂拨珠操作' 
  };
};

// --- Positioning Logic (Ding Wei) ---

const getPositioningRule = (type: ProblemType, a: number, b: number): { desc: string, targetDigits: number } => {
  const m = a.toString().length;
  const n = b.toString().length;
  const firstA = parseInt(a.toString()[0]);
  const firstB = parseInt(b.toString()[0]);

  if (type === 'MUL') {
    const headProduct = firstA * firstB;
    const isCarry = headProduct >= 10;
    
    if (isCarry) {
      return { 
        targetDigits: m + n,
        desc: `被乘数位m=${m}, 乘数位n=${n}。首积进位(${firstA}×${firstB}=${headProduct}≥10), 积位=m+n=${m+n}。`
      };
    } else {
       return { 
        targetDigits: m + n - 1,
        desc: `被乘数位m=${m}, 乘数位n=${n}。首积不进位(${firstA}×${firstB}=${headProduct}<10), 积位=m+n-1=${m+n-1}。`
      };
    }
  } 
  
  if (type === 'DIV') {
    let isGreaterOrEqual = false;
    
    // Compare first digits as per traditional rule approximation
    if (firstA > firstB) isGreaterOrEqual = true;
    else if (firstA === firstB) {
       // Rough check for second digit if exists, or assume equal enough for rule
       const secondA = parseInt(a.toString()[1] || '0');
       const secondB = parseInt(b.toString()[1] || '0');
       if (secondA >= secondB) isGreaterOrEqual = true;
    }
    
    const compareDesc = isGreaterOrEqual ? `${firstA}≥${firstB}` : `${firstA}<${firstB}`;
    
    if (!isGreaterOrEqual) {
      return {
        targetDigits: m - n,
        desc: `被除数m=${m}, 除数n=${n}。首位${compareDesc}, 商位=m-n=${m-n}。`
      };
    } else {
      return {
        targetDigits: m - n + 1,
        desc: `被除数m=${m}, 除数n=${n}。首位${compareDesc}, 商位=m-n+1=${m-n+1}。`
      };
    }
  }

  return { desc: '', targetDigits: 0 };
};


export const generateChallenge = (type: ProblemType = 'ADD'): Challenge => {
  let a = 0, b = 0;
  let ruleInfo = { desc: '', targetDigits: 0 };

  switch (type) {
    case 'ADD':
      a = Math.floor(Math.random() * 90) + 10;
      b = Math.floor(Math.random() * 90) + 10;
      return { id: Date.now().toString(), type, question: `${a} + ${b}`, steps: [a, b], targetValue: a + b, currentStepIndex: 0 };
    
    case 'SUB':
      a = Math.floor(Math.random() * 90) + 10;
      b = Math.floor(Math.random() * a); 
      return { id: Date.now().toString(), type, question: `${a} - ${b}`, steps: [a, -b], targetValue: a - b, currentStepIndex: 0 };

    case 'MUL':
      a = Math.floor(Math.random() * 90) + 10; // 2 digit
      b = Math.floor(Math.random() * 90) + 10; // 2 digit
      ruleInfo = getPositioningRule('MUL', a, b);
      return { 
        id: Date.now().toString(), 
        type, 
        question: `${a} × ${b}`, 
        steps: [], 
        targetValue: a * b, 
        currentStepIndex: 0,
        ruleDescription: ruleInfo.desc 
      };
    
    case 'DIV':
      b = Math.floor(Math.random() * 20) + 2; 
      const res = Math.floor(Math.random() * 50) + 1; 
      a = b * res; 
      ruleInfo = getPositioningRule('DIV', a, b);
      return { 
        id: Date.now().toString(), 
        type, 
        question: `${a} ÷ ${b}`, 
        steps: [], 
        targetValue: res, 
        currentStepIndex: 0,
        ruleDescription: ruleInfo.desc 
      };
      
    default:
      a = Math.floor(Math.random() * 50);
      b = Math.floor(Math.random() * 20);
      return { id: Date.now().toString(), type: 'ADD', question: `${a} + ${b}`, steps: [a, b], targetValue: a + b, currentStepIndex: 0 };
  }
};
