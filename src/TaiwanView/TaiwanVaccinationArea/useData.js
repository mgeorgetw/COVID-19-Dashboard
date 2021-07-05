import { useState, useEffect } from "react";
import { csv, autoType } from "d3";

const csvUrl =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Taiwan.csv";

// Data: Covid vaccinations in Taiwan
export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    csv(csvUrl, autoType).then((rawData) => {
      let prevVaccinated, prevFullyVaccinated, prevTotal;
      const row = rawData.map((d) => {
        d.people_vaccinated !== null
          ? (prevVaccinated = d.people_vaccinated)
          : (d.people_vaccinated = prevVaccinated);
        d.people_fully_vaccinated !== null
          ? (prevFullyVaccinated = d.people_fully_vaccinated)
          : (d.people_fully_vaccinated = prevFullyVaccinated);
        d.total_vaccinations !== null
          ? (prevTotal = d.total_vaccinations)
          : (d.total_vaccinations = prevTotal);
        return d;
      });
      if (isMounted) setData(row);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
