const axios = require("axios");
const log = require("debug")("log");
const chineseConv = require("chinese-conv");

const COVID19_AREA_LATEST = "https://lab.isaaclin.cn/nCoV/api/area?latest=1";

const fetcher = url =>
  axios.get(url).then(res => {
    return res.data.results;
  });

module.exports = app => {
  app.get("/area_latest", (req, res) => {
    log("Request for COVID-19 latest data in listed areas.");
    async function fetchData() {
      let latest_data = [];
      const countries = [
        "湖北",
        "韩国",
        "日本",
        "意大利",
        "伊朗",
        "台湾",
        "美国"
      ];
      try {
        const results = await fetcher(COVID19_AREA_LATEST);
        for (let i = 0; i < results.length; i++) {
          for (let j = 0; j < countries.length; j++) {
            if (results[i].provinceShortName === countries[j]) {
              let death_rate = (
                (results[i].deadCount / results[i].confirmedCount) *
                100
              ).toFixed(2);
              latest_data.push({
                country: chineseConv.tify(countries[j]),
                currentDeathRate: death_rate,
                confirmedCount: results[i].confirmedCount,
                deadCount: results[i].deadCount
              });
            }
          }
        }
        latest_data.sort(function(a, b) {
          return b.deadCount - a.deadCount;
        });
        res.send({ latest_data });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  });
};
