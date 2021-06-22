import React from "react";
import { useDeaths } from "./useDeaths";
import { useInfected } from "./useInfected";
import { BarChart } from "./BarChart";
import { LoadSpinner } from "../../elements/CommonUIs";
import { Collapsible } from "./Collapsible";

const ChartTitle = ({ title }) => <div className="chart-title">{title}</div>;

export const CFRByAgeGroupBar = () => {
  const deathsData = useDeaths();
  const infectedData = useInfected();
  if (!deathsData || !infectedData) return <LoadSpinner />;
  // console.log(infectedData);
  // console.log(deathsData);

  const data = Object.keys(infectedData).map((key) => ({
    age: key,
    CFR: deathsData[key] / infectedData[key],
    confirmed: infectedData[key],
    deaths: deathsData[key],
  }));

  return (
    <>
      <ChartTitle title="COVID-19 台灣各年齡層染疫死亡率" />
      <BarChart data={data} />
      <Collapsible id="CFRByAgeinTaiwan" />
    </>
  );
};
