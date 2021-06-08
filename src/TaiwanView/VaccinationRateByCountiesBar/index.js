import React from "react";
import { useData } from "./useData";
import { BarChart } from "./BarChart";
import { LoadSpinner } from "../../elements/CommonUIs";
import { Collapsible } from "./Collapsible";

const ChartTitle = ({ title }) => <div className="chart-title">{title}</div>;

export const VaccinationRateByCountiesBar = () => {
  const data = useData();
  if (!data) return <LoadSpinner />;

  // Get only the latest data.
  const sortedData = data.sort((a, b) => b["日期"] - a["日期"]);
  const latestData = sortedData.filter(
    (obj, index, array) => obj["日期"].valueOf() === array[0]["日期"].valueOf()
  );
  // console.log(latestData);

  return (
    <>
      <ChartTitle title="台灣各縣市施打COVID-19疫苗統計" />
      <BarChart data={latestData} />
      <Collapsible id="caseFatalityRetes" />
    </>
  );
};
