const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  address: { type: String, required: true },
  role: { type: String, required: true },
  books: [{ type: String, required: true, ref: 'Book' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
