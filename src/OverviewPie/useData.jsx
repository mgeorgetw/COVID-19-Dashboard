import { useState, useEffect } from "react";
import { json } from "d3";

const jsonUrl = "https://disease.sh/v3/covid-19/all";

// Use JSON data
export const useData = () => {
  const [data, setData] = useState(null);
  // console.log(data);

  useEffect(() => {
    // I only want the top 10 countries
    json(jsonUrl).then(setData);
  }, []);
  return data;
};
