const withImages = require('next-images');

module.exports = withImages({
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin(/\/__tests__\/.*|.*\.(spec|test)\.[jt]sx?$/)
    );
    return config;
  },
  images: {
    domains: ['news.files.bbci.co.uk'],
  },
});
