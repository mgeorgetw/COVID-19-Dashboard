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
  if (!data || !data.length) return <LoadSpinner />;
  // if (!data || !data[data.length - 1].people_vaccinated) return <LoadSpinner />;
  // if (data) console.log(data[data.length - 1]);

  const tableData = [
    {
      heading: "接種人次總計",
      value: data[data.length - 1].total_vaccinations.toLocaleString(),
    },
    {
      heading: "已接種一劑",
      value: data[data.length - 1].people_vaccinated.toLocaleString(),
    },
    {
      heading: "已接種二劑",
      value: data[data.length - 1].people_fully_vaccinated.toLocaleString(),
    },
    {
      heading: "追加第三劑",
      value: data[data.length - 1].total_boosters.toLocaleString(),
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
