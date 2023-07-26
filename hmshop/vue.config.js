
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('less')
      .test(/\.less$/)
      .use('vue-style-loader')
      .loader('vue-style-loader')
      .end()
      .use('css-loader')
      .loader('css-loader')
      .end()
      .use('less-loader')
      .loader('less-loader')
      .end();
  },
};
