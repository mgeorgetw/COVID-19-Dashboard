const axios = require("axios");
const log = require("debug")("log");

const API = "https://covid.mathdro.id/api";

const fetcher = url =>
  axios.get(url).then(res => {
    return res.data;
  });

module.exports = app => {
  app.get("/world_overall", (req, res) => {
    log("Request for current COVID-19 overall data.");
    async function fetchData() {
      try {
        const results = await fetcher(API);
        res.send({
          confirmed: results.confirmed.value,
          deaths: results.deaths.value,
          recovered: results.recovered.value
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  });
};
