import React, { useState } from "react";
import { useData } from "./useData";
import { useCategories } from "./useCategories";
import { LoadSpinner } from "../../elements/CommonUIs";
import { NavBar } from "./NavBar";
import { PieTableLegendContainer } from "./PieTableLegendContainer";
import { Collapsible } from "./Collapsible";

const title = "COVID-19 台灣染疫現況";

const ChartTitle = ({ title }) => <div className="chart-title">{title}</div>;

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

export const TaiwanOverviewPie = () => {
  const [view, setView] = useState("condition");
  const data = useData();
  const categoriesData = useCategories();
  if (!data || !categoriesData) return <LoadSpinner />;
  // console.log(data);
  // console.log(categoriesData);

  let viewData;
  switch (view) {
    case "condition":
      viewData = (({ active, deaths, recovered }) => ({
        解除隔離: recovered,
        病中: active,
        死亡: deaths,
      }))(data);
      break;
    case "gender":
      viewData = countGroups(categoriesData, "gender");
      break;
    case "age":
      let oriGroups = countGroups(categoriesData, "ageGroup");
      viewData = ((obj) => ({
        "0-9":
          obj["0"] + obj["1"] + obj["2"] + obj["3"] + obj["4"] + obj["5-9"],
        "10-19": obj["10-14"] + obj["15-19"],
        "20-29": obj["20-24"] + obj["25-29"],
        "30-39": obj["30-34"] + obj["35-39"],
        "40-49": obj["40-44"] + obj["45-49"],
        "50-59": obj["50-54"] + obj["55-59"],
        "60-69": obj["60-64"] + obj["65-69"],
        "70+": obj["70+"],
      }))(oriGroups);
      break;
    default:
      viewData = data;
      break;
  }
  return (
    <>
      <ChartTitle title={title} />
      <NavBar view={view} setView={setView} />
      <PieTableLegendContainer data={viewData} view={view} />
      <Collapsible id={title} />
    </>
  );
};
