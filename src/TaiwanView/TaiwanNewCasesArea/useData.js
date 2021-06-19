import { useState, useEffect } from "react";
import { csv, timeParse } from "d3";

const parseDay = timeParse("%Y-%m-%d");

const transform = (rawData) => {
  return rawData.map((d) => ({
    date: parseDay(d.date),
    newCases: +d.Taiwan,
  }));
};

// Data: Covid daily new_cases
export const useData = (api) => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);
  useEffect(() => {
    let isMounted = true;
    csv(api).then((rawData) => {
      if (isMounted) setData(transform(rawData));
    });
    return () => {
      isMounted = false;
    };
  }, [api]);
  return data;
};
