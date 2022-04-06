import { useState, useEffect } from "react";
import { json } from "d3";

const CORS = "https://morning-wave-49482.herokuapp.com/";
const jsonUrl = CORS + "https://disease.sh/v3/covid-19/apple/countries/TW";

export const useRegions = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    json(jsonUrl).then((data) => {
      if (isMounted) setData(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
