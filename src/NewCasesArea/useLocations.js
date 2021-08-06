import { useState, useEffect } from "react";
import { csv, autoType } from "d3";

const csvUrl =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/locations.csv";

const transform = (rawData) => {
  return rawData.map((d) => ({
    value: d["location"],
    label: d["Country/Region"],
  }));
};

// Data: Covid daily new_cases
export const useLocations = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    csv(csvUrl, autoType).then((rawData) => {
      if (isMounted) setData(transform(rawData));
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
