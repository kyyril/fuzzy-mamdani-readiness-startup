# fuzzy-mamdani-readiness-to-start-a-company

Sistem pakar berbasis logika fuzzy untuk mengevaluasi kesiapan startup dalam mendapatkan pendanaan menggunakan metode inferensi Mamdani.

## Core Concepts

### System Flow

```
Input Data Startup → Fuzzifikasi → Evaluasi Aturan → Agregasi → Defuzzifikasi → Output & Rekomendasi
```

### Fuzzy Logic Process

1. **Fuzzifikasi**: Konversi input numerik ke derajat keanggotaan fuzzy
2. **Evaluasi Aturan**: Penerapan aturan IF-THEN dengan operator min/max
3. **Agregasi**: Penggabungan konsekuensi menggunakan operator max
4. **Defuzzifikasi**: Konversi output fuzzy ke nilai crisp menggunakan centroid

### Input Variables (0-10 scale)

- **Pengalaman Tim**: Track record dan expertise tim founding
- **Inovasi Produk**: Tingkat kebaruan dan diferensiasi solusi
- **Potensi Pasar**: Total Addressable Market dan peluang pertumbuhan
- **Traction**: Metrik pengguna, revenue, dan pertumbuhan
- **Strategi Monetisasi**: Kejelasan dan skalabilitas model bisnis
- **Kesiapan Legal**: Compliance dan struktur hukum
- **Kompetisi**: Intensitas persaingan pasar
- **Sektor Industri**: Konteks spesifik industri (B2C, B2B SaaS, FinTech, dll.)

### Output

- **Kesiapan Pendanaan**: Skor 0-100
- **Rekomendasi**: Kategorikal (Sangat Direkomendasikan, Direkomendasikan dengan Catatan, Pertimbangkan Lagi, Tidak Direkomendasikan)

### Key Features

- Context-aware rules berdasarkan sektor industri
- 15+ fuzzy rules dengan weight adjustment
- Validasi sistem menggunakan 30 test cases
- Real-time visualization dan analysis
- Interface bahasa Indonesia

## Technical Stack

- **Frontend**: React + TypeScript
- **Fuzzy Logic**: Custom implementation
- **Visualization**: Recharts
- **Styling**: Tailwind CSS

## Quick Start

```bash
npm install
npm run dev
```

## Validation

Sistem telah divalidasi dengan 31 kasus uji yang mencakup berbagai skenario startup dengan target akurasi >61.3%.
