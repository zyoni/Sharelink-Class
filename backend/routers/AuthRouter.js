const express = require("express");

class AuthRouter {
  constructor(authService) {
    this.authService = authService;
  }
  router() {
    let router = express.Router();

    router.post("/", this.post.bind(this));
    console.log("In the auth router");

    return router;
  }

  post(req, res) {
    console.log("reached auth backend", req.body);
    return this.authService
      .verify(req.body)
      .then((token) => res.json(token))
      .catch((err) => res.status(401).send(err.toString()));
  }
}

module.exports = AuthRouter;
