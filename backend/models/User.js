const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// On crée un schéma pour créer des utilisateurs
const userSchema = mongoose.Schema({
  // On précise "unique" afin de ne pouvoir faire qu'un compte par email
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);