import React, { useState } from "react";
import { arc, pie, scaleOrdinal } from "d3";
import styles from "./OverviewPie.module.css";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { ColorLegend } from "./ColorLegend";
import { DataTable } from "./DataTable";
import { PieChart } from "./PieChart";
import { Collapsible } from "./Collapsible";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.6 : width * 0.7;
const pieRadius = (width * 0.66) / 2;
const pieOuterMargin = pieRadius * 0.7;

const legendCircleRadius = 8;
const legendItemSpacing = 26;
const fadeOpacity = 0.3;

const legendX = width * 0.66;
const legendY = height / 2;

const pieArc = arc().innerRadius(0).outerRadius(pieOuterMargin);

const dataType = (d) => d.case;
const dataValue = (d) => d.value;
const colorValue = (d) => d.color;

const title = "Worldwide Cases Overview";
const ColorLegendLabel = "Cases";

export const OverviewPie = () => {
  const [hoveredValue, setHoveredValue] = useState(null);

  const data = useData();
  if (!data) return <LoadSpinner />;
  // if (data) console.log(data);
  const pieData = [
    {
      case: "Deaths",
      value: data.deaths,
      color: "#BD2D28",
    },
    {
      case: "Recovered",
      value: data.recovered,
      color: "#6BBBA1",
    },
    {
      case: "Active",
      value: data.active,
      color: "#E25A42",
    },
  ];
  const colorPie = pie().sort(null).value(dataValue);

  const colorScale = scaleOrdinal()
    .domain(pieData.map(dataType))
    .range(pieData.map(colorValue));

  const ChartTitle = ({ title }) => <div className="chart-title">{title}</div>;

  const SourceCredit = () => (
    <p className="footnote">
      Data source: Worldometers (
      <a href="https://github.com/disease-sh/api">disease.sh</a>)
    </p>
  );

  return (
    <>
      <ChartTitle title={title} />
      <DataTable items={pieData} dataType={dataType} dataValue={dataValue} />
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMid">
        <g transform={`translate(${pieRadius},${height / 2})`}>
          <PieChart
            pieData={pieData}
            colorPie={colorPie}
            colorValue={colorValue}
            pieArc={pieArc}
            dataType={dataType}
            dataValue={dataValue}
            onHover={setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
        </g>
        <g transform={`translate(${legendX}, ${legendY})`}>
          <text className={styles.legendLabel} x={-7} y={-legendItemSpacing}>
            {ColorLegendLabel}
          </text>
          <ColorLegend
            colorScale={colorScale}
            tickSpacing={legendItemSpacing}
            tickSize={legendCircleRadius}
            tickTextOffset={16}
            onHover={setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
        </g>
      </svg>
      <Collapsible id={title}>
        <p>
          This chart gives a rough overview of COVID-19 pandemic currently
          spreading around the world. The total number at the top left corner
          shows a number of confirmed cases ever tested positive. Since not
          everyone has been tested, this can only represent the cases we know so
          far.
        </p>
        <p>
          All tested positive cases are further divided into three categories as
          shown in the pie chart: active, recovered, and deaths. The recovered
          percentage is intended to give us an idea of how far we are from
          global recovery. The "clock", however, can turn back when the virus is
          spreading rapidly. Active cases represents the people still suffering
          from the disease. Most active cases will recover, but some will not.
          According to{" "}
          <a href="https://www.nytimes.com/interactive/2020/world/asia/china-coronavirus-contain.html">
            an early report{" "}
          </a>
          by <i>the New York Times</i>, the fatality rate for those infected is
          likely to be lower than 3%.
        </p>
        <SourceCredit />
      </Collapsible>
    </>
  );
};
