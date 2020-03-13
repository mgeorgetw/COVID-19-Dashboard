const axios = require("axios");
const log = require("debug")("log");

const API = "https://covid2019-api.herokuapp.com/current";

const fetcher = url =>
  axios.get(url).then(res => {
    return res.data;
  });

module.exports = app => {
  app.get("/world_current", (req, res) => {
    log("Request for current COVID-19 data by areas.");
    async function fetchData() {
      try {
        const results = await fetcher(API);
        res.send({ results });
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  });
};
