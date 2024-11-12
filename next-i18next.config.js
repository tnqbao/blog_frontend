const path = require('path');

const config = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
  },
  detection: {
    order: ['cookie', 'header', 'querystring', 'localStorage', 'path', 'subdomain'],
    caches: ['cookie'],
  },
  localePath: path.resolve('./public/locales'),
  react: { useSuspense: false },
};
module.exports = config;
