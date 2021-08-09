import { useState, useEffect } from "react";
import { json } from "d3";

const jsonUrl = "https://disease.sh/v3/covid-19/all";

// Use JSON data
export const useData = () => {
  const [data, setData] = useState(null);
  // console.log(data);

  useEffect(() => {
    let isMounted = true;
    json(jsonUrl).then((d) => {
      if (isMounted) setData(d);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
