import React, { useState } from "react";
import { group, stack, stackOffsetWiggle, stackOrderAscending } from "d3";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { ChartTitle } from "./ChartTitle";
// import { DataTable } from "./DataTable";
import { AreaChart } from "./AreaChart";
import { Collapsible } from "./Collapsible";

const title = "COVID-19 台灣各地區每日新增確診案例數比較";

const transformData = (data, view) => {
  let dataArray = [];
  const groupedData = group(data, (d) => d["日期"]);
  for (let date of groupedData.keys()) {
    let obj = { date: date };
    const dailyCountiesData = groupedData.get(date);
    if (view === "全台灣") {
      dailyCountiesData.map(
        ({ 縣市別, 新增確診人數 }) => (obj[縣市別] = 新增確診人數)
      );
    } else {
      dailyCountiesData.map(
        ({ 區域, 新增確診人數 }) => (obj[區域] = 新增確診人數)
      );
    }
    dataArray.push(obj);
  }
  return dataArray;
};

export const CasesByCountiesArea = () => {
  const [view, setView] = useState("全台灣");
  const rawData = useData();

  if (!rawData || !rawData.length) return <LoadSpinner />;
  // if (rawData) console.log(rawData);

  const filteredData =
    view === "全台灣"
      ? rawData.filter((d) => d["區域"] === "全區")
      : rawData.filter((d) => d["縣市別"] === view);

  const layer = view === "全台灣" ? (d) => d["縣市別"] : (d) => d["區域"];
  const layerGroupedData = group(filteredData, layer);
  const layers =
    view === "全台灣"
      ? Array.from(layerGroupedData.keys())
      : Array.from(layerGroupedData.keys()).splice(1);

  const transformedData = transformData(filteredData, view);

  const stackedData = stack()
    .offset(stackOffsetWiggle)
    .order(stackOrderAscending)
    .keys(layers)(transformedData);

  return (
    <>
      <ChartTitle title={title} />
      {/* <DataTable items={tableData} /> */}
      <AreaChart
        data={filteredData}
        stackedData={stackedData}
        view={view}
        setView={setView}
      />
      <Collapsible id={title} />
    </>
  );
};
