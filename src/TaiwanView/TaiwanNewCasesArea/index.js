import React from "react";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { ChartTitle } from "./ChartTitle";
import { DataTable } from "./DataTable";
import { AreaChart } from "./AreaChart";
import { Collapsible } from "./Collapsible";
import { sumValuesInObject } from "../../utils/helper";

const title = "COVID-19 台灣每日新增案例數";

const NEW_CONFIRMED_API =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/new_cases.csv";

const NEW_DEATHS_API =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/new_deaths.csv";

export const TaiwanNewCasesArea = () => {
  const new_confirmed_data = useData(NEW_CONFIRMED_API);
  const new_deaths_data = useData(NEW_DEATHS_API);
  if (
    !new_confirmed_data ||
    !new_confirmed_data.length ||
    !new_deaths_data ||
    !new_deaths_data.length
  )
    return <LoadSpinner />;

  const filteredConfirmed = new_confirmed_data.filter(
    (obj) => obj.date.valueOf() >= new Date("2021-04-30").valueOf()
  );
  const filteredDeaths = new_deaths_data.filter(
    (obj) => obj.date.valueOf() >= new Date("2021-04-30").valueOf()
  );

  const sevenDayAvg =
    sumValuesInObject(new_confirmed_data.slice(-7), "newCases") / 7;
  const prevSevenDayAvg =
    sumValuesInObject(new_confirmed_data.slice(-14, -7), "newCases") / 7;

  const tableData = [
    {
      heading: "上週平均確診",
      value: Math.round(prevSevenDayAvg).toLocaleString(),
    },
    {
      heading: "本週平均確診",
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
      <AreaChart dataTop={filteredConfirmed} dataDown={filteredDeaths} />
      <Collapsible id={title} />
    </>
  );
};
