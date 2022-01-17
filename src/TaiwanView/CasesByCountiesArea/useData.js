import { useState, useEffect } from "react";
import { json } from "d3";

const CORS = "https://morning-wave-49482.herokuapp.com/";
const API =
  "https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5002&limited=全部縣市";
const jsonUrl = CORS + API;

const transformData = (rawData) =>
  rawData.map((d) => ({
    日期: new Date(d.a02),
    縣市別: d.a03,
    區域: d.a04,
    新增確診人數: +d.a05,
    累計確診人數: +d.a06,
  }));

export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    json(jsonUrl).then((rawData) => {
      const transformedData = transformData(rawData);
      if (isMounted) setData(transformedData);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
