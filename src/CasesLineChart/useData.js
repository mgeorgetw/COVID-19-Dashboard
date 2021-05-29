import { useState, useEffect } from "react";
import { csv, timeParse } from "d3";

const csvUrl =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/new_cases.csv";

const parseDay = timeParse("%Y-%m-%d");

const transform = (rawData) => {
  return rawData.map((d) => ({
    date: parseDay(d.date),
    newCases: +d.World,
  }));
};

// Data: Covid daily new_cases
export const useData = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);
  useEffect(() => {
    csv(csvUrl).then((rawData) => {
      setData(transform(rawData));
    });
  }, []);
  return data;
};
