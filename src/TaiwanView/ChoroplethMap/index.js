import { useState } from "react";
import { useTaiwanAtlas } from "./useTaiwanAtlas";
import { LoadSpinner } from "../../elements/CommonUIs";
import { useData } from "./useData";
import { Map } from "./Map";

const title = "COVID-19 台灣累計病例分佈圖";
const ChartTitle = ({ title }) => <div className="chart-title">{title}</div>;

export const ChoroplethMap = () => {
  const [view, setView] = useState("全台灣");
  const taiwanAtlas = useTaiwanAtlas();
  const rawData = useData();

  if (!rawData || !taiwanAtlas) return <LoadSpinner />;

  return (
    <>
      <ChartTitle title={title} />
      <Map view={view} atlas={taiwanAtlas} data={rawData} />
    </>
  );
};
