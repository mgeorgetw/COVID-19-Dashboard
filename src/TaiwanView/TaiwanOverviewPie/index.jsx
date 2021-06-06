import React from "react";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { PieTableLegendContainer } from "./PieTableLegendContainer";
import { Collapsible } from "./Collapsible";

const title = "COVID-19 台灣染疫現況";

const ChartTitle = ({ title }) => <div className="chart-title">{title}</div>;

export const TaiwanOverviewPie = () => {
  const data = useData();
  if (!data) return <LoadSpinner />;
  // console.log(data);
  return (
    <>
      <ChartTitle title={title} />
      <PieTableLegendContainer data={data} />
      <Collapsible id={title} />
    </>
  );
};
