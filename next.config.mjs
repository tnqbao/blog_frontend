import nextI18NextConfig from './next-i18next.config.js';
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table"
  ],
  i18n: nextI18NextConfig.i18n,
};

export default nextConfig;