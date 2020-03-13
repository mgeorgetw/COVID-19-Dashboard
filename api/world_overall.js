const axios = require("axios");
const log = require("debug")("log");

const API = "https://covid2019-api.herokuapp.com/total";

const fetcher = url =>
  axios.get(url).then(res => {
    return res.data;
  });

module.exports = app => {
  app.get("/world_overall", (req, res) => {
    log("Request for COVID-19 data sequence in China.");
    async function fetchData() {
      try {
        const results = await fetcher(API);
        res.send({
          confirmed: results.confirmed,
          deaths: results.deaths,
          recovered: results.recovered
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  });
};
