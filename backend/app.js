const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));

const LinkService = require("./services/LinkService");
const LinkRouter = require("./routers/LinkRouter");
const AuthService = require("./services/AuthService");
const AuthRouter = require("./routers/AuthRouter");
const RegService = require("./services/RegService");
const RegRouter = require("./routers/RegRouter");

const linkService = new LinkService(knex);
const authService = new AuthService(knex);
const regService = new RegService(knex);

const auth = require("./auth")(knex);
app.use(auth.initialize());

app.use(
  "/api/link/",
  auth.authenticate(),
  new LinkRouter(linkService).router()
);
app.use(
  "/api/login/",
  new AuthRouter(authService).router()
);
app.use("/api/signup/", new RegRouter(regService).router());

app.listen(8080, () => {
  console.log("Application listening to port 8080");
});
