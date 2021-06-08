import React from "react";
import styles from "./BarChart.module.css";
export const Marks = ({
  data,
  xScale,
  xValue1,
  xValue2,
  yScale,
  yValue,
  tooltipFormat,
  onHover,
  hoveredValue,
  fadeOpacity = 0.2,
}) =>
  data.map((d) => (
    <g
      className={styles.marks}
      key={yValue(d)}
      onMouseEnter={() => onHover(yValue(d))}
      onMouseLeave={() => onHover(null)}
      opacity={hoveredValue && hoveredValue !== yValue(d) ? fadeOpacity : 1}
    >
      <rect
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue2(d))}
        height={yScale.bandwidth()}
        stroke="none"
        strokeWidth={2}
        fill="lightgray"
      />
      <rect
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue1(d))}
        height={yScale.bandwidth()}
        fill="#7098a5"
      />
      {hoveredValue && hoveredValue === yValue(d) ? (
        <>
          <text
            x={xScale(xValue2(d)) + 10}
            y={yScale(yValue(d)) + yScale.bandwidth() / 2}
            style={{
              textAnchor: "start",
              dominantBaseline: "middle",
              fill: "none",
              stroke: "white",
              strokeWidth: 2.4,
            }}
          >
            <tspan x={xScale(xValue2(d)) + 10} dy={0}>
              {yValue(d)}
            </tspan>
            <tspan x={xScale(xValue2(d)) + 10} dy="1.5em">
              已配送：{tooltipFormat(xValue2(d))}
            </tspan>
            <tspan x={xScale(xValue2(d)) + 10} dy="1.5em">
              已施打：{tooltipFormat(xValue1(d))}
            </tspan>
          </text>
          <text
            x={xScale(xValue2(d)) + 10}
            y={yScale(yValue(d)) + yScale.bandwidth() / 2}
            style={{
              textAnchor: "start",
              dominantBaseline: "middle",
              fill: "black",
            }}
          >
            <tspan x={xScale(xValue2(d)) + 10} dy={0}>
              {yValue(d)}
            </tspan>
            <tspan x={xScale(xValue2(d)) + 10} dy="1.5em">
              已配送：{tooltipFormat(xValue2(d))}
            </tspan>
            <tspan x={xScale(xValue2(d)) + 10} dy="1.5em">
              已施打：{tooltipFormat(xValue1(d))}
            </tspan>
          </text>
        </>
      ) : null}
    </g>
  ));
