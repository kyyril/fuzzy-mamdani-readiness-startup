import { 
  FuzzyVariable, 
  FuzzyRule, 
  FuzzificationResult, 
  RuleEvaluation, 
  AggregatedOutput, 
  FuzzyInferenceResult,
  StartupData 
} from '../types/fuzzy';

// Fungsi keanggotaan segitiga
export function triangularMF(x: number, a: number, b: number, c: number): number {
  if (x <= a || x >= c) return 0;
  if (x === b) return 1;
  if (x < b) return (x - a) / (b - a);
  return (c - x) / (c - b);
}

// Fungsi keanggotaan trapesium
export function trapezoidalMF(x: number, a: number, b: number, c: number, d: number): number {
  if (x <= a || x >= d) return 0;
  if (x >= b && x <= c) return 1;
  if (x < b) return (x - a) / (b - a);
  return (d - x) / (d - c);
}

// Definisi variabel fuzzy input
export const fuzzyVariables: FuzzyVariable[] = [
  {
    name: 'pengalamanTim',
    range: [0, 10],
    sets: [
      { name: 'SangatKurang', points: [[0, 1], [0, 1], [3, 0]] },
      { name: 'Kurang', points: [[1, 0], [3, 1], [5, 0]] },
      { name: 'Cukup', points: [[3, 0], [5, 1], [7, 0]] },
      { name: 'Baik', points: [[5, 0], [7, 1], [9, 0]] },
      { name: 'SangatBaik', points: [[7, 0], [10, 1], [10, 1]] }
    ]
  },
  {
    name: 'inovasiProduk',
    range: [0, 10],
    sets: [
      { name: 'Rendah', points: [[0, 1], [0, 1], [4, 0]] },
      { name: 'Sedang', points: [[2, 0], [5, 1], [8, 0]] },
      { name: 'Tinggi', points: [[6, 0], [8, 1], [10, 0]] },
      { name: 'Revolusioner', points: [[8, 0], [10, 1], [10, 1]] }
    ]
  },
  {
    name: 'potensiPasar',
    range: [0, 10],
    sets: [
      { name: 'Kecil', points: [[0, 1], [0, 1], [3, 0]] },
      { name: 'Menengah', points: [[2, 0], [4, 1], [6, 0]] },
      { name: 'Besar', points: [[5, 0], [7, 1], [9, 0]] },
      { name: 'SangatBesar', points: [[8, 0], [10, 1], [10, 1]] }
    ]
  },
  {
    name: 'traction',
    range: [0, 10],
    sets: [
      { name: 'BelumAda', points: [[0, 1], [0, 1], [2, 0]] },
      { name: 'Rendah', points: [[1, 0], [3, 1], [5, 0]] },
      { name: 'Cukup', points: [[4, 0], [6, 1], [8, 0]] },
      { name: 'Kuat', points: [[7, 0], [10, 1], [10, 1]] }
    ]
  },
  {
    name: 'strategiMonetisasi',
    range: [0, 10],
    sets: [
      { name: 'Buruk', points: [[0, 1], [0, 1], [3, 0]] },
      { name: 'Cukup', points: [[2, 0], [4, 1], [6, 0]] },
      { name: 'Baik', points: [[5, 0], [7, 1], [9, 0]] },
      { name: 'SangatBaik', points: [[8, 0], [10, 1], [10, 1]] }
    ]
  },
  {
    name: 'kesiapanLegal',
    range: [0, 10],
    sets: [
      { name: 'BelumSiap', points: [[0, 1], [0, 1], [3, 0]] },
      { name: 'KurangSiap', points: [[2, 0], [4, 1], [6, 0]] },
      { name: 'CukupSiap', points: [[5, 0], [7, 1], [9, 0]] },
      { name: 'SangatSiap', points: [[8, 0], [10, 1], [10, 1]] }
    ]
  },
  {
    name: 'kompetisi',
    range: [0, 10],
    sets: [
      { name: 'SangatRendah', points: [[0, 1], [0, 1], [3, 0]] },
      { name: 'Rendah', points: [[2, 0], [4, 1], [6, 0]] },
      { name: 'Sedang', points: [[5, 0], [7, 1], [9, 0]] },
      { name: 'Tinggi', points: [[8, 0], [10, 1], [10, 1]] }
    ]
  }
];

