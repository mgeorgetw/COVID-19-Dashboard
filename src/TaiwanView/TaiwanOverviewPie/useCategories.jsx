import { useState, useEffect } from "react";
import { json } from "d3";

// const csvUrl =
//   "https://gist.githubusercontent.com/mgeorgetw/413b23d87907b0f9bcda46e6e103cfb6/raw/csse_covid_19_daily_reports_vaccine_city_c.csv";

const CORS = "https://morning-wave-49482.herokuapp.com/";
const API =
  "https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5001&limited=全部縣市";
const jsonUrl = CORS + API;

// const convertStringToNumber = (d) => {
//   Object.keys(d).forEach((key) => {
//     if (typeof d[key] !== "number") {
//       d[key] = d[key].replace(/,/g, "");
//       d[key] = +d[key];
//     }
//   });
//   return d;
// };

// const row = (d) => {
//   d.id = +d["ID"];
//   d.date = new Date(d["日期"]);
//   d.county = d["縣市別"];
//   d.population = +d["總人口數"].replace(/,/g, "");
//   d.lastTotalVaccinated = +d["前次累計接種人數更新"].replace(/,/g, "");
//   d.newVaccinated = +d["新增接種人數"].replace(/,/g, "");
//   d.totalVaccinated = +d["累計接種人數"].replace(/,/g, "");
//   d.totalVaccinatedRate = +d["累計接種率 (%)"].replace(/,|%/g, "");
//   d.vaccinesCount = +d["累計配送劑數"].replace(/,/g, "");
//   d.vaccinesLeftRate = +d["剩餘庫存量 (%)"].replace(/,|%/g, "");
//   d.vaccinesCountRate = (d.vaccinesCount / d.population) * 100;
//   return d;
// };

const transformData = (rawData) =>
  rawData.map((d) => {
    d.date = new Date(d.a02);
    d.county = d.a03;
    d.area = d.a04;
    d.gender = d.a05;
    d.foreign = d.a06;
    d.ageGroup = d.a07;
    return d;
  });

// Data: Detailed Covid-19 cases in Taiwan
export const useCategories = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);
  useEffect(() => {
    let isMounted = true;
    // csv(csvUrl, row).then((d) => {
    //   console.log("csv data", d);
    //   if (isMounted) setData(d);
    // });
    json(jsonUrl).then((rawData) => {
      // console.log("json data", transformData(rawData));
      if (isMounted) setData(transformData(rawData));
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
