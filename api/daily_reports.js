const axios = require("axios");
const log = require("debug")("log");
const Papa = require("papaparse");

const fetcher = url =>
  axios.get(url).then(res => {
    return res.data;
  });

function turnTwoDigit(n) {
  return n < 10 ? "0" + n : "" + n;
}

function getFileDate() {
  var time = new Date();
  var year = time.getFullYear();
  var month = turnTwoDigit(time.getMonth() + 1);
  var date = turnTwoDigit(time.getUTCDate() - 1);
  var formattedDate = `${month}-${date}-${year}`;
  return formattedDate;
}

module.exports = app => {
  app.get("/daily_reports", (req, res) => {
    log(`Request for COVID-19 daily reports from JHU CSS`);
    const API_CSV = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${getFileDate()}.csv`;
    async function fetchData() {
      try {
        const results = await fetcher(API_CSV);
        const results_json = Papa.parse(results, {
          header: true
        });
        res.send({ data: results_json.data });
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  });
};
