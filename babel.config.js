module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'babel-plugin-inline-dotenv',
      {
        unsafe: true, 
      },
    ],
    [
      'nativewind/babel',
      {
        async: true,
      },
    ],
  ],
};
