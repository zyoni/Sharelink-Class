const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("../bcrypt");

class AuthService {
  constructor(knex) {
    this.knex = knex;
  }

  async verify(credentials) {
    if (!(credentials.email && credentials.password)) {
      throw new Error("email and password not there");
    }
    let { email, password } = credentials;
    let user = await this.knex("users")
      .select("id", "name", "email", "password")
      .where({ email });
    if (!user[0]) {
      throw new Error("email not verified");
    }
    let isMatch = await bcrypt.checkPassword(
      password,
      user[0].password
    );
    if (!isMatch) {
      throw new Error("password not verified");
    }
    let payload = { ...user[0] };
    delete payload.password;
    let newToken = jwt.sign(payload, config.jwtSecret);
    return {
      token: newToken,
    };
  }
}

module.exports = AuthService;
