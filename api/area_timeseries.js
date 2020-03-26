const axios = require("axios");
const log = require("debug")("log");
//const chineseConv = require("chinese-conv");

const API_AREA =
  "https://raw.githubusercontent.com/BlankerL/DXY-COVID-19-Data/master/json/DXYArea-TimeSeries.json";

const fetcher = url =>
  axios.get(url).then(res => {
    return res.data;
  });

module.exports = app => {
  app.get("/area_timeseries", (req, res) => {
    log(`Request for COVID-19 data sequence in ${req.query.area}`);
    const area = req.query.area;
    async function fetchData() {
      try {
        const results = await fetcher(API_AREA);
        let found = results.find(obj => obj.provinceEnglishName === area);
        //let areaName = chineseConv.tify(found.provinceName);
        let areaName = found.provinceEnglishName;
        const statistics_res = await fetcher(found.statisticsData);
        const statisticsData = statistics_res.data;

        for (let i = 0; i < statisticsData.length; i++) {
          // Converts date ID to string for diplay
          statisticsData[i].dateId = statisticsData[i].dateId
            .toString()
            // And shortens it for visibility
            .replace(/^\d{4}/g, "")
            .replace(/(^\d{2})(\d{2}$)/, "$1/$2");
          // Calculates Death rate to 2 digits after dicimal point
          statisticsData[i].deathRate = Number(
            (
              (statisticsData[i].deadCount / statisticsData[i].confirmedCount) *
              100
            ).toFixed(2)
          );
          // Calculates Growth Factor
          if (i > 0 && statisticsData[i].confirmedIncr !== 0) {
            statisticsData[i].growthFactor = Number(
              (
                statisticsData[i].confirmedIncr /
                statisticsData[i - 1].confirmedIncr
              ).toFixed(2)
            );
          } else {
            statisticsData[i].growthFactor = 0;
          }
        }
        res.send({
          areaName,
          statisticsData
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  });
};
