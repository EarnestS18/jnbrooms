import type { Service } from '@/types/content';

// TODO: confirm exact service scope with management before launch
export const services: Service[] = [
  {
    id: 'hotel-management',
    label: { en: 'Hotel Management', id: 'Manajemen Hotel' },
    headline: { en: 'End-to-end. Fully managed.', id: 'Menyeluruh. Dikelola penuh.' },
    body: {
      en: 'Professional, end-to-end management of your property — focused on service quality, efficiency and profitability.',
      id: 'Pengelolaan properti yang profesional dan menyeluruh — berfokus pada kualitas layanan, efisiensi, dan profitabilitas.',
    },
    image: '/images/services/hotel-management.jpg',
  },
  {
    id: 'operations',
    label: { en: 'Operations', id: 'Operasional' },
    headline: { en: 'Standards, every single day.', id: 'Standar, setiap hari.' },
    body: {
      en: 'Day-to-day hotel operations, service standards, housekeeping and cleanliness — backed by operational and monthly performance reporting.',
      id: 'Operasional hotel sehari-hari, standar layanan, housekeeping dan kebersihan — didukung laporan operasional dan laporan kinerja bulanan.',
    },
    image: '/images/services/operations.jpg',
  },
  {
    id: 'revenue-management',
    label: { en: 'Revenue Management', id: 'Manajemen Pendapatan' },
    headline: { en: 'Price right. Fill rooms.', id: 'Harga tepat. Kamar terisi.' },
    body: {
      en: 'Pricing, occupancy and revenue optimisation designed to improve your property’s results.',
      id: 'Optimalisasi harga, okupansi, dan pendapatan untuk meningkatkan kinerja properti Anda.',
    },
    image: '/images/services/revenue-management.jpg',
  },
  {
    id: 'ota-management',
    label: { en: 'OTA Management', id: 'Manajemen OTA' },
    headline: { en: 'Seen on every channel.', id: 'Tampil di setiap kanal.' },
    body: {
      en: 'Distribution and listing management across OYO and other OTA channels.',
      id: 'Pengelolaan distribusi dan listing di OYO serta berbagai kanal OTA lainnya.',
    },
    image: '/images/services/ota-management.jpg',
  },
  {
    id: 'people-management',
    label: { en: 'People Management', id: 'Manajemen SDM' },
    headline: { en: 'Great teams. Great stays.', id: 'Tim hebat. Pengalaman menginap hebat.' },
    body: {
      en: 'Recruiting, training and developing professional hospitality teams.',
      id: 'Merekrut, melatih, dan mengembangkan tim perhotelan yang profesional.',
    },
    image: '/images/services/people-management.jpg',
  },
];
