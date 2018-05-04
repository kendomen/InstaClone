var path = require('path'),
    //env = process.env.NODE_ENV || 'development';
    env = 'production';

var config = {
  development: {
    app: {
      name: 'nikegram'
    },
    port: process.env.PORT || 3000,

    // ----------------------------------------------------------
    // DEV config
    // ----------------------------------------------------------
    env: 'dev',
    server: 'http://localhost:8080/'
  },

  // ----------------------------------------------------------
  // PROD config
  // ----------------------------------------------------------
  production: {
    app: {
      name: 'nikegram'
    },
    port: process.env.PORT || 3000,
    env: 'production',
    server: 'https://nikenode-web.azurewebsites.net/'
  }

};

module.exports = config[env];
