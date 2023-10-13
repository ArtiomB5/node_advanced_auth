const {Schema, model} = require("mongooses");

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
});

module.exports = model("User", UserSchema);