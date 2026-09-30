import type { ManagementModel } from '@/types/content';

/** MANAGEMENT MODELS — shown on /partner and teased on the home page. */
export const managementModels: ManagementModel[] = [
  {
    id: 'fixed-net-income',
    number: '01',
    name: { en: 'Fixed Net Income', id: 'Fixed Net Income' },
    summary: {
      en: 'A fixed monthly income, whatever the occupancy.',
      id: 'Pendapatan bulanan tetap, berapa pun okupansinya.',
    },
    description: {
      en: 'The operator pays the owner a fixed monthly income according to the agreed terms, regardless of fluctuations in occupancy and operating costs.',
      id: 'Operator membayar pemilik pendapatan bulanan tetap sesuai ketentuan yang disepakati, terlepas dari fluktuasi okupansi dan biaya operasional.',
    },
    bestFor: {
      en: 'Owners wanting predictable income.',
      id: 'Pemilik yang menginginkan pendapatan yang dapat diprediksi.',
    },
    comparison: { incomeStability: 'high', upsidePotential: 'low', riskToOwner: 'low' },
  },
  {
    id: 'fixed-gross-percentage',
    number: '02',
    name: { en: 'Fixed Gross Percentage', id: 'Fixed Gross Percentage' },
    summary: {
      en: 'An agreed share of gross revenue, every month.',
      id: 'Persentase pendapatan kotor yang disepakati, setiap bulan.',
    },
    description: {
      en: 'The owner receives an agreed fixed percentage of the property’s gross revenue each month.',
      id: 'Pemilik menerima persentase tetap yang disepakati dari pendapatan kotor properti setiap bulan.',
    },
    comparison: { incomeStability: 'medium', upsidePotential: 'medium', riskToOwner: 'low' },
  },
  {
    id: 'profit-share',
    number: '03',
    name: { en: 'Profit Share', id: 'Bagi Hasil' },
    summary: {
      en: 'Share in the upside as performance grows.',
      id: 'Ikut menikmati hasil seiring kinerja meningkat.',
    },
    description: {
      en: 'The owner receives an agreed percentage of gross or net profit. Returns vary with occupancy and performance.',
      id: 'Pemilik menerima persentase yang disepakati dari laba kotor atau laba bersih. Hasil bervariasi mengikuti okupansi dan kinerja.',
    },
    comparison: { incomeStability: 'low', upsidePotential: 'high', riskToOwner: 'high' },
  },
];
