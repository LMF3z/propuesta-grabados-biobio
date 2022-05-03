module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  // experimental: {
  //   // Enables the styled-components SWC transform
  //   styledComponents: true,
  // },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
};
