const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

// eslint-disable-next-line no-unused-vars
module.exports = function override(config, env) {
  // 接受cra脚手架内置默认的配置

  config.resolve.alias = {
    '@': resolve('src'),
    // api: resolve('src/api'),
    assets: resolve('src/assets'),
    components: resolve('src/components'),
  }

  return config
}
