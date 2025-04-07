const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: { type: String, required: true, minlength: 8 },
  name: { type: String },
  address: { type: String },
  zip: { type: Number },
  location: { type: String }
});
const User = mongoose.model('User', UserSchema);
