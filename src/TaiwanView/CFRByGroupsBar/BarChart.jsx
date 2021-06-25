import React, { useState, useMemo, useCallback } from "react";
import { scaleBand, scaleLinear, max, format } from "d3";
// import { NavBar } from "./NavBar";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
// import { ColorLegend } from "./ColorLegend";
// import styles from "./BarChart.module.css";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.6 : width * 1;
const margin = { top: 5, right: 120, bottom: 45, left: 60 };

// const formatDate = timeFormat("%Y/%-m/%-d");
const yValue = (d) => d.age;
const xValue = (d) => d.CFR;

const xAxisTickFormat = (tickValue) => format("~%")(tickValue);
const labelFormat = format(".2%");

// The chart's real height and width
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

// Legend settings
// const legendRectSize = 15;
// const legendItemSpacing = 26;
// const legendX = width - margin.left;
// const legendY = innerHeight - legendItemSpacing;
// const ColorLegendLabel = "疫苗現況";

const fadeOpacity = 0.3;

export const BarChart = ({ data }) => {
  const [hoveredValue, setHoveredValue] = useState(null);
  // console.log(data);
  const handleHover = useCallback(setHoveredValue, [setHoveredValue]);

  // X axis is percentage of vaccines, thus use linear scale
  const xScale = useMemo(
    () =>
      scaleLinear()
        // Domain is an array of actual data, starts from 0 to the max of all countries
        // d3.max(iterable[, accessor])
        .domain([0, max(data, xValue)])
        // Range is where the data is shown in pixels, starts from 0 to chart's width
        .range([0, innerWidth])
        .nice(),
    [data]
  );

  const yScale = useMemo(
    () =>
      scaleBand()
        .domain(data.map((d) => yValue(d)))
        .range([0, innerHeight])
        .paddingInner(0.3),
    [data]
  );

  return (
    <>
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
            margin={margin}
            innerWidth={innerWidth}
            xScale={xScale}
            xValue={xValue}
            yScale={yScale}
            yValue={yValue}
            tooltipFormat={labelFormat}
            onHover={handleHover}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
        </g>
        {/* <g transform={`translate(${legendX}, ${legendY})`}> */}
        {/*   <text className={styles.legendLabel} x={-7} y={-legendItemSpacing}> */}
        {/*     {ColorLegendLabel} */}
        {/*   </text> */}
        {/*   <ColorLegend */}
        {/*     xScake={xScale} */}
        {/*     xValue1={xValue1} */}
        {/*     xValue2={xValue2} */}
        {/*     tickSpacing={legendItemSpacing} */}
        {/*     tickSize={legendRectSize} */}
        {/*     tickTextOffset={16} */}
        {/*     onHover={setHoveredValue} */}
        {/*     hoveredValue={hoveredValue} */}
        {/*     fadeOpacity={fadeOpacity} */}
        {/*   /> */}
        {/* </g> */}
      </svg>
    </>
  );
};
