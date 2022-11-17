import { useState, useEffect } from "react";
import { json } from "d3";
// import { csv, autoType } from "d3";

// const csvUrl =
//   "https://gist.githubusercontent.com/mgeorgetw/690d02dfc6bdbb99e58f6d1c622836c9/raw/covidtable_taiwan_cdc5.csv";

const CORS = "https://morning-wave-49482.herokuapp.com/";
const API =
  "https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5003&limited=全部縣市";
const jsonUrl = CORS + API;
const transformData = (rawData) =>
  rawData.map((d) => {
    d["日期"] = new Date(d.a02);
    d["縣市別"] = d.a03;
    d["區域"] = d.a04;
    d["新增確診人數"] = +d.a05;
    d["累計確診人數"] = +d.a06;
    d["七天移動平均新增確診"] = +d.a07;
    return d;
  });

// Data: Covid vaccinations in Taiwan
export const useData = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);
  useEffect(() => {
    let isMounted = true;
    // csv(csvUrl, autoType).then((d) => {
    //   if (isMounted) setData(d);
    // });
    json(jsonUrl).then((rawData) => {
      if (isMounted) setData(transformData(rawData));
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
