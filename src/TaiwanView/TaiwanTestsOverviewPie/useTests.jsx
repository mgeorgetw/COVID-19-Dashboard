import { useState, useEffect } from "react";
import { json } from "d3";

const jsonUrl = "https://covid19dashboard.cdc.gov.tw/dash7";

// Use JSON data
export const useTests = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);

  useEffect(() => {
    json(jsonUrl).then((d) => {
      d = d[0];
      d.peopleTested = +d["檢驗人數"].replaceAll(",", "");
      d.tests = +d["檢驗件數"].replaceAll(",", "");
      d.date = new Date(d["資料更新時間"]);
      setData(d);
    });
  }, []);
  return data;
};
