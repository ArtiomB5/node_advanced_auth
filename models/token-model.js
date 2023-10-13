const {Schema, model} = require("mongooses");

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
});

module.exports = model("Token", TokenSchema);