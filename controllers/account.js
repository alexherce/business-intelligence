const request = require('request');
const account = require('../datasource/account');

exports.createAccount = function(payload, reply, firstName, lastName) {

  // Get account from database
  account.getAccount(payload.sender.id, function(err, data) {
    if (data) {
      if (data.ba) {
        // Account already exists, print unique id
        console.log(data.ba);
      } else if (err) {
        // Get query error
        console.log(err);
      } else {
        // Create account in database
        account.create(payload.sender.id, "", firstName, lastName, function(err, data) {
          if (err) {
            // Create query error
            console.log(err);
          } else {
            // Continue doing something after query
          }
        });
      }
    });
  };
