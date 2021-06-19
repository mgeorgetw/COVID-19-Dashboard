import React, { useState, useMemo } from "react";
import { arc, pie, scaleOrdinal } from "d3";
import styles from "./OverviewPie.module.css";
import { ColorLegend } from "./ColorLegend";
import { DataTable } from "./DataTable";
import { PieChart } from "./PieChart";
import { PieLabels } from "./PieLabels";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.7 : width * 0.8;

const pieRadius = (width * 0.66) / 2;
const pieOuterMargin = pieRadius * 0.7;

const legendCircleRadius = 8;
const legendItemSpacing = 26;
const legendX = width * 0.66;
const legendY = pieRadius - legendItemSpacing / 2;

const fadeOpacity = 0.3;

const pieArc = arc().innerRadius(0).outerRadius(pieOuterMargin);

const dataType = (d) => d.case;
const dataValue = (d) => d.value;
const colorValue = (d) => d.color;

const ColorLegendLabel = "篩檢現況";

export const PieTableLegendContainer = ({ data, testsData }) => {
  const [hoveredValue, setHoveredValue] = useState(null);

  const tableData = [
    {
      case: "累計檢驗件數",
      value: testsData.tests,
    },
    {
      case: "累計通報件數",
      value: data.tests,
    },
    {
      case: "昨日通報件數",
      value: data.testsYesterday,
    },
  ];

  const pieData = useMemo(
    () => [
      {
        case: "檢驗未通報",
        value: testsData.tests - data.tests,
        color: "#E5E2E0",
      },
      {
        case: "通報確診",
        value: data.confirmed,
        color: "#005D6E",
      },
      {
        case: "通報排除",
        value: data.excluded,
        color: "#42A5B3",
      },
      {
        case: "通報待確認",
        value: data.tests - data.excluded - data.confirmed,
        color: "#BD2D28",
      },
    ],
    [data, testsData]
  );

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
      <DataTable items={tableData} dataType={dataType} dataValue={dataValue} />
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
          <PieLabels
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
    </>
  );
};
