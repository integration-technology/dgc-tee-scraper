module.exports = (api) => {
  const isTest = api.env('test')
  // You can use isTest to determine what presets and plugins to use.
  if (isTest) {
    return {
      presets: ['babel-preset-react-app'],
      plugins: ['@babel/plugin-proposal-optional-chaining']
    }
  }
  return {}
}
