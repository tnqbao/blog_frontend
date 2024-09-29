/** @type {import('next-i18next').UserConfig} */
const config = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'vi'],
    },
    detection: {
      order: ['cookie', 'header', 'querystring', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
  };
  
  module.exports = config;