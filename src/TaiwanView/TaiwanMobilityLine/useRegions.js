import { useState, useEffect } from "react";
import { fetchAndBypassCORS } from "../../utils/dataFetcher";

const API = "https://disease.sh/v3/covid-19/apple/countries/TW";

export const useRegions = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    fetchAndBypassCORS(API).then((data) => {
      if (isMounted) setData(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
