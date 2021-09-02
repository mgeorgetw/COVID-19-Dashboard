import React, { useState } from "react";
import { useRegions } from "./useRegions";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { ChartTitle } from "./ChartTitle";
import { DropdownMenu } from "./DropdownMenu";
import { DataTable } from "./DataTable";
import { LineChart } from "./LineChart";
import { Collapsible } from "./Collapsible";

const title = "Apple 導航使用趨勢在台灣";

export const TaiwanMobilityLine = () => {
  const [view, setView] = useState("All");
  const [loading, setLoading] = useState(true);
  const regions = useRegions();
  const data = useData(view, setLoading);
  // if (data) console.log(data[0]);
  if (!regions || !data || !data.length) return <LoadSpinner />;
  const filteredData = data.filter((obj) => obj.date >= new Date("2021-01-01"));

  const tableData = [
    {
      heading: "步行導航使用率",
      value:
        data[data.length - 1].walking >= 0
          ? "+" + data[data.length - 1].walking.toLocaleString() + "%"
          : data[data.length - 1].walking.toLocaleString() + "%",
    },
    {
      heading: "開車導航使用率",
      value:
        data[data.length - 1].driving >= 0
          ? "+" + data[data.length - 1].driving.toLocaleString() + "%"
          : data[data.length - 1].driving.toLocaleString() + "%",
    },
    {
      heading: "大眾交通導航使用率",
      value: data[data.length - 1].transit
        ? data[data.length - 1].transit >= 0
          ? "+" + data[data.length - 1].transit.toLocaleString() + "%"
          : data[data.length - 1].transit.toLocaleString() + "%"
        : "無資料",
    },
  ];

  return (
    <>
      <ChartTitle title={title} />
      <DropdownMenu
        dropdownItems={regions.subregions}
        chosen={view}
        setChosen={setView}
      />
      {loading ? (
        <LoadSpinner />
      ) : (
        <>
          <DataTable items={tableData} />
          <LineChart data={filteredData} />
        </>
      )}
      <pre>{`資料時間：${data[data.length - 1].date.toLocaleDateString(
        "zh-TW"
      )}`}</pre>
      <Collapsible id={title} />
    </>
  );
};
