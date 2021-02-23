const axios = require("axios");
const log = require("debug")("log");
const Papa = require("papaparse");

const fetcher = url =>
  axios.get(url).then(res => {
    return res.data;
  });

module.exports = app => {
  app.get("/confirmed_timeseries", (req, res) => {
    log(`Request for COVID-19 confirmed cases time series data from JHU CSSE`);
    // Data comes from John Hopkins University, hosted at Github
    //const API_CSV = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv`;
    const API_CSV = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;
    async function fetchData() {
      try {
        const results = await fetcher(API_CSV);
        const results_json = Papa.parse(results, {
          header: true
        });
        let data = results_json.data.map(d => {
          let keys = Object.keys(d);
          // Data series starts at the 5th place
          let series = keys.slice(4).map(key => {
            // Removes year in the date string for visibility
            // return { x: key.replace(/\/\d{2}$/g, ""), y: parseInt(d[key]) };
            return { x: key, y: parseInt(d[key]) };
          });
          return {
            province: d[keys[0]],
            country: d[keys[1]],
            Lat: Number(d[keys[2]]),
            Long: Number(d[keys[3]]),
            confirmed: series
          };
        });
        res.send({ data: data });
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  });
};