// Variabel output
export const outputVariable: FuzzyVariable = {
  name: 'kesiapanPendanaan',
  range: [0, 100],
  sets: [
    { name: 'SangatRendah', points: [[0, 1], [0, 1], [25, 0]] },
    { name: 'Rendah', points: [[15, 0], [30, 1], [45, 0]] },
    { name: 'Cukup', points: [[35, 0], [50, 1], [65, 0]] },
    { name: 'Baik', points: [[55, 0], [70, 1], [85, 0]] },
    { name: 'SangatBaik', points: [[75, 0], [100, 1], [100, 1]] }
  ]
};

// Aturan fuzzy
export const fuzzyRules: FuzzyRule[] = [
  // Aturan dasar untuk kasus ideal
  {
    id: 'R1',
    conditions: [
      { variable: 'pengalamanTim', set: 'SangatBaik', operator: 'AND' },
      { variable: 'inovasiProduk', set: 'Revolusioner', operator: 'AND' },
      { variable: 'potensiPasar', set: 'SangatBesar' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'SangatBaik' },
    weight: 1.0
  },
  {
    id: 'R2',
    conditions: [
      { variable: 'pengalamanTim', set: 'Baik', operator: 'AND' },
      { variable: 'inovasiProduk', set: 'Tinggi', operator: 'AND' },
      { variable: 'traction', set: 'Kuat' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'SangatBaik' },
    weight: 0.9
  },
  {
    id: 'R3',
    conditions: [
      { variable: 'pengalamanTim', set: 'Cukup', operator: 'AND' },
      { variable: 'inovasiProduk', set: 'Sedang', operator: 'AND' },
      { variable: 'potensiPasar', set: 'Besar' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'Baik' },
    weight: 0.8
  },
  {
    id: 'R4',
    conditions: [
      { variable: 'traction', set: 'Kuat', operator: 'AND' },
      { variable: 'strategiMonetisasi', set: 'SangatBaik', operator: 'AND' },
      { variable: 'kesiapanLegal', set: 'SangatSiap' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'SangatBaik' },
    weight: 0.95
  },
  {
    id: 'R5',
    conditions: [
      { variable: 'pengalamanTim', set: 'SangatKurang', operator: 'OR' },
      { variable: 'inovasiProduk', set: 'Rendah', operator: 'OR' },
      { variable: 'traction', set: 'BelumAda' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'SangatRendah' },
    weight: 1.0
  },
  // Aturan untuk kompetisi
  {
    id: 'R6',
    conditions: [
      { variable: 'kompetisi', set: 'Tinggi', operator: 'AND' },
      { variable: 'inovasiProduk', set: 'Rendah', operator: 'AND' },
      { variable: 'traction', set: 'Rendah' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'Rendah' },
    weight: 0.8
  },
  {
    id: 'R7',
    conditions: [
      { variable: 'kompetisi', set: 'SangatRendah', operator: 'AND' },
      { variable: 'potensiPasar', set: 'SangatBesar', operator: 'AND' },
      { variable: 'strategiMonetisasi', set: 'Baik' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'Baik' },
    weight: 0.7
  },
  // Aturan spesifik sektor
  {
    id: 'R8',
    conditions: [
      { variable: 'traction', set: 'Kuat', operator: 'AND' },
      { variable: 'strategiMonetisasi', set: 'SangatBaik' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'SangatBaik' },
    weight: 1.1,
    sectorSpecific: ['B2C', 'E-commerce']
  },
  {
    id: 'R9',
    conditions: [
      { variable: 'inovasiProduk', set: 'Tinggi', operator: 'AND' },
      { variable: 'kesiapanLegal', set: 'SangatSiap' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'Baik' },
    weight: 1.2,
    sectorSpecific: ['FinTech', 'Healthcare']
  },
  {
    id: 'R10',
    conditions: [
      { variable: 'pengalamanTim', set: 'Baik', operator: 'AND' },
      { variable: 'potensiPasar', set: 'Besar' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'Baik' },
    weight: 1.1,
    sectorSpecific: ['B2B SaaS', 'EdTech']
  },
  // Aturan tambahan untuk coverage yang lebih baik
  {
    id: 'R11',
    conditions: [
      { variable: 'pengalamanTim', set: 'Kurang', operator: 'AND' },
      { variable: 'inovasiProduk', set: 'Tinggi', operator: 'AND' },
      { variable: 'traction', set: 'Cukup' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'Cukup' },
    weight: 0.7
  },
  {
    id: 'R12',
    conditions: [
      { variable: 'strategiMonetisasi', set: 'Buruk', operator: 'OR' },
      { variable: 'kesiapanLegal', set: 'BelumSiap' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'Rendah' },
    weight: 0.9
  },
  {
    id: 'R13',
    conditions: [
      { variable: 'pengalamanTim', set: 'Cukup', operator: 'AND' },
      { variable: 'traction', set: 'Rendah', operator: 'AND' },
      { variable: 'potensiPasar', set: 'Besar' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'Cukup' },
    weight: 0.6
  },
  {
    id: 'R14',
    conditions: [
      { variable: 'inovasiProduk', set: 'Sedang', operator: 'AND' },
      { variable: 'strategiMonetisasi', set: 'Cukup', operator: 'AND' },
      { variable: 'kesiapanLegal', set: 'CukupSiap' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'Cukup' },
    weight: 0.8
  },
  {
    id: 'R15',
    conditions: [
      { variable: 'pengalamanTim', set: 'SangatBaik', operator: 'AND' },
      { variable: 'kompetisi', set: 'Tinggi' }
    ],
    consequence: { variable: 'kesiapanPendanaan', set: 'Baik' },
    weight: 0.8
  }
];

// Fungsi untuk menghitung derajat keanggotaan
export function calculateMembership(value: number, fuzzySet: any): number {
  const points = fuzzySet.points;
  
  if (points.length === 3) {
    // Triangular membership function
    const [a, b, c] = points.map((p: [number, number]) => p[0]);
    return triangularMF(value, a, b, c);
  } else if (points.length === 4) {
    // Trapezoidal membership function
    const [a, b, c, d] = points.map((p: [number, number]) => p[0]);
    return trapezoidalMF(value, a, b, c, d);
  }
  
  return 0;
}

// Fuzzifikasi
export function fuzzify(inputs: Record<string, number>): FuzzificationResult[] {
  const results: FuzzificationResult[] = [];
  
  fuzzyVariables.forEach(variable => {
    const value = inputs[variable.name];
    const memberships = variable.sets.map(set => ({
      set: set.name,
      degree: calculateMembership(value, set)
    }));
    
    results.push({
      variable: variable.name,
      value,
      memberships
    });
  });
  
  return results;
}

// Evaluasi aturan
export function evaluateRules(
  fuzzificationResults: FuzzificationResult[], 
  sektorIndustri: string
): RuleEvaluation[] {
  const results: RuleEvaluation[] = [];
  
  fuzzyRules.forEach(rule => {
    // Check if rule is sector-specific
    if (rule.sectorSpecific && !rule.sectorSpecific.includes(sektorIndustri)) {
      results.push({
        rule,
        fireStrength: 0,
        activated: false
      });
      return;
    }
    
    let fireStrength = 0;
    let hasValidCondition = false;
    
    // Process conditions based on operators
    for (let i = 0; i < rule.conditions.length; i++) {
      const condition = rule.conditions[i];
      const fuzzyResult = fuzzificationResults.find(fr => fr.variable === condition.variable);
      
      if (!fuzzyResult) continue;
      
      const membership = fuzzyResult.memberships.find(m => m.set === condition.set);
      if (!membership) continue;
      
      const currentDegree = membership.degree;
      
      if (i === 0) {
        fireStrength = currentDegree;
        hasValidCondition = true;
      } else {
        const operator = rule.conditions[i-1].operator || 'AND';
        if (operator === 'AND') {
          fireStrength = Math.min(fireStrength, currentDegree);
        } else if (operator === 'OR') {
          fireStrength = Math.max(fireStrength, currentDegree);
        }
      }
    }
    
    // Apply weight
    fireStrength *= rule.weight;
    
    results.push({
      rule,
      fireStrength: hasValidCondition ? fireStrength : 0,
      activated: hasValidCondition && fireStrength > 0
    });
  });
  
  return results;
}

// Agregasi
export function aggregateOutputs(ruleEvaluations: RuleEvaluation[]): AggregatedOutput[] {
  const aggregated: Record<string, number> = {};
  
  ruleEvaluations.forEach(evaluation => {
    if (!evaluation.activated) return;
    
    const key = `${evaluation.rule.consequence.variable}.${evaluation.rule.consequence.set}`;
    aggregated[key] = Math.max(aggregated[key] || 0, evaluation.fireStrength);
  });
  
  return Object.entries(aggregated).map(([key, degree]) => {
    const [variable, set] = key.split('.');
    return { variable, set, degree };
  });
}

// Defuzzifikasi menggunakan metode centroid
export function defuzzify(aggregatedOutputs: AggregatedOutput[]): number {
  if (aggregatedOutputs.length === 0) return 0;
  
  let numerator = 0;
  let denominator = 0;
  
  // Diskretisasi untuk perhitungan centroid
  const step = 1;
  for (let x = 0; x <= 100; x += step) {
    let maxMembership = 0;
    
    aggregatedOutputs.forEach(output => {
      const outputSet = outputVariable.sets.find(s => s.name === output.set);
      if (outputSet) {
        const membership = Math.min(
          calculateMembership(x, outputSet),
          output.degree
        );
        maxMembership = Math.max(maxMembership, membership);
      }
    });
    
    numerator += x * maxMembership;
    denominator += maxMembership;
  }
  
  return denominator > 0 ? numerator / denominator : 0;
}

// Rekomendasi berdasarkan nilai crisp
export function getRecommendation(crispValue: number): string {
  if (crispValue >= 80) return 'Sangat Direkomendasikan';
  if (crispValue >= 65) return 'Direkomendasikan dengan Catatan';
  if (crispValue >= 45) return 'Pertimbangkan Lagi';
  return 'Tidak Direkomendasikan';
}

// Fungsi utama inferensi fuzzy
export function fuzzyInference(data: StartupData): FuzzyInferenceResult {
  const inputs = {
    pengalamanTim: data.pengalamanTim,
    inovasiProduk: data.inovasiProduk,
    potensiPasar: data.potensiPasar,
    traction: data.traction,
    strategiMonetisasi: data.strategiMonetisasi,
    kesiapanLegal: data.kesiapanLegal,
    kompetisi: data.kompetisi
  };
  
  const fuzzyInputs = fuzzify(inputs);
  const activatedRules = evaluateRules(fuzzyInputs, data.sektorIndustri);
  const aggregatedOutputs = aggregateOutputs(activatedRules);
  const crispOutput = defuzzify(aggregatedOutputs);
  const recommendation = getRecommendation(crispOutput);
  
  return {
    fuzzyInputs,
    activatedRules,
    aggregatedOutputs,
    crispOutput,
    recommendation
  };
}