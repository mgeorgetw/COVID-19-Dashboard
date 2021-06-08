import React from "react";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { ChartTitle } from "./ChartTitle";
import { DataTable } from "./DataTable";
import { AreaChart } from "./AreaChart";
import { Collapsible } from "./Collapsible";

const sumValuesInObject = (data, key) =>
  data.reduce(
    (prev, cur) => prev + cur[key],
    0 // initialValue
  );

const title = "COVID-19 台灣每日新增確診案例數";

export const TaiwanNewCasesArea = () => {
  const data = useData();
  if (!data) return <LoadSpinner />;
  // if (data) console.log(data);

  const filteredData = data.filter(
    (obj) => obj.date.valueOf() >= new Date("2021-04-30").valueOf()
  );

  const sevenDayAvg = sumValuesInObject(data.slice(-7), "newCases") / 7;
  const prevSevenDayAvg =
    sumValuesInObject(data.slice(-14, -7), "newCases") / 7;

  const tableData = [
    {
      heading: "上週平均",
      value: Math.round(prevSevenDayAvg).toLocaleString(),
    },
    {
      heading: "本週平均",
      value: Math.round(sevenDayAvg).toLocaleString(),
    },
    {
      heading: "增長因數",
      value: (sevenDayAvg / prevSevenDayAvg).toFixed(2),
    },
  ];

  return (
    <>
      <ChartTitle title={title} />
      <DataTable items={tableData} />
      <AreaChart data={filteredData} />
      <Collapsible id={title} />
    </>
  );
};
