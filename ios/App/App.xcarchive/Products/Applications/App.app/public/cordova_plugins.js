
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-health.health",
          "file": "plugins/cordova-plugin-health/www/ios/health.js",
          "pluginId": "cordova-plugin-health",
        "clobbers": [
          "navigator.health"
        ]
        },
      {
          "id": "com.telerik.plugins.healthkit.HealthKit",
          "file": "plugins/com.telerik.plugins.healthkit/www/HealthKit.js",
          "pluginId": "com.telerik.plugins.healthkit",
        "clobbers": [
          "window.plugins.healthkit"
        ]
        },
      {
          "id": "cordova-plugin-health.HealthKit",
          "file": "plugins/cordova-plugin-health/www/ios/HealthKit.js",
          "pluginId": "cordova-plugin-health",
        "clobbers": [
          "window.plugins.healthkit"
        ]
        },
      {
          "id": "cordova-plugin-firebase-authentication.FirebaseAuthentication",
          "file": "plugins/cordova-plugin-firebase-authentication/www/FirebaseAuthentication.js",
          "pluginId": "cordova-plugin-firebase-authentication",
        "merges": [
          "cordova.plugins.firebase.auth"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "com.telerik.plugins.healthkit": "0.7.0",
      "cordova-plugin-firebase-authentication": "7.0.1",
      "cordova-plugin-health": "2.1.0"
    };
    // BOTTOM OF METADATA
    });
    