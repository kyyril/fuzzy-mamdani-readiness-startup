export interface FuzzySet {
  name: string;
  points: [number, number][];
}

export interface FuzzyVariable {
  name: string;
  range: [number, number];
  sets: FuzzySet[];
}

export interface FuzzyRule {
  id: string;
  conditions: Array<{
    variable: string;
    set: string;
    operator?: 'AND' | 'OR';
  }>;
  consequence: {
    variable: string;
    set: string;
  };
  weight: number;
  sectorSpecific?: string[];
}

export interface FuzzificationResult {
  variable: string;
  value: number;
  memberships: Array<{
    set: string;
    degree: number;
  }>;
}

export interface RuleEvaluation {
  rule: FuzzyRule;
  fireStrength: number;
  activated: boolean;
}

export interface AggregatedOutput {
  variable: string;
  set: string;
  degree: number;
}

export interface FuzzyInferenceResult {
  fuzzyInputs: FuzzificationResult[];
  activatedRules: RuleEvaluation[];
  aggregatedOutputs: AggregatedOutput[];
  crispOutput: number;
  recommendation: string;
}

export interface StartupData {
  pengalamanTim: number;
  inovasiProduk: number;
  potensiPasar: number;
  traction: number;
  strategiMonetisasi: number;
  kesiapanLegal: number;
  kompetisi: number;
  sektorIndustri: string;
}

export const SEKTOR_INDUSTRI = [
  'B2C',
  'B2B SaaS',
  'FinTech',
  'Healthcare',
  'E-commerce',
  'EdTech',
  'AgriTech',
  'PropTech'
];