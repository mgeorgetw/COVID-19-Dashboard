import React from "react";
import { useData } from "./useData";
import { BarChart } from "./BarChart";
import { LoadSpinner } from "../../elements/CommonUIs";
import { Collapsible } from "./Collapsible";

const ChartTitle = ({ title }) => <div className="chart-title">{title}</div>;

export const VaccinationRateByCountiesBar = () => {
  const data = useData();
  if (!data || !data.length) return <LoadSpinner />;

  // Get only the latest data.
  const sortedData = data.sort((a, b) => b.date - a.date);
  const latestData = sortedData.filter(
    (obj, index, array) => obj.date.valueOf() === array[0].date.valueOf()
  );
  // console.log(latestData);

  return (
    <>
      <ChartTitle title="台灣各縣市施打COVID-19疫苗統計" />
      <BarChart data={latestData} />
      <Collapsible id="vaccinesByCounties" />
    </>
  );
};
