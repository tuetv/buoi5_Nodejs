let mongoose = require('mongoose');
let categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
    description: {
        type: String,
    },
    isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('category',categorySchema)

