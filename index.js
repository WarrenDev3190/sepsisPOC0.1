const config = require('./src/constants/config');
require('babel-register');
require('./src/server/system')(config);