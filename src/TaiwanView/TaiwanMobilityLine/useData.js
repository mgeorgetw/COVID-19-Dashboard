import { useState, useEffect } from "react";
import { fetchAndBypassCORS } from "../../utils/dataFetcher";

const API = "https://disease.sh/v3/covid-19/apple/countries/Taiwan";

const transformData = (rawData) => {
  return rawData.map((d) => {
    return {
      date: new Date(d.date),
      driving: d.driving,
      transit: d.transit,
      walking: d.walking,
      subregion_and_city: d.subregion_and_city,
    };
  });
};

export const useData = (region, setLoading) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    fetchAndBypassCORS(`${API}/${region}`).then((data) => {
      if (isMounted) {
        setData(transformData(data.data));
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [region, setLoading]);
  return data;
};
