const nativeModules = {
  UIManager: {},
  NativeUnimoduleProxy: { viewManagersMetadata: {} },
  Linking: {
    openURL: () => {},
  },
};

module.exports = nativeModules;
module.exports.default = nativeModules;
