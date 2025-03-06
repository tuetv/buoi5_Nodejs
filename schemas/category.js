let mongoose = require('mongoose');
let categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
    description: {
        type: String,
        unique: true,
        required: true
    },
    isDeleted: { type: Boolean, default: false }
});