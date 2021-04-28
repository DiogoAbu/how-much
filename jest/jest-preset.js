const preset = require('jest-expo/jest-preset');

module.exports = Object.assign({}, preset, {
  setupFiles: [require.resolve('./save-promise.js')]
    .concat(preset.setupFiles)
    .concat([require.resolve('./restore-promise.js')]),
});
