const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;
const { model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  answeredCensus: {
    type: Boolean,
    default: false,
  },
  household: [
    {
      name: {
        required: true,
        type: String,
      },
      birthday: {
        required: true,
        type: String,
      },
      education: {
        required: true,
        type: String,
      },
      maritalStatus: {
        required: true,
        type: String,
      },
      relationship: {
        required: true,
        type: String,
      },
      gender: {
        required: true,
        type: String,
      },
    },
  ],
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      default: "3022",
    },
  },
});
UserSchema.plugin(uniqueValidator, {
  message: "That {PATH} has already been registered.",
});

UserSchema.pre("save", async function () {
  this.firstName = this.firstName.trim();
  this.lastName = this.lastName.trim();

  this.address.street = this.address.street.trim();
  this.address.province = this.address.province.trim();
  this.address.city = this.address.city.trim();

  this.username = this.username.toLowerCase();
  this.email = this.email.toLowerCase();
});

UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
UserSchema.virtual("fullAddress").get(function () {
  return `${this.address.street} ${this.address.city} ${this.address.province}`;
});

UserSchema.plugin(passportLocalMongoose);

const User = model("User", UserSchema);

module.exports = User;
