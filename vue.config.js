module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '从生祥-面试';
      return args;
    })
  }
}