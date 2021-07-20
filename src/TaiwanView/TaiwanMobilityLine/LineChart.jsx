import React, { useMemo } from "react";
import {
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  line,
  timeFormat,
  extent,
  schemeCategory10,
} from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
// import { CursorLine } from "./CursorLine";
import { YMarkerLine } from "./YMarkerLine";
import { XMarkerLine } from "./XMarkerLine";
// import { RectOverlay } from "./RectOverlay";
import { ColorLegend } from "./ColorLegend";
import styles from "./LineChart.module.css";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.6 : width * 1;
const margin = { top: 20, right: 5, bottom: 80, left: 70 };

const xValue = (d) => d.date;
const xAxisTickFormat = timeFormat("%-m/%-d, %Y");

const yValue1 = (d) => d.walking;
const yValue2 = (d) => d.transit;
const yValue3 = (d) => d.driving;
const yAxisLabel = "導航使用率";
const yAxisLabelOffset = 60;
const yAxisTickFormat = (tickValue) => tickValue.toLocaleString() + "%";

// const ColorLegendLabel = "接種情形";
const legendCircleRadius = 8;
const legendItemSpacing = 26;

export const LineChart = ({ data }) => {
  // Change state when different point is hovered
  // const [activeData, setActiveData] = useState(data[data.length - 1]);

  // The chart's real height and width
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const legendX = margin.left + legendCircleRadius * 2;
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
    () => scaleLinear().domain([-100, 150]).range([innerHeight, 0]).nice(),
    [innerHeight]
  );

  const colorScale = useMemo(
    () =>
      scaleOrdinal()
        .domain(["步行", "開車", "大眾交通"])
        .range(schemeCategory10),
    []
  );

  // const handleHover = useCallback(setActiveData, [setActiveData]);

  const lineGenerator = useMemo(
    () =>
      line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue1(d))),
    [xScale, yScale]
  );

  const lineGenerator2 = useMemo(
    () =>
      line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue2(d))),
    [xScale, yScale]
  );

  const lineGenerator3 = useMemo(
    () =>
      line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue3(d))),
    [xScale, yScale]
  );
  // const Tooltip = ({ activeData, scaleValue, className, position }) => (
  //   <text
  //     className={className}
  //     textAnchor={"middle"}
  //     dominantBaseline={"middle"}
  //     x={0}
  //     y={position === "down" ? 40 : -15}
  //   >
  //     <tspan x="0" dy="0" fontWeight="bold">
  //       {scaleValue(activeData) &&
  //         `${scaleValue(activeData).toLocaleString()}%`}
  //     </tspan>
  //     {position === "up" ? (
  //       <tspan x="0" dy="-1.3em">
  //         {xTooltipFormat(activeData.date)}
  //       </tspan>
  //     ) : null}
  //   </text>
  // );
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
          <text
            className={styles.axisLabel}
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2})`}
            writingMode="vertical-lr"
          >
            {yAxisLabel}
          </text>
          <g className={styles.line}>
            <path d={lineGenerator(data)} stroke={colorScale("步行")} />
          </g>
          <g className={styles.line}>
            <path d={lineGenerator3(data)} stroke={colorScale("開車")} />
          </g>
          <g className={styles.line}>
            <path d={lineGenerator2(data)} stroke={colorScale("大眾交通")} />
          </g>
          <YMarkerLine value={0} yScale={yScale} innerWidth={innerWidth} />
          <XMarkerLine
            value={new Date("2021-05-15T00:00")}
            xScale={xScale}
            height={innerHeight}
            label={"雙北實施三級警戒"}
          />
          {/* {activeData ? ( */}
          {/*   <> */}
          {/*     <CursorLine */}
          {/*       value={activeData.date} */}
          {/*       xScale={xScale} */}
          {/*       innerHeight={innerHeight} */}
          {/*     /> */}
          {/*     <g */}
          {/*       transform={`translate(${lineGenerator.x()( */}
          {/*         activeData */}
          {/*       )}, ${lineGenerator.y()(activeData)})`} */}
          {/*     > */}
          {/*       <circle className={styles.dataPoint} r={5} /> */}
          {/*       <Tooltip */}
          {/*         activeData={activeData} */}
          {/*         scaleValue={yValue1} */}
          {/*         className={styles.tooltipStroke} */}
          {/*         position="up" */}
          {/*       /> */}
          {/*       <Tooltip */}
          {/*         activeData={activeData} */}
          {/*         scaleValue={yValue1} */}
          {/*         className={styles.tooltip} */}
          {/*         position="up" */}
          {/*       /> */}
          {/*     </g> */}
          {/*     <g */}
          {/*       transform={`translate(${lineGenerator.x()( */}
          {/*         activeData */}
          {/*       )}, ${lineGenerator2.y()(activeData)})`} */}
          {/*     > */}
          {/*       <circle className={styles.dataPoint} r={5} /> */}
          {/*       <Tooltip */}
          {/*         activeData={activeData} */}
          {/*         scaleValue={yValue2} */}
          {/*         className={styles.tooltipStroke} */}
          {/*         position="down" */}
          {/*       /> */}
          {/*       <Tooltip */}
          {/*         activeData={activeData} */}
          {/*         scaleValue={yValue2} */}
          {/*         className={styles.tooltip} */}
          {/*         position="down" */}
          {/*       /> */}
          {/*     </g> */}
          {/*   </> */}
          {/* ) : null} */}
          {/* <RectOverlay */}
          {/*   onHover={handleHover} */}
          {/*   data={data} */}
          {/*   lineGenerator={lineGenerator} */}
          {/*   innerWidth={innerWidth} */}
          {/*   innerHeight={innerHeight} */}
          {/* /> */}
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
