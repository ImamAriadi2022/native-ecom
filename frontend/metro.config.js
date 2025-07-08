const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable require cycles warnings for production builds
config.resolver.requireCycleIgnorePatterns = [
  /(^|\/|\\)node_modules($|\/|\\)/,
];

module.exports = config;
