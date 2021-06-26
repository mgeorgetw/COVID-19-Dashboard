import React, {
  useState,
  useMemo,
  useCallback,
  // useRef,
  // useEffect,
} from "react";
import {
  scaleLinear,
  scaleTime,
  scaleOrdinal,
  area,
  timeFormat,
  extent,
  min,
  max,
  interpolateViridis,
  // select,
} from "d3";
import { DropdownMenu } from "./DropdownMenu";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { CursorLine } from "./CursorLine";
import { XMarkerLine } from "./XMarkerLine";
// import { YMarkerLine } from "./YMarkerLine";
import { PathOverlay } from "./PathOverlay";
import { Tooltip } from "./Tooltip";
// import { ColorLegend } from "./ColorLegend";
// import { areaLabel } from "d3-area-label";
import styles from "./AreaChart.module.css";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.6 : width * 1;
const margin = { top: 20, right: 10, bottom: 80, left: 50 };

const xValue = (d) => d.date;
const xAxisTickFormat = timeFormat("%-m/%-d, %Y");
const xTooltipFormat = timeFormat("%-m/%-d, %Y");
const formatDate = timeFormat("%Y/%-m/%-d");

// const yValue = (d) => d["新增確診人數"];
// const yAxisLabel = "接種人次";
// const yAxisLabelOffset = 75;
const yAxisTickFormat = (tickValue) => (tickValue < 0 ? -tickValue : tickValue);

// const ColorLegendLabel = "接種情形";
// const legendCircleRadius = 8;
// const legendItemSpacing = 26;

export const AreaChart = ({ data, stackedData, view, setView }) => {
  // console.log(data);
  // Change state when different point is hovered
  const [activeData, setActiveData] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);

  // const ref = useRef();

  // The chart's real height and width
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // const legendX = innerWidth + margin.left + 15;
  // const legendY = margin.top + legendItemSpacing / 2;

  // X axis is time
  const xScale = useMemo(
    () =>
      scaleTime()
        // Domain is an array of actual dates
        // d3.extent(iterable[, accessor]) returns the [max, min] of iterable
        .domain(extent(data, (d) => d["日期"]))
        // Range is where the data is shown in pixels, starts from 0 to chart's width
        .range([0, innerWidth]),
    [data, innerWidth]
  );

  // Y is countries is categorical, band scale is for ordinal or categorical dimension
  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([
          min(stackedData, (d) => min(d, (d) => d[0])),
          max(stackedData, (d) => max(d, (d) => d[1])),
        ])
        .range([innerHeight, 0])
        .nice(),
    [stackedData, innerHeight]
  );

  const colorScale = useMemo(
    () =>
      scaleOrdinal().range(
        stackedData.map((area, i) => {
          const t = i / stackedData.length;
          return interpolateViridis(t);
        })
      ),
    [stackedData]
  );

  const handleCursorHover = useCallback(setActiveData, [setActiveData]);
  const handleTypeHover = useCallback(setHoveredValue, [setHoveredValue]);

  const areaGenerator = useMemo(
    () =>
      area()
        .x((d) => xScale(xValue(d.data)))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1])),
    [xScale, yScale]
  );

  // useEffect(() => {
  //   const labelG = select(ref.current);
  //   const labels = labelG.selectAll("text").data(stackedData);
  //   labels
  //     .enter()
  //     .append("text")
  //     .attr("class", styles.areaLabel)
  //     .merge(labels)
  //     .text((d) => d.key)
  //     .attr("transform", areaLabel(areaGenerator));
  // }, [areaGenerator, stackedData]);
  return (
    <>
      <DropdownMenu
        chosen={view}
        setChosen={setView}
        handleTypeHover={handleTypeHover}
        handleCursorHover={handleCursorHover}
      />
      <pre>資料更新時間：{formatDate(data[0]["日期"])}</pre>
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
            {stackedData.map((d) => (
              <g
                key={d.key}
                onTouchStart={(event) => {
                  handleTypeHover(d.key);
                  event.preventDefault();
                }}
                onPointerEnter={() => handleTypeHover(d.key)}
                onMouseLeave={() => handleTypeHover(null)}
              >
                <path
                  d={areaGenerator(d)}
                  fill={colorScale(d.key)}
                  stroke={"#ddd"}
                  strokeWidth={0.1}
                  opacity={hoveredValue ? 0.2 : 1}
                >
                  <title>{d.key}</title>
                </path>
                {hoveredValue === d.key ? (
                  <>
                    <path
                      d={areaGenerator(d)}
                      fill={colorScale(d.key)}
                      stroke={"#ddd"}
                      strokeWidth={0.1}
                    >
                      <title>{d.key}</title>
                    </path>
                    {activeData ? (
                      <>
                        <CursorLine
                          value={activeData.data.date}
                          xScale={xScale}
                          innerHeight={innerHeight}
                        />
                        <Tooltip
                          activeData={activeData}
                          hoveredValue={hoveredValue}
                          xTooltipFormat={xTooltipFormat}
                        />
                      </>
                    ) : null}
                    <PathOverlay
                      onHover={handleCursorHover}
                      data={d}
                      areaGenerator={areaGenerator}
                    />
                  </>
                ) : null}
              </g>
            ))}
          </g>
          <XMarkerLine
            value={new Date("2021-05-15T08:00")}
            xScale={xScale}
            height={innerHeight}
          />
        </g>
        {/* <g transform={`translate(${legendX}, ${legendY})`}> */}
        {/*   <text className={styles.legendLabel} x={-7} y={-legendItemSpacing}> */}
        {/*     {ColorLegendLabel} */}
        {/*   </text> */}
        {/*   <ColorLegend */}
        {/*     colorScale={colorScale} */}
        {/*     tickSpacing={legendItemSpacing} */}
        {/*     tickSize={legendCircleRadius} */}
        {/*     tickTextOffset={16} */}
        {/*   /> */}
        {/* </g> */}
      </svg>
    </>
  );
};
