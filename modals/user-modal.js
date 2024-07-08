const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  contact: Number,

  cart: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
    ],

  orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
    ],

    picture: Buffer,
    about: String
});

module.exports = mongoose.model("user", userSchema);