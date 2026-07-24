// Minimal mock for expo-sqlite used in tests
module.exports = {
  openDatabaseSync: (name) => ({
    name,
    transaction: (fn) => {
      // provide a minimal tx object
      const tx = {
        executeSql: () => {},
      };
      try {
        fn(tx);
      } catch (e) {
        // ignore
      }
    },
  }),
};
