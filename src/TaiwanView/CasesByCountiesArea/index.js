import React, { useState } from "react";
import { group, stack, stackOffsetWiggle, stackOrderAscending } from "d3";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { ChartTitle } from "./ChartTitle";
import { AreaChart } from "./AreaChart";
import { Collapsible } from "./Collapsible";

const title = "COVID-19 台灣各地區每日新增確診案例數比較";

export const CasesByCountiesArea = () => {
  const [view, setView] = useState("全台灣");
  const rawData = useData();

  if (!rawData || !rawData.length) return <LoadSpinner />;

  const dataFilteredByDistricts =
    view === "全台灣"
      ? rawData.filter((d) => d["區域"] === "全區")
      : rawData.filter((d) => d["縣市別"] === view);

  const newCasesByDistrictsStacked = stack()
    /**
     * Shifts the baseline so as to minimize the weighted wiggle of layers.
     * This offset is recommended for streamgraphs in conjunction with the inside-out order.
     */
    .offset(stackOffsetWiggle)
    .order(stackOrderAscending)
    .keys(getDistrictsNames)(getTransformedData());

  function getDistrictsNames() {
    const layer = view === "全台灣" ? (d) => d["縣市別"] : (d) => d["區域"];
    const layerGroupedData = group(dataFilteredByDistricts, layer);
    const names =
      view === "全台灣"
        ? Array.from(layerGroupedData.keys())
        : Array.from(layerGroupedData.keys()).splice(1); // Remove '全區'
    return names;
  }

  function getTransformedData() {
    let dataArray = [];
    const groupedData = group(dataFilteredByDistricts, (d) => d["日期"]);
    for (let date of groupedData.keys()) {
      let obj = { 日期: date };
      const dailyDistricsData = groupedData.get(date);
      view === "全台灣"
        ? dailyDistricsData.map(
            ({ 縣市別, 新增確診人數 }) => (obj[縣市別] = 新增確診人數)
          )
        : dailyDistricsData.map(
            ({ 區域, 新增確診人數 }) => (obj[區域] = 新增確診人數)
          );
      dataArray.push(obj);
    }
    return dataArray;
  }

  return (
    <>
      <ChartTitle title={title} />
      <AreaChart
        data={dataFilteredByDistricts}
        stackedData={newCasesByDistrictsStacked}
        view={view}
        setView={setView}
      />
      <Collapsible id={title} />
    </>
  );
};
