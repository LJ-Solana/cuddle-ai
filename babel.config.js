// .babelrc or babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'nativewind/babel',
      {
        async: true,
      },
    ],
  ],
};
