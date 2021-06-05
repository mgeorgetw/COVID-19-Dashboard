import React, { useState, useMemo } from "react";
import { arc, pie, scaleOrdinal } from "d3";
import styles from "./OverviewPie.module.css";
import { ColorLegend } from "./ColorLegend";
import { DataTable } from "./DataTable";
import { PieChart } from "./PieChart";
import { PieLabels } from "./PieLabels";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width * 0.6;
const pieMargin = { top: 0, right: 20, bottom: 0, left: 0 };
const pieRadius = (width * 0.66) / 2;
const pieOuterMargin = pieRadius * 0.7;

const circleRadius = 8;
const legendItemSpacing = 26;
const fadeOpacity = 0.3;

// // The chart's real height and width
const pieX = pieRadius + pieMargin.left;
const pieY = pieRadius + pieMargin.top;
const legendX = pieRadius * 2 + pieMargin.left + pieMargin.right;
const legendY = pieRadius - legendItemSpacing / 2;

const pieArc = arc().innerRadius(0).outerRadius(pieOuterMargin);

const dataType = (d) => d.case;
const dataValue = (d) => d.value;
const colorValue = (d) => d.color;

const ColorLegendLabel = "案例別";

export const PieWithTableAndLegend = ({ data }) => {
  const [hoveredValue, setHoveredValue] = useState(null);

  const pieData = [
    {
      case: "解除隔離",
      value: data.recovered,
      color: "#42A5B3",
    },
    {
      case: "病中",
      value: data.confirmed - data.recovered - data.deaths,
      color: "#E3BA22",
    },
    {
      case: "死亡",
      value: data.deaths,
      color: "#BD2D28",
    },
  ];
  const colorPie = useMemo(() => pie().sort(null).value(dataValue), []);

  const colorScale = useMemo(
    () =>
      scaleOrdinal()
        .domain(pieData.map(dataType))
        .range(pieData.map(colorValue)),
    [pieData]
  );

  return (
    <>
      <DataTable items={pieData} dataType={dataType} dataValue={dataValue} />
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMid">
        <g transform={`translate(${pieX},${pieY})`}>
          <PieChart
            pieData={pieData}
            colorPie={colorPie}
            colorValue={colorValue}
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
            {ColorLegendLabel}
          </text>
          <ColorLegend
            colorScale={colorScale}
            tickSpacing={legendItemSpacing}
            tickSize={circleRadius}
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
