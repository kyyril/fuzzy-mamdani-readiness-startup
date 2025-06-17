import React, { useState } from 'react';
import { StartupData, SEKTOR_INDUSTRI } from '../types/fuzzy';
import { Building2, Users, Lightbulb, TrendingUp, DollarSign, FileText, Target, Briefcase } from 'lucide-react';

interface StartupFormProps {
  onSubmit: (data: StartupData) => void;
  loading: boolean;
}

export const StartupForm: React.FC<StartupFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<StartupData>({
    pengalamanTim: 5,
    inovasiProduk: 5,
    potensiPasar: 5,
    traction: 5,
    strategiMonetisasi: 5,
    kesiapanLegal: 5,
    kompetisi: 5,
    sektorIndustri: 'B2B SaaS'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof StartupData, value: number | string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const inputFields = [
    {
      key: 'pengalamanTim' as keyof StartupData,
      label: 'Pengalaman Tim',
      description: 'Rata-rata pengalaman dan track record tim founding (0-10)',
      icon: Users,
      min: 0,
      max: 10
    },
    {
      key: 'inovasiProduk' as keyof StartupData,
      label: 'Inovasi Produk/Solusi',
      description: 'Tingkat kebaruan, diferensiasi, dan defensibilitas produk (0-10)',
      icon: Lightbulb,
      min: 0,
      max: 10
    },
    {
      key: 'potensiPasar' as keyof StartupData,
      label: 'Potensi Pasar',
      description: 'Total Addressable Market (TAM) dan peluang pertumbuhan (0-10)',
      icon: TrendingUp,
      min: 0,
      max: 10
    },
    {
      key: 'traction' as keyof StartupData,
      label: 'Traction & Pertumbuhan',
      description: 'Jumlah pengguna, revenue, dan tingkat pertumbuhan (0-10)',
      icon: Target,
      min: 0,
      max: 10
    },
    {
      key: 'strategiMonetisasi' as keyof StartupData,
      label: 'Strategi Monetisasi',
      description: 'Kejelasan model bisnis dan skalabilitas profit (0-10)',
      icon: DollarSign,
      min: 0,
      max: 10
    },
    {
      key: 'kesiapanLegal' as keyof StartupData,
      label: 'Kesiapan Legal & Operasional',
      description: 'Izin usaha, struktur hukum, dan kepatuhan regulasi (0-10)',
      icon: FileText,
      min: 0,
      max: 10
    },
    {
      key: 'kompetisi' as keyof StartupData,
      label: 'Tingkat Kompetisi',
      description: 'Intensitas persaingan di pasar target (0-10, tinggi = lebih kompetitif)',
      icon: Briefcase,
      min: 0,
      max: 10
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Evaluasi Kesiapan Startup</h2>
        <p className="text-gray-600">
          Masukkan informasi startup Anda untuk mendapatkan evaluasi kesiapan pendanaan menggunakan sistem pakar berbasis logika fuzzy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sektor Industri */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building2 className="inline h-4 w-4 mr-2" />
            Sektor Industri
          </label>
          <select
            value={formData.sektorIndustri}
            onChange={(e) => handleInputChange('sektorIndustri', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          >
            {SEKTOR_INDUSTRI.map(sektor => (
              <option key={sektor} value={sektor}>{sektor}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Pilih sektor industri yang paling sesuai dengan startup Anda
          </p>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map(field => {
            const Icon = field.icon;
            const value = formData[field.key] as number;
            
            return (
              <div key={field.key} className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Icon className="inline h-4 w-4 mr-2" />
                  {field.label}
                </label>
                
                <div className="space-y-2">
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step="0.1"
                    value={value}
                    onChange={(e) => handleInputChange(field.key, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    disabled={loading}
                  />
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{field.min}</span>
                    <span className="font-medium text-blue-600">{value.toFixed(1)}</span>
                    <span>{field.max}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  {field.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {loading ? 'Memproses Evaluasi...' : 'Evaluasi Kesiapan Pendanaan'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};