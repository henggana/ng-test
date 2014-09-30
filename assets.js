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
      // 'jquery.min.js',
      'spin.js',
      'underscore.js',
      'angular.js',
      'prevent.js',
      'moment.js',
      'mm-foundation-tpls-0.3.1.min.js',
      'filters/format_date.js',
      'controllers/main_controller.js',
      'controllers/assign_modal_controller.js',
      'directives/alert_modal.js',
      'directives/alerts_table.js',
      'directives/alert_item.js'
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