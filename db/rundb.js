require('babel-register')({
  presets: ['env'],
});

module.exports = require('./db.js');
