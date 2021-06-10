import { useState, useEffect } from "react";
import { csv } from "d3";

// Share of Population infected with HIV/AIDS (Source: IHME)
const csvUrl =
  "https://gist.githubusercontent.com/curran/470752f12c027f8ff4266e7c96f26a56/raw/66908b56e371e7c9f5a1c0911ac3250f570a4c83/share-of-population-infected-with-hiv-ihme.csv";

export const useData = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data[0]);

  useEffect(() => {
    const row = d => {
      // + = parseFloat()
      d.aids = +d[
        "Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)"
      ];
      return d;
    };
    // I only want the top 10 countries
    csv(csvUrl, row).then(setData);
  }, []);
  return data;
};
