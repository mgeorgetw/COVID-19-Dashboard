import React, { useState } from "react";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { NavBar } from "./NavBar";
import { ChartTitle } from "./ChartTitle";
import { DataTable } from "./DataTable";
import { AreaChart } from "./AreaChart";
import { Collapsible } from "./Collapsible";

const sumValuesInObject = (data, key) =>
  data.reduce(
    (prev, cur) => prev + cur[key],
    0 // initialValue
  );

const title = "COVID-19 台灣每日新增案例數";

const NEW_CONFIRMED_API =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/new_cases.csv";

const NEW_DEATHS_API =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/new_deaths.csv";

export const TaiwanNewCasesArea = () => {
  const [view, setView] = useState("confirmed");

  const csvUrl = view === "confirmed" ? NEW_CONFIRMED_API : NEW_DEATHS_API;
  const data = useData(csvUrl);
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
      <NavBar view={view} setView={setView} />
      <DataTable items={tableData} />
      <AreaChart data={filteredData} />
      <Collapsible id={title} />
    </>
  );
};
