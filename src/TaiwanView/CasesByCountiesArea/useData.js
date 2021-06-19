import { useState, useEffect } from "react";
import { csv, autoType } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/mgeorgetw/690d02dfc6bdbb99e58f6d1c622836c9/raw/covidtable_taiwan_cdc5.csv";

// Data: Covid vaccinations in Taiwan
export const useData = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);
  useEffect(() => {
    let isMounted = true;
    csv(csvUrl, autoType).then((d) => {
      if (isMounted) setData(d);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
