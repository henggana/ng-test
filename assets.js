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
      'logger.js',
      'mm-foundation-tpls-0.3.1.min.js',
      'filters/format_date.js',
      'controllers/main_controller.js',
      'controllers/assign_modal_controller.js',
      'controllers/note_modal_controller.js',
      'directives/alarm_modal.js',
      'directives/alarms_table.js',
      'directives/alarm_item.js'
      // 'app.js'
    ]
  }, 
  'style.css': {
    'route': /\/static\/css\/style\.css/,
    'path': './public/stylesheets/',
    'dataType': 'css',
    'debug': config.assets.debug,
    'files': [
      'foundation.css'
    ],
    'preManipulate': {
      // Regexp to match user-agents including MSIE.
      'MSIE': [
        lessHandler,
        assetHandler.yuiCssOptimize,
        assetHandler.fixVendorPrefixes,
        assetHandler.fixGradients,
        assetHandler.stripDataUrlsPrefix
      ],
      // Matches all (regex start line)
      '^': [
        lessHandler,
        assetHandler.yuiCssOptimize,
        assetHandler.fixVendorPrefixes,
        assetHandler.fixGradients,
        assetHandler.replaceImageRefToBase64(root)
      ]
    }
  }
};

var assetsManagerMiddleware = assetManager(assets);

exports.middleware = assetsManagerMiddleware;