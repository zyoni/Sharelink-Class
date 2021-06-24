const express = require("express");

class RegRouter {
  constructor(regService) {
    this.regService = regService;
  }
  router() {
    let router = express.Router();

    router.post("/", this.post.bind(this));
    console.log("In the reg router");

    return router;
  }

  post(req, res) {
    console.log("reached reg backend");
    return this.regService
      .register(req.body)
      .then((token) => res.json(token))
      .catch((err) => {
        let errText = err.toString();
        if (errText.includes("email occupied")) {
          res.status(403).send(errText);
        } else {
          res.status(401).send(errText);
        }
      });
  }
}

module.exports = RegRouter;
