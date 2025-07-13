const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Allow Metro to resolve react-native from the root node_modules
  config.resolver.nodeModulesPaths = [
    path.resolve(__dirname, '..', 'node_modules'),
    path.resolve(__dirname, 'node_modules'),
  ];

  // Watch the root for changes
  config.watchFolders = [
    path.resolve(__dirname, '..'),
    path.resolve(__dirname, '..', 'node_modules'),
  ];

  return config;
})();
