module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/assets/(.*)$": "<rootDir>/assets/$1",
    "^@/(.*)\\.css$": "<rootDir>/__mocks__/styleMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^expo-router$": "<rootDir>/__mocks__/expo-router.tsx",
    "^expo-image$": "<rootDir>/__mocks__/expo-image.tsx",
    "^expo-image-picker$": "<rootDir>/__mocks__/expo-image-picker.tsx",
    "^react-native-keyboard-controller$":
      "<rootDir>/__mocks__/react-native-keyboard-controller.js",
    "^expo-sqlite$": "<rootDir>/__mocks__/expo-sqlite.js",
    "^react-native/Libraries/BatchedBridge/NativeModules$":
      "<rootDir>/__mocks__/react-native-native-modules.js",
    "^@react-native-async-storage/async-storage$":
      "<rootDir>/__mocks__/async-storage.js",
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/.yarn/",
    "<rootDir>/node_modules/",
    "<rootDir>/.github/",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|expo|@expo|@unimodules)",
  ],
};
