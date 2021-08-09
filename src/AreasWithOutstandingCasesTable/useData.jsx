import { useState, useEffect } from "react";
import { csv, autoType } from "d3";

const csvUrl =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv";

// Data: Covid daily new_cases
export const useData = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);
  useEffect(() => {
    let isMounted = true;
    csv(csvUrl, autoType).then((rawData) => {
      if (isMounted) setData(rawData);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
