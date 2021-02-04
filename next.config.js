const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const webpack = require("webpack");
const path = require("path");

module.exports = withPlugins([[withSass], [withImages], [withCSS]], {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
  
    return config;
  },
  env: {
    baseUrl:'http://localhost:3500',
    bucketName: 'whipflipnow',
    region: 'us-east-1',
    accessKeyId: 'AKIASQKGQTBO4I5MWPOU',
    secretAccessKey: '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',

  },
  images: {
    domains: ['whipflipnow.s3.amazonaws.com'],
  }
});
