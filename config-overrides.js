const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}



const { override, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');
const webpackAliasMap = {
  '@': resolve('src'),
  'api': resolve('src/api'),
  'assets': resolve('src/assets'),
  'components': resolve('src/components'),
} 

module.exports = override(
  addWebpackAlias(webpackAliasMap),
  addWebpackModuleRule({
    test: /\.svg$/,
    loader: "svg-sprite-loader",
    include: path.resolve(__dirname, "./src/assets/svg"), //只处理指定svg的文件(所有使用的svg文件放到该文件夹下)
    options: {
      symbolId: "icon-[name]" //symbolId和use使用的名称对应      <use xlinkHref={"#icon-" + iconClass} />
    }
  })
)


/**
 * 单纯使用react-rewired的方式
 */
// module.exports = function override(config, env) {
//   // 接受cra脚手架内置默认的配置
//   config.resolve.alias = {
//     '@': resolve('src'),
//     // api: resolve('src/api'),
//     assets: resolve('src/assets'),
//     components: resolve('src/components'),
//   }
//   return config
// }