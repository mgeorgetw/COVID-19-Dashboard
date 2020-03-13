const express = require("express");
const port = process.env.PORT || 5000;
const log = require("debug")("log");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./api/area_latest")(app);
require("./api/china_latest")(app);
require("./api/china_overall")(app);
require("./api/world_overall")(app);
require("./api/world_current")(app);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => log(`Listening on port ${port}`));
