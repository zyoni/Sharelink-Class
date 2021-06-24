const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("../bcrypt");

class RegService {
  constructor(knex) {
    this.knex = knex;
  }

  async register(particulars) {
    if (
      !(
        particulars.name &&
        particulars.email &&
        particulars.password
      )
    ) {
      throw new Error("particulars missing");
    }
    let { name, email, password } = particulars;
    let user = await this.knex("users")
      .select("id", "name", "email", "password")
      .where({ email });
    if (user[0]) {
      throw new Error("email occupied");
    }
    let hashedPassword = await bcrypt.hashPassword(
      password
    );
    let query = await this.knex
      .insert({
        name,
        email,
        password: hashedPassword,
      })
      .into("users")
      .returning("id")
      .catch((err) => {
        throw new Error(err);
      });
    let payload = {
      id: query[0],
      name: particulars.name,
      email: particulars.email,
    };
    let newToken = jwt.sign(payload, config.jwtSecret);
    return {
      token: newToken,
    };
  }
}

module.exports = RegService;
