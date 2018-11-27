const mysql = require('mysql');
const async = require('async');

// MySQL setup for multiple database connections
exports.MODE_PRODUCTION = 'mode_production';

var state = {
  pool: null,
  mode: null,
};

// Database settings
var PRODUCTION_DB = 'bi_live';

exports.connect = function(mode, done) {
  if (mode === exports.MODE_PRODUCTION) {
    state.pool = mysql.createPoolCluster();

    state.pool.add('WRITE', {
      host: '138.197.214.161',
      user: 'bi_usr',
      password: 'BMY_sMz9V&MP4aJF',
      database: PRODUCTION_DB
    });

    state.pool.add('READ1', {
      host: '138.197.214.161',
      user: 'bi_usr_read1',
      password: 'BMY_sMz9V&MP4aJF',
      database: PRODUCTION_DB
    });
  }

  state.mode = mode;
  done();
}

exports.READ = 'read';
exports.WRITE = 'write';

// Do not change this functions
exports.get = function(type, done) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  if (type === exports.WRITE) {
    state.pool.getConnection('WRITE', function (err, connection) {
      if (err) return done(err);
      done(null, connection);
    });
  } else {
    state.pool.getConnection('READ*', function (err, connection) {
      if (err) return done(err);
      done(null, connection);
    });
  }
}
