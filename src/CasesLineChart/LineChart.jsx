import React, { useState, useMemo, useCallback } from "react";
import {
  scaleLinear,
  scaleTime,
  area,
  timeFormat,
  extent,
  max,
  format,
  curveNatural,
} from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { XMarkerLine } from "./XMarkerLine";
import { VoronoiOverlay } from "./VoronoiOverlay";
import styles from "./LineChart.module.css";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.6 : width * 0.8;
const margin = { top: 20, right: 0, bottom: 40, left: 65 };

const xValue = (d) => d.date;
const xAxisTickFormat = timeFormat("%b, %Y");
const xTooltipFormat = timeFormat("%-m/%-d, %y");

const yValue = (d) => d.newCases;
// const yAxisLabel = "New cases";
// const yAxisLabelOffset = 60;
const siFormat = format(".2s");
const yAxisTickFormat = (tickValue) => siFormat(tickValue);

export const LineChart = ({ data }) => {
  // Change state when different point is hovered
  const [activeData, setActiveData] = useState();

  // The chart's real height and width
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // X axis is population, thus use linear scale
  const xScale = useMemo(
    () =>
      scaleTime()
        // Domain is an array of actual dates
        // d3.extent(iterable[, accessor]) returns the [max, min] of iterable
        .domain(extent(data, xValue))
        // Range is where the data is shown in pixels, starts from 0 to chart's width
        .range([0, innerWidth])
        .nice(),
    [data, innerWidth]
  );

  // Y is countries is categorical, band scale is for ordinal or categorical dimension
  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(data, yValue)])
        .range([innerHeight, 0])
        .nice(),
    [data, innerHeight]
  );

  const handleVoronoiHover = useCallback(setActiveData, [setActiveData]);

  const areaGenerator = useMemo(
    () =>
      area()
        .x((d) => xScale(xValue(d)))
        .y1((d) => yScale(yValue(d)))
        .y0(yScale(0))
        .curve(curveNatural),
    [xScale, yScale]
  );

  const Tooltip = ({ activeData, className }) => (
    <text className={className} textAnchor={"end"} x={0} y={-5}>
      <tspan x="-10" dy="0" fontWeight="bold">
        {activeData.newCases.toLocaleString()}
      </tspan>
      <tspan x="-10" dy="1.5em">
        {xTooltipFormat(activeData.date)}
      </tspan>
    </text>
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
            tickOffset={7}
            tickCount={width > 480 ? 6 : 2}
          />
          <AxisLeft
            innerWidth={innerWidth}
            yScale={yScale}
            tickOffset={7}
            tickFormat={yAxisTickFormat}
          />
          {/* <text */}
          {/*   className={styles.axisLabel} */}
          {/*   textAnchor="middle" */}
          {/*   transform={`translate(${-yAxisLabelOffset}, ${ */}
          {/*     innerHeight / 2 */}
          {/*   }) rotate(-90)`} */}
          {/* > */}
          {/*   {yAxisLabel} */}
          {/* </text> */}
          <g className={styles.marks}>
            <path d={areaGenerator(data)} />
          </g>
          {activeData ? (
            <>
              <g className={styles.marks}>
                <path d={areaGenerator(data)} />
              </g>
              <XMarkerLine
                value={activeData.date}
                xScale={xScale}
                innerHeight={innerHeight}
              />
              <g
                transform={`translate(${areaGenerator.x()(
                  activeData
                )}, ${areaGenerator.y1()(activeData)})`}
              >
                <circle className={styles.dataPoint} r={5} />
                <Tooltip
                  activeData={activeData}
                  className={styles.tooltipStroke}
                />
                <Tooltip activeData={activeData} className={styles.tooltip} />
              </g>
            </>
          ) : null}
          <VoronoiOverlay
            margin={margin}
            onHover={handleVoronoiHover}
            data={data}
            areaGenerator={areaGenerator}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
        </g>
      </svg>
    </>
  );
};
