import React from "react";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { ChartTitle } from "./ChartTitle";
import { DataTable } from "./DataTable";
import { LineChart } from "./LineChart";
import { Collapsible } from "./Collapsible";

const sumValuesInObject = (data, key) =>
  data.reduce(
    (prev, cur) => prev + cur[key],
    0 // initialValue
  );

const title = "台灣每日新增確診案例數";

export const TaiwanCasesLineChart = () => {
  const data = useData();
  if (!data) return <LoadSpinner />;
  // if (data) console.log(data);
  const lastSevenDaysAvg = sumValuesInObject(data.slice(-7), "newCases") / 7;

  const beforeSevenDaysAvg =
    sumValuesInObject(data.slice(-14, -7), "newCases") / 7;

  const tableData = [
    {
      heading: "上週平均",
      value: Math.round(beforeSevenDaysAvg).toLocaleString(),
    },
    {
      heading: "本週平均",
      value: Math.round(lastSevenDaysAvg).toLocaleString(),
    },
    {
      heading: "增長因數",
      value: (lastSevenDaysAvg / beforeSevenDaysAvg).toFixed(2),
    },
  ];

  return (
    <>
      <ChartTitle title={title} />
      <DataTable items={tableData} />
      <LineChart data={data} />
      <Collapsible id={title} />
    </>
  );
};
