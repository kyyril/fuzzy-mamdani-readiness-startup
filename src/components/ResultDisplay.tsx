import React from 'react';
import { FuzzyInferenceResult } from '../types/fuzzy';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  BarChart3,
  Brain,
  Target,
  Award
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface ResultDisplayProps {
  result: FuzzyInferenceResult;
  startupData: any;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, startupData }) => {
  // Prepare data for visualization
  const membershipData = result.fuzzyInputs.map(input => ({
    variable: input.variable.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    value: input.value,
    memberships: input.memberships.filter(m => m.degree > 0)
  }));

  const radarData = result.fuzzyInputs.map(input => ({
    variable: input.variable.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).slice(0, 10),
    value: input.value * 10,
    fullMark: 100
  }));

  const activatedRulesData = result.activatedRules
    .filter(rule => rule.activated && rule.fireStrength > 0)
    .sort((a, b) => b.fireStrength - a.fireStrength)
    .slice(0, 10)
    .map(rule => ({
      ruleId: rule.rule.id,
      fireStrength: (rule.fireStrength * 100).toFixed(1),
      consequence: rule.rule.consequence.set
    }));

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Sangat Direkomendasikan':
        return <Award className="h-6 w-6 text-green-600" />;
      case 'Direkomendasikan dengan Catatan':
        return <CheckCircle className="h-6 w-6 text-blue-600" />;
      case 'Pertimbangkan Lagi':
        return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      default:
        return <XCircle className="h-6 w-6 text-red-600" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 65) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 45) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 65) return 'bg-blue-500';
    if (score >= 45) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hasil Evaluasi Kesiapan Pendanaan</h2>
          <p className="text-gray-600">Sektor: {startupData.sektorIndustri}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Score Display */}
          <div className={`p-6 rounded-lg border-2 ${getScoreColor(result.crispOutput)}`}>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Skor Kesiapan</h3>
              <div className="text-4xl font-bold mb-2">
                {result.crispOutput.toFixed(1)}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor(result.crispOutput)}`}
                  style={{ width: `${result.crispOutput}%` }}
                ></div>
              </div>
              <p className="text-sm opacity-75">dari 100</p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="p-6 bg-gray-50 rounded-lg border">
            <div className="text-center">
              {getRecommendationIcon(result.recommendation)}
              <h3 className="text-lg font-semibold mt-4 mb-2">Rekomendasi</h3>
              <p className="text-xl font-bold text-gray-900 mb-2">
                {result.recommendation}
              </p>
              <p className="text-sm text-gray-600">
                {result.recommendation === 'Sangat Direkomendasikan' && 
                  'Startup Anda menunjukkan kesiapan yang sangat baik untuk mendapatkan pendanaan.'}
                {result.recommendation === 'Direkomendasikan dengan Catatan' && 
                  'Startup Anda cukup siap, namun ada beberapa area yang perlu diperbaiki.'}
                {result.recommendation === 'Pertimbangkan Lagi' && 
                  'Startup Anda memerlukan perbaikan signifikan sebelum mencari pendanaan.'}
                {result.recommendation === 'Tidak Direkomendasikan' && 
                  'Startup Anda belum siap untuk pendanaan. Fokus pada pengembangan fundamental.'}
              </p>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Profil Kesiapan Startup
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="variable" className="text-xs" />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={false}
                />
                <Radar
                  name="Nilai"
                  dataKey="value"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Membership Degrees */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Derajat Keanggotaan
          </h3>
          <div className="space-y-4">
            {membershipData.map((input, index) => (
              <div key={index} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{input.variable}</span>
                  <span className="text-sm text-gray-600">{input.value.toFixed(1)}</span>
                </div>
                <div className="space-y-1">
                  {input.memberships.map((membership, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">{membership.set}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${membership.degree * 100}%` }}
                          ></div>
                        </div>
                        <span className="w-12 text-right">
                          {(membership.degree * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activated Rules */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Aturan yang Aktif
          </h3>
          {activatedRulesData.length > 0 ? (
            <div className="space-y-3">
              {activatedRulesData.map((rule, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{rule.ruleId}</span>
                    <span className="text-sm font-medium text-blue-600">
                      {rule.fireStrength}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${rule.fireStrength}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">
                    Konsekuensi: {rule.consequence}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              Tidak ada aturan yang aktif dengan kekuatan yang signifikan
            </p>
          )}
        </div>
      </div>

      {/* Output Aggregation */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Agregasi Output</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {result.aggregatedOutputs.map((output, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900 mb-1">
                {(output.degree * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">
                {output.set}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${output.degree * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};