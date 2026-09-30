/**
 * Site structure. Drives the header mega-menu, the mobile menu, the footer sitemap
 * and sitemap.xml. Labels come from messages: nav.<key> and nav.sections.<anchor>.
 */
export const navigation = [
  {
    key: 'about',
    href: '/about',
    sections: ['about', 'vision-mission', 'leadership', 'why-jb-rooms'],
  },
  {
    key: 'services',
    href: '/services',
    sections: [
      'hotel-management',
      'operations',
      'revenue-management',
      'ota-management',
      'people-management',
    ],
  },
  {
    key: 'portfolio',
    href: '/portfolio',
    sections: ['current-properties', 'timeline', 'upcoming-projects'],
  },
  {
    key: 'partner',
    href: '/partner',
    sections: ['management-models', 'fixed-net-income', 'fixed-gross-percentage', 'profit-share'],
  },
  {
    key: 'contact',
    href: '/contact',
    sections: ['whatsapp', 'office'],
  },
] as const;

export type NavItem = (typeof navigation)[number];
export type NavKey = NavItem['key'];
export type SectionKey = NavItem['sections'][number];

export const staticRoutes = ['', ...navigation.map((n) => n.href)] as const;
