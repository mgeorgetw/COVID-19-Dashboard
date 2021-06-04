import React, { useState, useMemo } from "react";
import { scaleBand, scaleLinear, scaleOrdinal, max, schemeTableau10 } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
// import { ColorLegend } from "./ColorLegend";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.9 : width * 2;
const margin = { top: 20, right: 40, bottom: 30, left: 170 };

const countryValue = (d) => d.Country;
const xAxisTickFormat = (tickValue) => tickValue + "%";

// The chart's real height and width
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

// Legend settings
// const legendX = width * 0.7;
// const legendY = innerHeight / 2;
// const ColorLegendLabel = "Countries";

// const circleRadius = 8;
// const legendItemSpacing = 26;
const fadeOpacity = 0.3;

export const BarChart = ({ data }) => {
  const [hoveredValue, setHoveredValue] = useState(null);
  const ageGroups = data.columns.slice(1);

  // X axis is percentage of deaths, thus use linear scale
  const xScale = useMemo(
    () =>
      scaleLinear()
        // Domain is an array of actual data, starts from 0 to the max of all countries
        // d3.max(iterable[, accessor])
        .domain([0, max(data, (d) => max(ageGroups, (key) => d[key]))])
        // Range is where the data is shown in pixels, starts from 0 to chart's width
        .range([0, innerWidth])
        .nice(),
    [ageGroups, data]
  );

  const ageScale = useMemo(
    () =>
      scaleBand().domain(ageGroups).range([0, innerHeight]).paddingInner(0.15),
    [ageGroups]
  );

  // Y is countries is categorical, band scale is for ordinal or categorical dimension
  const countryScale = useMemo(
    () =>
      scaleBand()
        .domain(data.map(countryValue))
        .range([ageScale.bandwidth(), 0])
        .paddingInner(0.1),
    [ageScale, data]
  );

  const colorScale = useMemo(
    () => scaleOrdinal().domain(data.map(countryValue)).range(schemeTableau10),
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
          />
          <AxisLeft
            countryScale={countryScale}
            ageScale={ageScale}
            margin={margin}
            width={width}
          />
          <Marks
            data={data}
            ageScale={ageScale}
            ageGroups={ageGroups}
            xScale={xScale}
            countryScale={countryScale}
            countryValue={countryValue}
            colorScale={colorScale}
            tooltipFormat={xAxisTickFormat}
            onHover={setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
        </g>
        {/* <g transform={`translate(${legendX}, ${legendY})`}> */}
        {/*   <text className={styles.legendLabel} x={-7} y={-legendItemSpacing}> */}
        {/*     {ColorLegendLabel} */}
        {/*   </text> */}
        {/*   <ColorLegend */}
        {/*     colorScale={colorScale} */}
        {/*     tickSpacing={legendItemSpacing} */}
        {/*     tickSize={circleRadius} */}
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
