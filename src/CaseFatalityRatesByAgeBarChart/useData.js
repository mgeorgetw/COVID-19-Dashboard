// import { useState, useEffect } from "react";
// import { csv } from "d3";

// const csvUrl =
//   "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

// // Data: Missing Migrants
// export const useData = () => {
//   const [data, setData] = useState(null);
//   // if (data) console.log(data[0]);

//   useEffect(() => {
//     const row = (d) => {
//       // + = parseFloat()
//       d.Population = +d["2020"] * 1000;
//       return d;
//     };
//     // I only want the top 10 countries
//     csv(csvUrl, row).then((d) => setData(d.slice(0, 10)));
//   }, []);
//   return data;
// };

export const CFRbyAgeData = [
  {
    Country: "South Korea",
    "0-9 years": 0,
    "10-19 years": 0,
    "20-29 years": 0,
    "30-39 years": 0.11,
    "40-49 years": 0.08,
    "50-59 years": 0.5,
    "60-69 years": 1.8,
    "70-79 years": 6.3,
    "80+ years": 13,
  },
  {
    Country: "Spain",
    "0-9 years": 0,
    "10-19 years": 0,
    "20-29 years": 0.22,
    "30-39 years": 0.14,
    "40-49 years": 0.3,
    "50-59 years": 0.4,
    "60-69 years": 1.9,
    "70-79 years": 4.8,
    "80+ years": 15.6,
  },
  {
    Country: "China",
    "0-9 years": 0,
    "10-19 years": 0.2,
    "20-29 years": 0.2,
    "30-39 years": 0.2,
    "40-49 years": 0.4,
    "50-59 years": 1.3,
    "60-69 years": 3.6,
    "70-79 years": 8,
    "80+ years": 14.8,
  },
  {
    Country: "Italy",
    "0-9 years": 0,
    "10-19 years": 0,
    "20-29 years": 0,
    "30-39 years": 0.3,
    "40-49 years": 0.4,
    "50-59 years": 1,
    "60-69 years": 3.5,
    "70-79 years": 12.8,
    "80+ years": 20.2,
  },
];
