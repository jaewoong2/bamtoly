export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  logo: 'https://images.bamtoly.com/images/bamtori2.png',
  name: '밤톨이 | 이벤트 만들고 나눠요',
  description: '이벤트',
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://moooo.com',
};
