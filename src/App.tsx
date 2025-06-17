import React, { useState } from 'react';
import { StartupForm } from './components/StartupForm';
import { ResultDisplay } from './components/ResultDisplay';
import { ValidationTest } from './components/ValidationTest';
import { LoadingSpinner } from './components/LoadingSpinner';
import { fuzzyInference } from './utils/fuzzyLogic';
import { StartupData, FuzzyInferenceResult } from './types/fuzzy';
import { Brain, TestTube, FileText } from 'lucide-react';

function App() {
  const [currentTab, setCurrentTab] = useState<'evaluate' | 'validate' | 'documentation'>('evaluate');
  const [result, setResult] = useState<FuzzyInferenceResult | null>(null);
  const [startupData, setStartupData] = useState<StartupData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEvaluate = async (data: StartupData) => {
    setLoading(true);
    setStartupData(data);
    
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const inferenceResult = fuzzyInference(data);
    setResult(inferenceResult);
    setLoading(false);
  };

  const tabs = [
    { id: 'evaluate', label: 'Evaluasi Startup', icon: Brain },
    { id: 'validate', label: 'Validasi Sistem', icon: TestTube },
    { id: 'documentation', label: 'Dokumentasi', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Sistem Pakar Evaluasi Kesiapan Startup untuk Pendanaan
              </h1>
              <p className="mt-2 text-gray-600">
                Berbasis Logika Fuzzy dengan Metode Mamdani
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    currentTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'evaluate' && (
          <div className="space-y-8">
            <StartupForm onSubmit={handleEvaluate} loading={loading} />
            
            {loading && (
              <div className="bg-white rounded-lg shadow-lg">
                <LoadingSpinner message="Memproses evaluasi dengan algoritma fuzzy Mamdani..." />
              </div>
            )}
            
            {result && startupData && !loading && (
              <ResultDisplay result={result} startupData={startupData} />
            )}
          </div>
        )}

        {currentTab === 'validate' && <ValidationTest />}

        {currentTab === 'documentation' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dokumentasi Sistem</h2>
            
            <div className="prose max-w-none">
              <h3>Tentang Sistem</h3>
              <p>
                Sistem Pakar Evaluasi Kesiapan Startup untuk Pendanaan adalah aplikasi berbasis web yang menggunakan 
                logika fuzzy dengan metode Mamdani untuk mengevaluasi seberapa siap sebuah startup untuk mendapatkan pendanaan.
              </p>
              
              <h3>Variabel Input</h3>
              <ul>
                <li><strong>Pengalaman Tim (0-10):</strong> Rata-rata pengalaman dan track record tim founding</li>
                <li><strong>Inovasi Produk (0-10):</strong> Tingkat kebaruan, diferensiasi, dan defensibilitas produk</li>
                <li><strong>Potensi Pasar (0-10):</strong> Total Addressable Market (TAM) dan peluang pertumbuhan</li>
                <li><strong>Traction & Pertumbuhan (0-10):</strong> Jumlah pengguna, revenue, dan tingkat pertumbuhan</li>
                <li><strong>Strategi Monetisasi (0-10):</strong> Kejelasan model bisnis dan skalabilitas profit</li>
                <li><strong>Kesiapan Legal (0-10):</strong> Izin usaha, struktur hukum, dan kepatuhan regulasi</li>
                <li><strong>Kompetisi (0-10):</strong> Intensitas persaingan di pasar target</li>
                <li><strong>Sektor Industri:</strong> Kategori industri startup (B2C, B2B SaaS, FinTech, dll.)</li>
              </ul>
              
              <h3>Variabel Output</h3>
              <ul>
                <li><strong>Kesiapan Pendanaan (0-100):</strong> Skor numerik kesiapan startup</li>
                <li><strong>Rekomendasi:</strong> Kategori rekomendasi berdasarkan skor</li>
              </ul>
              
              <h3>Metode Inferensi</h3>
              <p>
                Sistem menggunakan metode Mamdani dengan tahapan:
              </p>
              <ol>
                <li><strong>Fuzzifikasi:</strong> Mengubah input numerik menjadi derajat keanggotaan fuzzy</li>
                <li><strong>Evaluasi Aturan:</strong> Mengevaluasi aturan fuzzy menggunakan operator min/max</li>
                <li><strong>Agregasi:</strong> Menggabungkan hasil konsekuensi menggunakan operator max</li>
                <li><strong>Defuzzifikasi:</strong> Mengubah output fuzzy menjadi nilai numerik menggunakan metode centroid</li>
              </ol>
              
              <h3>Fitur Sistem</h3>
              <ul>
                <li>Interface pengguna yang intuitif dalam bahasa Indonesia</li>
                <li>Visualisasi derajat keanggotaan dan profil startup</li>
                <li>Analisis aturan yang aktif dengan fire strength</li>
                <li>Context awareness berdasarkan sektor industri</li>
                <li>Sistem validasi dengan 30 kasus uji</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-gray-500 text-sm">
            Sistem Pakar Evaluasi Kesiapan Startup untuk Pendanaan | Berbasis Logika Fuzzy
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;