import React, { useState } from "react";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { PieTableLegendContainer } from "./PieTableLegendContainer";
import { Collapsible } from "./Collapsible";

const title = "COVID-19 台灣染疫現況";
const ChartTitle = ({ title }) => <div className="chart-title">{title}</div>;

export const TaiwanOverviewPie = () => {
  const [view] = useState("condition");
  const data = useData();
  if (!data) return <LoadSpinner />;

  const viewData = (({ active, deaths, recovered }) => ({
    解除隔離: recovered,
    病中: active,
    死亡: deaths,
  }))(data);
  return (
    <>
      <ChartTitle title={title} />
      {/*
        <NavBar view={view} setView={setView} />
      */}
      <PieTableLegendContainer data={viewData} view={view} />
      <Collapsible id={title} />
    </>
  );
};
