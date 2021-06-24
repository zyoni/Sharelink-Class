const express = require("express");

class LinkRouter {
  constructor(linkService) {
    this.linkService = linkService;
  }
  router() {
    let router = express.Router();

    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));
    console.log("In the link router");

    return router;
  }

  get(req, res) {
    console.log("reached link backend");
    return this.linkService
      .list(req.query.search, req.query.id)
      .then((links) => {
        res.json(links);
      })
      .catch((err) => res.status(500).json(err));
  }

  post(req, res) {
    console.log("reached link backend");
    return this.linkService
      .addLink(req.body.link, req.body.id)
      .then((link) => res.json(link))
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = LinkRouter;
