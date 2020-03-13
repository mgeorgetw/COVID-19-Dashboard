const axios = require("axios");
const log = require("debug")("log");

const COVID19_CHINA_LATEST =
  "https://lab.isaaclin.cn/nCoV/api/overall?latest=1";

const fetcher = url =>
  axios.get(url).then(res => {
    return res.data.results;
  });

module.exports = app => {
  app.get("/china_latest", (req, res) => {
    log("Request for COVID-19 latest data in China.");
    async function fetchData() {
      try {
        const results = await fetcher(COVID19_CHINA_LATEST);
        let deathRate = (
          (results[0].deadCount / results[0].confirmedCount) *
          100
        ).toFixed(2);
        let severeRate = (
          (results[0].seriousCount / results[0].currentConfirmedCount) *
          100
        ).toFixed(2);
        res.send({
          confirmedCount: results[0].confirmedCount,
          currentConfirmedCount: results[0].currentConfirmedCount,
          deadCount: results[0].deadCount,
          seriousCount: results[0].seriousCount,
          deathRate: deathRate,
          severeRate: severeRate
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  });
};
