import React, { useState, useMemo, useCallback } from "react";
import {
  scaleLinear,
  scaleTime,
  scaleOrdinal,
  area,
  timeFormat,
  extent,
  max,
  format,
} from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
// import { XMarkerLine } from "./XMarkerLine";
import { CursorLine } from "./CursorLine";
import { ColorLegend } from "./ColorLegend";
import { Tooltip } from "./Tooltip";
import { RectOverlay } from "./RectOverlay";
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
const yAxisTickFormat = (tickValue) =>
  siFormat(tickValue < 0 ? -tickValue : tickValue);

// const ColorLegendLabel = "接種情形";
const legendCircleRadius = 8;
const legendItemSpacing = 150;

export const AreaChart = ({ dataTop, dataDown }) => {
  // Change state when different point is hovered
  const [activeDate, setActiveDate] = useState(
    dataTop[dataTop.length - 1].date
  );
  // if (activeDate) console.log(activeDate);

  // The chart's real height and width
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // X axis is population, thus use linear scale
  const xScale = useMemo(
    () =>
      scaleTime()
        // Domain is an array of actual dates
        // d3.extent(iterable[, accessor]) returns the [max, min] of iterable
        .domain(extent(dataTop, xValue))
        // Range is where the data is shown in pixels, starts from 0 to chart's width
        .range([0, innerWidth])
        .nice(),
    [dataTop, innerWidth]
  );

  // Y is countries is categorical, band scale is for ordinal or categorical dimension
  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([-max(dataDown, yValue), max(dataTop, yValue)])
        .range([innerHeight, 0])
        .nice(),
    [dataTop, dataDown, innerHeight]
  );

  const handleVoronoiHover = useCallback(setActiveDate, [setActiveDate]);

  const areaGenerator = useMemo(
    () =>
      area()
        .x((d) => xScale(xValue(d)))
        .y1((d) => yScale(yValue(d)))
        .y0(yScale(0)),
    [xScale, yScale]
  );

  const areaGeneratorDown = useMemo(
    () =>
      area()
        .x((d) => xScale(xValue(d)))
        .y1((d) => yScale(-yValue(d)))
        .y0(yScale(0)),
    [xScale, yScale]
  );

  const colorScale = useMemo(
    () =>
      scaleOrdinal()
        .domain(["Newly infected", "New deaths"])
        .range(["black", "#BD2D28"]),
    []
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
            <path d={areaGenerator(dataTop)} />
          </g>
          <g className={styles.marksDown}>
            <path d={areaGeneratorDown(dataDown)} />
          </g>
          {/* <XMarkerLine */}
          {/*   value={new Date("2021-05-15T00:00")} */}
          {/*   xScale={xScale} */}
          {/*   height={innerHeight} */}
          {/*   label={"雙北實施三級警戒"} */}
          {/* /> */}
          {activeDate ? (
            <>
              <CursorLine
                value={activeDate}
                xScale={xScale}
                height={innerHeight}
              />
              <g
                transform={`translate(${areaGenerator.x()(
                  dataTop.find(
                    (obj) => obj.date.valueOf() === activeDate.valueOf()
                  )
                )}, ${areaGenerator.y1()(
                  dataTop.find(
                    (obj) => obj.date.valueOf() === activeDate.valueOf()
                  )
                )})`}
              >
                <circle className={styles.dataPoint} r={5} />
                <Tooltip
                  colorScale={colorScale}
                  dataTop={dataTop}
                  dataDown={dataDown}
                  activeDate={activeDate}
                  className={styles.tooltipStroke}
                  xTooltipFormat={xTooltipFormat}
                />
                <Tooltip
                  colorScale={colorScale}
                  dataTop={dataTop}
                  dataDown={dataDown}
                  activeDate={activeDate}
                  className={styles.tooltip}
                  xTooltipFormat={xTooltipFormat}
                />
              </g>
              <g
                transform={`translate(${areaGeneratorDown.x()(
                  dataDown.find(
                    (obj) => obj.date.valueOf() === activeDate.valueOf()
                  )
                )}, ${areaGeneratorDown.y1()(
                  dataDown.find(
                    (obj) => obj.date.valueOf() === activeDate.valueOf()
                  )
                )})`}
              >
                <circle className={styles.dataPoint} r={5} />
              </g>
            </>
          ) : null}
          <g
            transform={`translate(${legendCircleRadius}, ${
              -legendCircleRadius * 2
            })`}
          >
            <ColorLegend
              colorScale={colorScale}
              tickSpacing={legendItemSpacing}
              tickSize={legendCircleRadius}
              tickTextOffset={legendCircleRadius * 2}
            />
          </g>
          <RectOverlay
            onHover={handleVoronoiHover}
            data={dataTop}
            areaGenerator={areaGenerator}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
        </g>
      </svg>
    </>
  );
};
