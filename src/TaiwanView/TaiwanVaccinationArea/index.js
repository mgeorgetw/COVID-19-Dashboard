import React from "react";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { ChartTitle } from "./ChartTitle";
import { DataTable } from "./DataTable";
import { AreaChart } from "./AreaChart";
import { Collapsible } from "./Collapsible";

const title = "台灣 COVID-19 疫苗接種人次";

export const TaiwanVaccinationArea = () => {
  const data = useData();
  if (!data) return <LoadSpinner />;
  // if (data) console.log(data);

  const tableData = [
    {
      heading: "疫苗總數",
      value: data[data.length - 1].total_vaccinations.toLocaleString(),
    },
    {
      heading: "已接種人數",
      value: data[data.length - 1].people_vaccinated.toLocaleString(),
    },
    {
      heading: "充分接種人數",
      value: data[data.length - 1].people_fully_vaccinated.toLocaleString(),
    },
  ];

  return (
    <>
      <ChartTitle title={title} />
      <DataTable items={tableData} />
      <AreaChart data={data} />
      <Collapsible id={title} />
    </>
  );
};
