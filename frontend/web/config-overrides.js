const { override, fixBabelImports, addBabelPlugins } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  ...addBabelPlugins('relay')
)
