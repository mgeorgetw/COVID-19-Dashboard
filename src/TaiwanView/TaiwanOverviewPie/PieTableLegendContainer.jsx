import React, { useState, useMemo } from "react";
import { arc, pie, scaleOrdinal, schemeTableau10 } from "d3";
import styles from "./OverviewPie.module.css";
import { ColorLegend } from "./ColorLegend";
import { DataTable } from "./DataTable";
import { PieChart } from "./PieChart";
import { PieLabels } from "./PieLabels";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.6 : width * 0.7;

const pieRadius = (width * 0.66) / 2;
const pieOuterMargin = pieRadius * 0.7;
const pieInnerMargin = pieRadius * 0.25;

const legendX = width * 0.66;
const legendCircleRadius = 8;
const legendItemSpacing = 26;
const legendY = legendItemSpacing * 2;

const fadeOpacity = 0.3;

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(pieOuterMargin)
  .innerRadius(pieInnerMargin);

const dataType = (d) => d.case;
const dataValue = (d) => d.value;

const colorLegendLabel = "案例別";

export const PieTableLegendContainer = ({ data, view }) => {
  const [hoveredValue, setHoveredValue] = useState(null);
  const pieData = useMemo(
    () =>
      Object.keys(data).map((key) => ({
        case: key,
        value: data[key],
      })),
    [data]
  );
  // console.log(pieData);

  let pieCenterLabel;
  switch (view) {
    case "condition":
      pieCenterLabel = "況";
      break;
    case "age":
      pieCenterLabel = "年";
      break;
    case "gender":
      pieCenterLabel = "性";
      break;
    default:
      pieCenterLabel = "";
      break;
  }
  const colorPie = useMemo(() => pie().sort(null).value(dataValue), []);

  const colorScale = useMemo(
    () => scaleOrdinal().domain(pieData.map(dataType)).range(schemeTableau10),
    [pieData]
  );

  return (
    <>
      <DataTable items={pieData} dataType={dataType} dataValue={dataValue} />
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMid">
        <g transform={`translate(${pieRadius},${height / 2})`}>
          <text
            dominantBaseline="middle"
            textAnchor="middle"
            dy=".1em"
            fontSize={pieInnerMargin}
            fontWeight="bold"
          >
            {pieCenterLabel}
          </text>
          <PieChart
            pieData={pieData}
            colorPie={colorPie}
            colorScale={colorScale}
            pieArc={pieArc}
            dataType={dataType}
            onHover={setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
          <PieLabels
            pieData={pieData}
            colorPie={colorPie}
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
            {colorLegendLabel}
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
    </>
  );
};
