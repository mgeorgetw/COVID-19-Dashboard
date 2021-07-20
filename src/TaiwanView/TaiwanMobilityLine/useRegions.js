import { useState, useEffect } from "react";
import { json } from "d3";

const jsonUrl = "https://disease.sh/v3/covid-19/apple/countries/TW";

// Data: Covid vaccinations in Taiwan
export const useRegions = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    json(jsonUrl).then((data) => {
      // console.log(data);
      if (isMounted) setData(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
