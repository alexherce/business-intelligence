var db = require('./mysql.js')

// Methods to get and set data in the MySQL DB.

// Makes user account in the database.
// Store the Facebook user id, name, lastname in the database.
exports.create = function(fbid, ba, name, lastname, done) {
  db.get(db.WRITE, function(err, connection) {
    if (err) return done('Database problem');

    connection.query("CALL save_account('" + fbid + "', '" + ba + "', '" + name + "', '" + lastname + "');", function(err, result) {
      connection.release();
      if (err) return done(err);
      done(null, result.insertId);
    });
  });
}

// Get user account data from the database.
exports.getAccount = function(fbid, done) {
  db.get(db.READ, function(err, connection) {
    if (err) return done('Database problem');

    connection.query("CALL get_account('" + fbid + "')", function (err, rows) {
      connection.release();
      if (err) return done(err);
      let row = rows[0];
      let data = row[0];
      done(null, data);
    });
  });
}
