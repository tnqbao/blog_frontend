"use strict";

var path = require('path');
/** @type {import('next-i18next').UserConfig} */


var config = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi']
  },
  detection: {
    order: ['cookie', 'header', 'querystring', 'localStorage', 'path', 'subdomain'],
    caches: ['cookie']
  },
  localePath: path.resolve('./public/locales')
};
module.exports = config;
//# sourceMappingURL=next-i18next.config.dev.js.map
