import React, { useState, useMemo, useCallback } from "react";
import {
  scaleLinear,
  scaleTime,
  scaleOrdinal,
  area,
  timeFormat,
  extent,
  format,
} from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { XMarkerLine } from "./XMarkerLine";
import { YMarkerLine } from "./YMarkerLine";
import { VoronoiOverlay } from "./VoronoiOverlay";
import { ColorLegend } from "./ColorLegend";
import styles from "./AreaChart.module.css";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.6 : width * 1;
const margin = { top: 20, right: 65, bottom: 80, left: 50 };

const xValue = (d) => d.date;
const xAxisTickFormat = timeFormat("%-m/%-d, %Y");
const xTooltipFormat = timeFormat("%-m/%-d, %Y");

const yValue = (d) => d.people_vaccinated;
const yValue2 = (d) => d.people_fully_vaccinated;
// const yAxisLabel = "接種人次";
// const yAxisLabelOffset = 75;
const siFormat = format("~s");
const yAxisTickFormat = (tickValue) => siFormat(tickValue).replace("M", "百萬");

// const ColorLegendLabel = "接種情形";
const legendCircleRadius = 8;
const legendItemSpacing = 26;

export const AreaChart = ({ data }) => {
  // Change state when different point is hovered
  const [activeData, setActiveData] = useState(data[data.length - 1]);
  const taiwanPopulation = 23514196;

  // The chart's real height and width
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const legendX = innerWidth - 50;
  const legendY = margin.top + legendItemSpacing / 2;

  // X axis is time
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
        .domain([0, taiwanPopulation])
        .range([innerHeight, 0])
        .nice(),
    [innerHeight]
  );

  const colorScale = useMemo(
    () =>
      scaleOrdinal()
        .domain(["已接種一次", "已充分接種"])
        .range(["#7098a5", "#b1c1be"]),
    []
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

  const areaGenerator2 = useMemo(
    () =>
      area()
        .x((d) => xScale(xValue(d)))
        .y1((d) => yScale(yValue2(d)))
        .y0(yScale(0)),
    [xScale, yScale]
  );

  const Tooltip = ({ activeData, scaleValue, className, position }) => (
    <text
      className={className}
      textAnchor={"middle"}
      dominantBaseline={"middle"}
      x={0}
      y={position === "down" ? 20 : -15}
    >
      <tspan x="0" dy="0" fontWeight="bold">
        {scaleValue(activeData).toLocaleString()}人 (
        {format(".0%")(scaleValue(activeData) / taiwanPopulation)})
      </tspan>
      {position === "up" ? (
        <tspan x="0" dy="-1.3em">
          {xTooltipFormat(activeData.date)}
        </tspan>
      ) : null}
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
          {/*   transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2})`} */}
          {/*   writingMode="vertical-lr" */}
          {/* > */}
          {/*   {yAxisLabel} */}
          {/* </text> */}
          <g className={styles.primary}>
            <path d={areaGenerator(data)} />
          </g>
          <g className={styles.secondary}>
            <path d={areaGenerator2(data)} />
          </g>
          {activeData ? (
            <>
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
                  scaleValue={yValue}
                  className={styles.tooltipStroke}
                  position="up"
                />
                <Tooltip
                  activeData={activeData}
                  scaleValue={yValue}
                  className={styles.tooltip}
                  position="up"
                />
              </g>
              <g
                transform={`translate(${areaGenerator.x()(
                  activeData
                )}, ${areaGenerator2.y1()(activeData)})`}
              >
                <circle className={styles.dataPoint} r={5} />
                <Tooltip
                  activeData={activeData}
                  scaleValue={yValue2}
                  className={styles.tooltipStroke}
                  position="down"
                />
                <Tooltip
                  activeData={activeData}
                  scaleValue={yValue2}
                  className={styles.tooltip}
                  position="down"
                />
              </g>
            </>
          ) : null}
          <YMarkerLine
            value={taiwanPopulation * 0.75}
            yScale={yScale}
            innerWidth={innerWidth}
          />
          <VoronoiOverlay
            margin={margin}
            onHover={handleVoronoiHover}
            data={data}
            areaGenerator={areaGenerator}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
        </g>
        <g transform={`translate(${legendX}, ${legendY})`}>
          {/* <text className={styles.legendLabel} x={-7} y={-legendItemSpacing}> */}
          {/*   {ColorLegendLabel} */}
          {/* </text> */}
          <ColorLegend
            colorScale={colorScale}
            tickSpacing={legendItemSpacing}
            tickSize={legendCircleRadius}
            tickTextOffset={16}
          />
        </g>
      </svg>
    </>
  );
};
