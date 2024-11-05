const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    email: { type: String, required: true },
    name: String,
    profilePic: String,
    emailVerified: Boolean,
});

module.exports = mongoose.model('User', userSchema);
