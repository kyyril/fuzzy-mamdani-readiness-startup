import { StartupData } from '../types/fuzzy';

export const validationData: Array<{
  data: StartupData;
  expectedRange: [number, number];
  description: string;
}> = [
  // Kasus ideal - startup sangat siap
  {
    data: {
      pengalamanTim: 9,
      inovasiProduk: 9,
      potensiPasar: 9,
      traction: 9,
      strategiMonetisasi: 9,
      kesiapanLegal: 9,
      kompetisi: 3,
      sektorIndustri: 'B2B SaaS'
    },
    expectedRange: [85, 100],
    description: 'Startup ideal dengan semua aspek sangat baik'
  },
  // Kasus buruk - startup belum siap
  {
    data: {
      pengalamanTim: 1,
      inovasiProduk: 1,
      potensiPasar: 2,
      traction: 0,
      strategiMonetisasi: 1,
      kesiapanLegal: 1,
      kompetisi: 9,
      sektorIndustri: 'B2C'
    },
    expectedRange: [0, 25],
    description: 'Startup dengan banyak kelemahan fundamental'
  },
  // Kasus menengah - startup cukup
  {
    data: {
      pengalamanTim: 5,
      inovasiProduk: 6,
      potensiPasar: 5,
      traction: 4,
      strategiMonetisasi: 5,
      kesiapanLegal: 6,
      kompetisi: 6,
      sektorIndustri: 'E-commerce'
    },
    expectedRange: [40, 70],
    description: 'Startup dengan performa rata-rata'
  },
  // FinTech dengan inovasi tinggi
  {
    data: {
      pengalamanTim: 7,
      inovasiProduk: 8,
      potensiPasar: 7,
      traction: 6,
      strategiMonetisasi: 7,
      kesiapanLegal: 8,
      kompetisi: 7,
      sektorIndustri: 'FinTech'
    },
    expectedRange: [65, 85],
    description: 'FinTech dengan inovasi dan kesiapan legal yang baik'
  },
  // Healthcare dengan regulasi ketat
  {
    data: {
      pengalamanTim: 8,
      inovasiProduk: 7,
      potensiPasar: 8,
      traction: 5,
      strategiMonetisasi: 6,
      kesiapanLegal: 9,
      kompetisi: 5,
      sektorIndustri: 'Healthcare'
    },
    expectedRange: [60, 80],
    description: 'Healthcare dengan fokus pada regulasi dan inovasi'
  },
  // B2C dengan traksi kuat
  {
    data: {
      pengalamanTim: 6,
      inovasiProduk: 5,
      potensiPasar: 8,
      traction: 8,
      strategiMonetisasi: 8,
      kesiapanLegal: 6,
      kompetisi: 8,
      sektorIndustri: 'B2C'
    },
    expectedRange: [65, 85],
    description: 'B2C dengan traksi dan monetisasi yang kuat'
  },
  // EdTech dengan tim berpengalaman
  {
    data: {
      pengalamanTim: 8,
      inovasiProduk: 6,
      potensiPasar: 7,
      traction: 4,
      strategiMonetisasi: 5,
      kesiapanLegal: 6,
      kompetisi: 6,
      sektorIndustri: 'EdTech'
    },
    expectedRange: [55, 75],
    description: 'EdTech dengan tim berpengalaman tapi traksi terbatas'
  },
  // AgriTech emerging
  {
    data: {
      pengalamanTim: 5,
      inovasiProduk: 7,
      potensiPasar: 6,
      traction: 3,
      strategiMonetisasi: 4,
      kesiapanLegal: 5,
      kompetisi: 4,
      sektorIndustri: 'AgriTech'
    },
    expectedRange: [35, 60],
    description: 'AgriTech dengan inovasi baik tapi eksekusi terbatas'
  },
  // PropTech dengan pasar potensial
  {
    data: {
      pengalamanTim: 6,
      inovasiProduk: 6,
      potensiPasar: 8,
      traction: 5,
      strategiMonetisasi: 6,
      kesiapanLegal: 7,
      kompetisi: 7,
      sektorIndustri: 'PropTech'
    },
    expectedRange: [55, 75],
    description: 'PropTech dengan potensi pasar besar'
  },
  // Startup dengan inovasi revolusioner tapi tim kurang
  {
    data: {
      pengalamanTim: 3,
      inovasiProduk: 9,
      potensiPasar: 8,
      traction: 2,
      strategiMonetisasi: 4,
      kesiapanLegal: 3,
      kompetisi: 5,
      sektorIndustri: 'B2B SaaS'
    },
    expectedRange: [30, 55],
    description: 'Inovasi tinggi tapi eksekusi dan tim lemah'
  },
  // Tim berpengalaman dengan produk biasa
  {
    data: {
      pengalamanTim: 8,
      inovasiProduk: 4,
      potensiPasar: 5,
      traction: 6,
      strategiMonetisasi: 7,
      kesiapanLegal: 8,
      kompetisi: 6,
      sektorIndustri: 'E-commerce'
    },
    expectedRange: [50, 70],
    description: 'Tim kuat tapi diferensiasi produk terbatas'
  },
  // Kompetisi sangat rendah, monopoli potensial
  {
    data: {
      pengalamanTim: 6,
      inovasiProduk: 7,
      potensiPasar: 9,
      traction: 5,
      strategiMonetisasi: 6,
      kesiapanLegal: 6,
      kompetisi: 1,
      sektorIndustri: 'AgriTech'
    },
    expectedRange: [60, 80],
    description: 'Peluang monopoli dengan pasar besar'
  },
  // Startup dengan legal issues
  {
    data: {
      pengalamanTim: 7,
      inovasiProduk: 7,
      potensiPasar: 7,
      traction: 6,
      strategiMonetisasi: 6,
      kesiapanLegal: 2,
      kompetisi: 5,
      sektorIndustri: 'FinTech'
    },
    expectedRange: [25, 50],
    description: 'Potensi baik tapi masalah regulasi serius'
  },
  // Monetisasi tidak jelas
  {
    data: {
      pengalamanTim: 6,
      inovasiProduk: 8,
      potensiPasar: 7,
      traction: 7,
      strategiMonetisasi: 2,
      kesiapanLegal: 6,
      kompetisi: 6,
      sektorIndustri: 'B2C'
    },
    expectedRange: [30, 55],
    description: 'Produk bagus tapi model bisnis tidak viabel'
  },
  // Pasar kecil tapi dominasi kuat
  {
    data: {
      pengalamanTim: 7,
      inovasiProduk: 6,
      potensiPasar: 3,
      traction: 8,
      strategiMonetisasi: 8,
      kesiapanLegal: 7,
      kesiapanLegal: 7,
      kompetisi: 3,
      sektorIndustri: 'B2B SaaS'
    },
    expectedRange: [55, 75],
    description: 'Niche market dengan eksekusi sangat baik'
  },
  // Startup early stage dengan tim solid
  {
    data: {
      pengalamanTim: 8,
      inovasiProduk: 6,
      potensiPasar: 6,
      traction: 1,
      strategiMonetisasi: 5,
      kesiapanLegal: 7,
      kompetisi: 6,
      sektorIndustri: 'EdTech'
    },
    expectedRange: [40, 65],
    description: 'Tim kuat tapi masih sangat early stage'
  },
  // Kompetisi sangat ketat
  {
    data: {
      pengalamanTim: 6,
      inovasiProduk: 5,
      potensiPasar: 8,
      traction: 6,
      strategiMonetisasi: 6,
      kesiapanLegal: 6,
      kompetisi: 9,
      sektorIndustri: 'E-commerce'
    },
    expectedRange: [35, 60],
    description: 'Pasar besar tapi kompetisi sangat intens'
  },
  // Balanced startup
  {
    data: {
      pengalamanTim: 6,
      inovasiProduk: 6,
      potensiPasar: 6,
      traction: 6,
      strategiMonetisasi: 6,
      kesiapanLegal: 6,
      kompetisi: 6,
      sektorIndustri: 'PropTech'
    },
    expectedRange: [50, 70],
    description: 'Startup dengan performa seimbang di semua aspek'
  },
  // High potential low execution
  {
    data: {
      pengalamanTim: 4,
      inovasiProduk: 8,
      potensiPasar: 9,
      traction: 2,
      strategiMonetisasi: 3,
      kesiapanLegal: 4,
      kompetisi: 4,
      sektorIndustri: 'Healthcare'
    },
    expectedRange: [25, 50],
    description: 'Potensi besar tapi eksekusi lemah'
  },
  // Good execution average innovation
  {
    data: {
      pengalamanTim: 7,
      inovasiProduk: 5,
      potensiPasar: 6,
      traction: 7,
      strategiMonetisasi: 7,
      kesiapanLegal: 8,
      kompetisi: 6,
      sektorIndustri: 'B2B SaaS'
    },
    expectedRange: [60, 80],
    description: 'Eksekusi solid dengan inovasi moderate'
  },
  // Late stage with strong metrics
  {
    data: {
      pengalamanTim: 8,
      inovasiProduk: 6,
      potensiPasar: 7,
      traction: 9,
      strategiMonetisasi: 8,
      kesiapanLegal: 8,
      kompetisi: 7,
      sektorIndustri: 'FinTech'
    },
    expectedRange: [75, 95],
    description: 'Late stage dengan metrik kuat'
  },
  // Innovation without market fit
  {
    data: {
      pengalamanTim: 5,
      inovasiProduk: 9,
      potensiPasar: 4,
      traction: 1,
      strategiMonetisasi: 3,
      kesiapanLegal: 5,
      kompetisi: 3,
      sektorIndustri: 'AgriTech'
    },
    expectedRange: [25, 50],
    description: 'Inovasi tinggi tanpa market fit'
  },
  // Market leader potential
  {
    data: {
      pengalamanTim: 8,
      inovasiProduk: 7,
      potensiPasar: 8,
      traction: 8,
      strategiMonetisasi: 8,
      kesiapanLegal: 7,
      kompetisi: 5,
      sektorIndustri: 'B2C'
    },
    expectedRange: [75, 95],
    description: 'Potensi market leader'
  },
  // Regulatory compliance critical
  {
    data: {
      pengalamanTim: 6,
      inovasiProduk: 6,
      potensiPasar: 7,
      traction: 5,
      strategiMonetisasi: 6,
      kesiapanLegal: 9,
      kompetisi: 6,
      sektorIndustri: 'Healthcare'
    },
    expectedRange: [60, 80],
    description: 'Healthcare dengan compliance sempurna'
  },
  // Scaling challenges
  {
    data: {
      pengalamanTim: 5,
      inovasiProduk: 6,
      potensiPasar: 7,
      traction: 6,
      strategiMonetisasi: 4,
      kesiapanLegal: 6,
      kompetisi: 7,
      sektorIndustri: 'E-commerce'
    },
    expectedRange: [40, 65],
    description: 'Traksi ada tapi tantangan scaling'
  },
  // Technical founder advantage
  {
    data: {
      pengalamanTim: 9,
      inovasiProduk: 8,
      potensiPasar: 6,
      traction: 4,
      strategiMonetisasi: 5,
      kesiapanLegal: 6,
      kompetisi: 5,
      sektorIndustri: 'B2B SaaS'
    },
    expectedRange: [55, 80],
    description: 'Technical founder dengan produk unggul'
  },
  // Network effect potential
  {
    data: {
      pengalamanTim: 6,
      inovasiProduk: 7,
      potensiPasar: 8,
      traction: 5,
      strategiMonetisasi: 7,
      kesiapanLegal: 6,
      kompetisi: 8,
      sektorIndustri: 'B2C'
    },
    expectedRange: [55, 75],
    description: 'Platform dengan network effect potential'
  },
  // Resource intensive model
  {
    data: {
      pengalamanTim: 7,
      inovasiProduk: 5,
      potensiPasar: 6,
      traction: 6,
      strategiMonetisasi: 5,
      kesiapanLegal: 7,
      kompetisi: 6,
      sektorIndustri: 'PropTech'
    },
    expectedRange: [50, 70],
    description: 'Model bisnis yang resource intensive'
  },
  // Quick pivot potential
  {
    data: {
      pengalamanTim: 8,
      inovasiProduk: 6,
      potensiPasar: 5,
      traction: 3,
      strategiMonetisasi: 4,
      kesiapanLegal: 6,
      kompetisi: 5,
      sektorIndustri: 'EdTech'
    },
    expectedRange: [45, 70],
    description: 'Tim adaptif dengan kemampuan pivot'
  },
  // Market timing critical
  {
    data: {
      pengalamanTim: 6,
      inovasiProduk: 8,
      potensiPasar: 9,
      traction: 3,
      strategiMonetisasi: 5,
      kesiapanLegal: 5,
      kompetisi: 4,
      sektorIndustri: 'AgriTech'
    },
    expectedRange: [40, 70],
    description: 'Timing pasar kritis untuk sukses'
  },
  // Strong partnership potential
  {
    data: {
      pengalamanTim: 7,
      inovasiProduk: 6,
      potensiPasar: 7,
      traction: 6,
      strategiMonetisasi: 7,
      kesiapanLegal: 8,
      kompetisi: 6,
      sektorIndustri: 'FinTech'
    },
    expectedRange: [65, 85],
    description: 'Potensi partnership strategis kuat'
  }
];