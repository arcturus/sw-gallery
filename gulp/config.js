var dest = './dist',
  src = './src',
  mui = './node_modules/material-ui/src';

module.exports = {
  browserSync: {
    // server: {
    //   // We're serving the src folder as well
    //   // for sass sourcemap linking
    //   baseDir: [dest, src]
    // },
    // files: [
    //   dest + '/**'
    // ]
    proxy: "localhost:3000"
  },
  markup: {
    src: src + "/www/**",
    dest: dest,
    original: src
  },
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/app/app.js',
      dest: dest,
      outputName: 'app.js'
    }],
    extensions: ['.js'],
  }
};
