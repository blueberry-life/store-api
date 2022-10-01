const mongoose = require("mongoose");

function connectDb(dbUrl, username, password) {
  mongoose.connect(dbUrl, {
    authSource: "admin",
    auth: { username, password },
  });
}

module.exports = connectDb;
