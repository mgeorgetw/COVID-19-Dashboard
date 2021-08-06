import React, { useState } from "react";
import Select from "react-select";
import { useData } from "./useData";
import { useLocations } from "./useLocations";
import { LoadSpinner } from "../elements/CommonUIs";
import { ChartTitle } from "./ChartTitle";
import { DataTable } from "./DataTable";
import { AreaChart } from "./AreaChart";
// import { Collapsible } from "./Collapsible";

const sumValuesInObject = (data, key) =>
  data.reduce(
    (prev, cur) => prev + cur[key],
    0 // initialValue
  );

const NEW_CONFIRMED_API =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/new_cases.csv";

const NEW_DEATHS_API =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/jhu/new_deaths.csv";

export const NewCasesArea = () => {
  const [selected, setSelected] = useState("Japan");
  const new_confirmed_data = useData(NEW_CONFIRMED_API, selected);
  const new_deaths_data = useData(NEW_DEATHS_API, selected);
  const locations = useLocations();
  if (!new_confirmed_data || !new_deaths_data || !locations)
    return <LoadSpinner />;

  // Filter data for the lastest 90 days
  const filteredConfirmed = new_confirmed_data.filter(
    (obj) => obj.date.valueOf() >= new Date().valueOf() - 7776000000
  );
  const filteredDeaths = new_deaths_data.filter(
    (obj) => obj.date.valueOf() >= new Date().valueOf() - 7776000000
  );

  const sevenDayAvg =
    sumValuesInObject(new_confirmed_data.slice(-7), "newCases") / 7;
  const prevSevenDayAvg =
    sumValuesInObject(new_confirmed_data.slice(-14, -7), "newCases") / 7;

  const title = `COVID-19 Daily New Cases in ${selected}`;

  const tableData = [
    {
      heading: "Last week avg*",
      value: Math.round(prevSevenDayAvg).toLocaleString(),
    },
    {
      heading: "This week avg*",
      value: Math.round(sevenDayAvg).toLocaleString(),
    },
    {
      heading: "Growth factor",
      value: (sevenDayAvg / prevSevenDayAvg).toFixed(2),
    },
  ];

  return (
    <>
      <ChartTitle title={title} />
      <Select
        options={locations}
        onChange={(e) => setSelected(e.value)}
        placeholder={"Select a region"}
      />
      <DataTable items={tableData} />
      <AreaChart dataTop={filteredConfirmed} dataDown={filteredDeaths} />
      <p className="footnote">* Averages of newly infected cases</p>
      {/* <Collapsible id={title} /> */}
    </>
  );
};
