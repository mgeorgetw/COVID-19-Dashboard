import { useState, useEffect } from "react";
import { json } from "d3";

const CORS = "https://morning-wave-49482.herokuapp.com/";
// 死亡案例分項統計
const API =
  "https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=4002";
const jsonUrl = CORS + API;

const countGroups = (array, group) => {
  const uniqueGroups = Array.from(new Set(array.map((obj) => obj[group])));
  let groupObj = {};
  uniqueGroups.forEach((g) => {
    groupObj[g] = array.reduce(
      (counter, obj) => (obj[group] === g ? (counter += 1) : counter),
      0
    );
  });
  return groupObj;
};

const transformData = (rawData) =>
  rawData.map((d) => {
    d.date = new Date(d.a01);
    d.gender = d.a03;
    d.ageGroup = d.a04;
    d.chronic = d.a05;
    return d;
  });

// Data: Detailed Covid-19 cases in Taiwan
export const useDeaths = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);
  useEffect(() => {
    let isMounted = true;
    json(jsonUrl).then((rawData) => {
      // console.log("json data", transformData(rawData));
      if (isMounted) {
        const transformedData = transformData(rawData);
        const deathsByGender = countGroups(transformedData, "gender");
        const deathsByAge = countGroups(transformedData, "ageGroup");
        const sortedDeathsByAge = ((obj) => ({
          "0-9": obj["0"] ? obj["0"] : 0,
          "10-19": obj["10"] ? obj["10"] : 0,
          "20-29": obj["20"] ? obj["20"] : 0,
          "30-39": obj["30"],
          "40-49": obj["40"],
          "50-59": obj["50"],
          "60-69": obj["60"],
          "70+": obj["70"] + obj["80"] + obj["90"] + obj["100"],
        }))(deathsByAge);

        setData({ age: sortedDeathsByAge, gender: deathsByGender });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
