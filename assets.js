var assetManager = require('connect-assetmanager');
var assetHandler = require('connect-assetmanager-handlers');
var lessHandler = require('connect-assetmanager-less-handler');

var config = require('./config')();

var assets = {
  'app.js': {
    'route': /\/static\/js\/app\.js/,
    'path': './public/javascripts/',
    'dataType': 'javascript',
    'debug': config.assets.debug,
    'files': [
      'jquery.min.js'
      // 'app.js'
    ]
  }, 
  // 'style.css': {
  //   'route': /\/static\/css\/style\.css/,
  //   'path': './public/stylesheets/',
  //   'dataType': 'css',
  //   'debug': config.assets.debug,
  //   'files': [
  //     'style.less'
  //   ],
  //   'preManipulate': {
  //     // Regexp to match user-agents including MSIE.
  //     'MSIE': [
  //       lessHandler,
  //       assetHandler.yuiCssOptimize,
  //       assetHandler.fixVendorPrefixes,
  //       assetHandler.fixGradients,
  //       assetHandler.stripDataUrlsPrefix
  //     ],
  //     // Matches all (regex start line)
  //     '^': [
  //       lessHandler,
  //       assetHandler.yuiCssOptimize,
  //       assetHandler.fixVendorPrefixes,
  //       assetHandler.fixGradients,
  //       assetHandler.replaceImageRefToBase64(root)
  //     ]
  //   }
  // }
};

var assetsManagerMiddleware = assetManager(assets);

exports.middleware = assetsManagerMiddleware;