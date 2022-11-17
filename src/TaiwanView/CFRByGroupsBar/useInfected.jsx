import { useState, useEffect } from "react";
import { fetchAndBypassCORS } from "../../utils/dataFetcher";

const API =
  "https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5001&limited=全部縣市";

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
    d.date = new Date(d.a02);
    d.county = d.a03;
    d.area = d.a04;
    d.gender = d.a05;
    d.foreign = d.a06;
    d.ageGroup = d.a07;
    return d;
  });

// Data: Detailed Covid-19 cases in Taiwan
export const useInfected = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);
  useEffect(() => {
    let isMounted = true;
    fetchAndBypassCORS(API).then((rawData) => {
      // console.log("json data", transformData(rawData));
      if (isMounted) {
        const transformedData = transformData(rawData);
        const infectedByGender = countGroups(transformedData, "gender");
        const infectedByAge = countGroups(transformedData, "ageGroup");
        const sortedInfectedByAge = ((obj) => ({
          "0-9":
            obj["0"] + obj["1"] + obj["2"] + obj["3"] + obj["4"] + obj["5-9"],
          "10-19": obj["10-14"] + obj["15-19"],
          "20-29": obj["20-24"] + obj["25-29"],
          "30-39": obj["30-34"] + obj["35-39"],
          "40-49": obj["40-44"] + obj["45-49"],
          "50-59": obj["50-54"] + obj["55-59"],
          "60-69": obj["60-64"] + obj["65-69"],
          "70+": obj["70+"],
        }))(infectedByAge);

        setData({ age: sortedInfectedByAge, gender: infectedByGender });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return data;
};
