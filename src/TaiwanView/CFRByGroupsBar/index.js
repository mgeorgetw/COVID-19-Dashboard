import React, { useState } from "react";
import { useDeaths } from "./useDeaths";
import { useInfected } from "./useInfected";
import { NavBar } from "./NavBar";
import { BarChart } from "./BarChart";
import { LoadSpinner } from "../../elements/CommonUIs";
import { Collapsible } from "./Collapsible";

const ChartTitle = ({ title }) => <div className="chart-title">{title}</div>;

export const CFRByGroupsBar = () => {
  const [view, setView] = useState("age");
  const deathsData = useDeaths();
  const infectedData = useInfected();
  console.log(deathsData, infectedData);

  if (!deathsData || !infectedData) return <LoadSpinner />;
  // console.log(infectedData);
  // console.log(deathsData);

  const infected = view === "age" ? infectedData.age : infectedData.gender;
  const deaths = view === "age" ? deathsData.age : deathsData.gender;

  const data = Object.keys(infected).map((key) => ({
    age: key,
    CFR: deaths[key] / infected[key],
    confirmed: infected[key],
    deaths: deaths[key],
  }));

  return (
    <>
      <ChartTitle title="COVID-19 台灣染疫死亡率" />
      <NavBar view={view} setView={setView} />
      <BarChart data={data} />
      <Collapsible id="CFRByGroupsinTaiwan" />
    </>
  );
};
