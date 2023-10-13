const UserModel = require("../models/user-model");
const bcryot = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error("Email address already exists");
    }
    const hashPassword = await bcryot.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(email, activationLink);
  }
}

module.exports = new UserService();