// For Webpack 4
module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on 'fs' module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },
};

// For Webpack 5
module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
};
