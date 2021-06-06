import { useState, useEffect } from "react";
import { csv, autoType } from "d3";

const csvUrl =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Taiwan.csv";

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
