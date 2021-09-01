module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  transpileDependencies: [],
  productionSourceMap: process.env.NODE_ENV !== 'production',
  css: {
    requireModuleExtension: true,
    sourceMap: process.env.NODE_ENV !== 'production',
  },
};
