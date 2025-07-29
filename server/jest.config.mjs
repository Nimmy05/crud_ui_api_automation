// jest.config.mjs
export default {
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Optional: handles import paths with `.js`
  },
};
