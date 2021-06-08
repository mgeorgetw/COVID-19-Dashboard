import React, { useState, useMemo, useCallback } from "react";
import {
  scaleLinear,
  scaleTime,
  area,
  timeFormat,
  extent,
  max,
  format,
} from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { XMarkerLine } from "./XMarkerLine";
import { CursorLine } from "./CursorLine.js";
import { VoronoiOverlay } from "./VoronoiOverlay";
import styles from "./AreaChart.module.css";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.6 : width * 1;
const margin = { top: 30, right: 10, bottom: 70, left: 40 };

const xValue = (d) => d.date;
const xAxisTickFormat = timeFormat("%-m/%-d, %Y");
const xTooltipFormat = timeFormat("%-m/%-d");

const yValue = (d) => d.newCases;
// const yAxisLabel = "New cases";
// const yAxisLabelOffset = 60;
const siFormat = format("~s");
const yAxisTickFormat = (tickValue) => siFormat(tickValue);

export const AreaChart = ({ data }) => {
  // Change state when different point is hovered
  const [activeData, setActiveData] = useState(data[data.length - 1]);

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
        .y0(yScale(0)),
    [xScale, yScale]
  );

  const Tooltip = ({ activeData, className }) => (
    <text className={className} textAnchor={"end"} x={0} y={-35}>
      <tspan x="-10" dy="0" fontWeight="bold">
        {activeData.newCases.toLocaleString()}例
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
          <XMarkerLine
            value={new Date("2021-05-15T00:00")}
            xScale={xScale}
            height={innerHeight}
          />
          <text
            className={styles.markerLineLabelStroke}
            textAnchor={"start"}
            x={xScale(new Date("2021-05-15T00:00")) - 15}
            y={5}
            writingMode="vertical-rl"
          >
            雙北實施三級警戒
          </text>
          <text
            className={styles.markerLineLabel}
            textAnchor={"start"}
            x={xScale(new Date("2021-05-15T00:00")) - 15}
            y={5}
            writingMode="vertical-rl"
          >
            雙北實施三級警戒
          </text>
          {activeData ? (
            <>
              <CursorLine
                value={activeData.date}
                xScale={xScale}
                height={innerHeight}
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
