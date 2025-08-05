require('ts-node').register({
  project: './client/tsconfig.json',
});
require('tsconfig-paths').register();

const glob = require('glob');
const path = require('path');

// Automatically load all .spec.ts test files
glob.sync('./client/tests/**/*.spec.ts').forEach(function (file) {
  require(path.resolve(file));
});
