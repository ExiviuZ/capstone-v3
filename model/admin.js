const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;
const { model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const AdminSchema = Schema({
  name: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: true,
  },
});

AdminSchema.plugin(passportLocalMongoose);

const Admin = model("Admin", AdminSchema);

module.exports = Admin;
