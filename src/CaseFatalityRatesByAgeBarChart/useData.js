import { useState, useEffect } from "react";
import { csv, autoType } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/mgeorgetw/965bfe365ab8e70e2ee34c9a5d4d594a/raw/COVID19CaseFatalityRatesByAge.csv";

// Data: Case Fatality Rates By Age
// https://ourworldindata.org/mortality-risk-covid#case-fatality-rate-of-covid-19-by-age
export const useData = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);

  useEffect(() => {
    let isMounted = true;
    csv(csvUrl, autoType).then((data) => {
      if (isMounted) setData(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
