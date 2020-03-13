const axios = require("axios");
const log = require("debug")("log");

const API = "https://lab.isaaclin.cn/nCoV/api/overall?latest=0";

const fetcher = url =>
  axios.get(url).then(res => {
    return res.data.results;
  });

function convertTime(unix_timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var time = new Date(unix_timestamp);
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var formattedDate = month + "/" + date;
  return formattedDate;
}

module.exports = app => {
  app.get("/china_overall", (req, res) => {
    log("Request for COVID-19 data sequence in China.");
    async function fetchData() {
      try {
        const results = await fetcher(API);
        let daily_rates = [];
        //let daily_severe_rate = [];
        let data_date = 0;
        for (let result of results) {
          let d = new Date(result.updateTime);
          if (d.getDate() !== data_date) {
            data_date = d.getDate();
            let datestring = convertTime(d);
            let death_rate = (
              (result.deadCount / result.confirmedCount) *
              100
            ).toFixed(2);
            let severe_rate = 0;
            if (result.seriousCount && result.currentConfirmedCount) {
              severe_rate = (
                (result.seriousCount / result.currentConfirmedCount) *
                100
              ).toFixed(2);
            }
            daily_rates.unshift({
              date: datestring,
              confirmedCount: result.confirmedCount,
              deadCount: result.deadCount,
              currentConfirmedCount: result.currentConfirmedCount,
              seriousCount: result.seriousCount,
              deathRate: Number(death_rate),
              severeRate: Number(severe_rate)
            });
          }
        }
        res.send({
          dailyRates: daily_rates
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  });
};
