const mongoose = require('mongoose');

const credsSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Creds = mongoose.model('Creds', credsSchema);

module.exports = Creds;
