module.exports = function (api) {
  if (api && api.cache) {
    api.cache(true);
  }
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            '!': './src',
          },
          cwd: 'babelrc',
          extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.json',
            '.ios.ts',
            '.ios.tsx',
            '.android.ts',
            '.android.tsx',
            '.web.ts',
            '.web.tsx',
          ],
          root: ['./src'],
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
