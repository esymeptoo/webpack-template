module.exports = (ctx) => {
  // 小弟还没搞明白这个ctx怎么传，所以目前先这么糊一下
  const isWMP = typeof ctx.webpack.target === 'function';
  return {
    plugins: {
      "postcss-import": {},
      "postcss-url": {},
      "autoprefixer": true,
    },
  }
}
