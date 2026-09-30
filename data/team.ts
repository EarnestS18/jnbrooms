import type { TeamMember } from '@/types/content';

/**
 * LEADERSHIP — shown on /about#leadership.
 * To add a person: copy an entry and add a portrait to /public/images/team/<slug>.jpg (3:4 ratio).
 */
export const team: TeamMember[] = [
  {
    slug: 'hie-yenny-kristina',
    name: 'Hie Yenny Kristina',
    role: { en: 'CEO / Founder', id: 'CEO / Pendiri' },
    bio: {
      en: 'Founded J&B Rooms in 2019 and leads the company’s growth as a multi-location hotel management partner.',
      id: 'Mendirikan J&B Rooms pada tahun 2019 dan memimpin pertumbuhan perusahaan sebagai mitra manajemen hotel multi-lokasi.',
    },
    image: '/images/team/hie-yenny-kristina.jpg',
  },
  {
    slug: 'aidil-putra-ardi',
    name: 'Aidil Putra Ardi',
    role: { en: 'COO', id: 'COO' },
    bio: {
      en: '13+ years as a hotelier in international chain hotels.',
      id: 'Lebih dari 13 tahun berkarier sebagai hotelier di jaringan hotel internasional.',
    },
    image: '/images/team/aidil-putra-ardi.jpg',
  },
  {
    slug: 'earnest-surya',
    name: 'Earnest Surya',
    role: { en: 'CTO', id: 'CTO' },
    // TODO(content): confirm bio with Earnest Surya.
    bio: {
      en: 'Leads technology and digital systems across the J&B Rooms portfolio.',
      id: 'Memimpin teknologi dan sistem digital di seluruh portofolio J&B Rooms.',
    },
    image: '/images/team/earnest-surya.jpg',
  },
];
