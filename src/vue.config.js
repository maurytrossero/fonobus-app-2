module.exports = {
    chainWebpack: config => {
      config.resolve.alias.set('@fortawesome/fontawesome-svg-core', '@fortawesome/fontawesome-svg-core/index.js');
      config.resolve.alias.set('@fortawesome/vue-fontawesome', '@fortawesome/vue-fontawesome/index.js');
      config.resolve.alias.set('@fortawesome/free-brands-svg-icons', '@fortawesome/free-brands-svg-icons/index.js');
    }
  };