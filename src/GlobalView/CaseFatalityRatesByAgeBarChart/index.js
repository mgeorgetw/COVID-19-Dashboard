import React from "react";
import { useData } from "./useData";
import { BarChart } from "./BarChart";
import { LoadSpinner } from "../../elements/CommonUIs";
import { Collapsible } from "./Collapsible";

const ChartTitle = ({ title }) => <div className="chart-title">{title}</div>;

export const CaseFatalityRatesByAgeBarChart = () => {
  const data = useData();
  if (!data) return <LoadSpinner />;

  return (
    <>
      <ChartTitle title="Case fatality rates by age" />
      <BarChart data={data} />
      <Collapsible id="caseFatalityRetes" />
    </>
  );
};
