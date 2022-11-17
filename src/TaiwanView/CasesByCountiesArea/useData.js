import { useState, useEffect } from "react";
import { fetchAndBypassCORS } from "../../utils/dataFetcher";

const API =
  "https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5002&limited=全部縣市";

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
    fetchAndBypassCORS(API).then((rawData) => {
      const transformedData = transformData(rawData);
      if (isMounted) setData(transformedData);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
