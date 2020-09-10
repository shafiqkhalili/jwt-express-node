let mongoose = require('mongoose');
const bcrypt = require("bcrypt");

function setPassword(password) {
    return bcrypt.hashSync(password, 10);
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: setPassword
    }
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;