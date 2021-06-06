import React from "react";
import { useData } from "./useData";
import { useTests } from "./useTests";
import { LoadSpinner } from "../../elements/CommonUIs";
import { Collapsible } from "./Collapsible";
import { PieTableLegendContainer } from "./PieTableLegendContainer.jsx";

const title = "COVID-19 台灣篩檢現況";
const ChartTitle = ({ title }) => <div className="chart-title">{title}</div>;

export const TaiwanTestsOverviewPie = () => {
  const data = useData();
  const testsData = useTests();
  if (!data || !testsData) return <LoadSpinner />;
  // console.log(data);
  // console.log(testsData);
  return (
    <>
      <ChartTitle title={title} />
      <PieTableLegendContainer data={data} testsData={testsData} />
      <Collapsible id={title} />
    </>
  );
};
