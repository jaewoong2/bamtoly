export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'moooo-',
  description: '이벤트',
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://moooo.com',
};
