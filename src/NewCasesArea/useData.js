import { useState, useEffect } from "react";
import { csv, timeParse } from "d3";

const parseDay = timeParse("%Y-%m-%d");

const transform = (rawData, selected) => {
  return rawData.map((d) => ({
    date: parseDay(d.date),
    newCases: +d[selected],
  }));
};

// Data: Covid daily new_cases
export const useData = (api, selected) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    csv(api).then((rawData) => {
      if (isMounted) setData(transform(rawData, selected));
    });
    return () => {
      isMounted = false;
    };
  }, [api, selected]);
  return data;
};
