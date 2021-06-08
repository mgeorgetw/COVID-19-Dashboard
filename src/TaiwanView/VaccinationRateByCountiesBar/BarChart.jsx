import React, { useState, useMemo, useCallback } from "react";
import { scaleBand, scaleLinear, max, descending, timeFormat } from "d3";
import { NavBar } from "./NavBar";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { ColorLegend } from "./ColorLegend";
// import styles from "./BarChart.module.css";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.8 : width * 1.6;
const margin = { top: 0, right: 120, bottom: 45, left: 70 };

const formatDate = timeFormat("%Y/%-m/%-d");
const yValue = (d) => d.county;

// The chart's real height and width
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

// Legend settings
const legendRectSize = 15;
const legendItemSpacing = 26;
const legendX = width - margin.left;
const legendY = innerHeight - legendItemSpacing;
// const ColorLegendLabel = "疫苗現況";

const fadeOpacity = 0.3;

export const BarChart = ({ data }) => {
  const [hoveredValue, setHoveredValue] = useState(null);
  const [view, setView] = useState("rates");
  // console.log(data);

  const xValue1 = useMemo(
    () =>
      view === "rates"
        ? (d) => d.totalVaccinatedRate
        : (d) => d.totalVaccinated,
    [view]
  );

  const xValue2 = useMemo(
    () =>
      view === "rates" ? (d) => d.vaccinesCountRate : (d) => d.vaccinesCount,
    [view]
  );

  const xAxisTickFormat = useMemo(
    () =>
      view === "rates"
        ? (tickValue) => tickValue.toFixed(2) + "%"
        : (tickValue) => tickValue.toLocaleString(),
    [view]
  );

  const handleHover = useCallback(setHoveredValue, [setHoveredValue]);

  // X axis is percentage of vaccines, thus use linear scale
  const xScale = useMemo(
    () =>
      scaleLinear()
        // Domain is an array of actual data, starts from 0 to the max of all countries
        // d3.max(iterable[, accessor])
        .domain([0, max(data, xValue2)])
        // Range is where the data is shown in pixels, starts from 0 to chart's width
        .range([0, innerWidth])
        .nice(),
    [data, xValue2]
  );

  const yScale = useMemo(
    () =>
      scaleBand()
        .domain(
          data.sort((a, b) => descending(xValue2(a), xValue2(b))).map(yValue)
        )
        .range([0, innerHeight])
        .paddingInner(0.15),
    [data, xValue2]
  );

  return (
    <>
      <NavBar view={view} setView={setView} />
      <pre>資料更新時間：{formatDate(data[0].date)}</pre>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMid">
        {/* Adds margin to left and top  */}
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            innerHeight={innerHeight}
            xScale={xScale}
            tickFormat={xAxisTickFormat}
            tickOffset={8}
            tickCount={width > 480 ? 6 : 2}
          />
          <AxisLeft yScale={yScale} tickOffset={8} />
          <Marks
            data={data}
            xScale={xScale}
            xValue1={xValue1}
            xValue2={xValue2}
            yScale={yScale}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            onHover={handleHover}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
        </g>
        <g transform={`translate(${legendX}, ${legendY})`}>
          {/* <text className={styles.legendLabel} x={-7} y={-legendItemSpacing}> */}
          {/*   {ColorLegendLabel} */}
          {/* </text> */}
          <ColorLegend
            xScake={xScale}
            xValue1={xValue1}
            xValue2={xValue2}
            tickSpacing={legendItemSpacing}
            tickSize={legendRectSize}
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
