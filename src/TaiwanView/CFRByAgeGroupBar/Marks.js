import React from "react";
import styles from "./BarChart.module.css";
export const Marks = ({
  data,
  xScale,
  xValue,
  yScale,
  yValue,
  tooltipFormat,
  onHover,
  hoveredValue,
  fadeOpacity = 0.2,
  tooltipOffset = 22,
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
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
        stroke="black"
        strokeWidth={2}
        fill="#BD2D28"
      />
      <text
        className={styles.tooltipStroke}
        x={xScale(xValue(d)) + 10}
        y={yScale(yValue(d)) + yScale.bandwidth() / 2}
        dy=".1em"
        dominantBaseline="middle"
      >
        {tooltipFormat(xValue(d))}
      </text>
      <text
        className={styles.tooltip}
        x={xScale(xValue(d)) + 10}
        y={yScale(yValue(d)) + yScale.bandwidth() / 2}
        dy=".1em"
        dominantBaseline="middle"
      >
        {tooltipFormat(xValue(d))}
      </text>
      {hoveredValue && hoveredValue === yValue(d) ? (
        <>
          <text
            className={styles.tooltipStroke}
            x={xScale(xValue(d)) + 10}
            y={yScale(yValue(d)) + yScale.bandwidth() / 2 + tooltipOffset}
            dy=".21em"
          >
            {`染疫：${d.confirmed.toLocaleString()}人`}
          </text>
          <text
            className={styles.tooltip}
            x={xScale(xValue(d)) + 10}
            y={yScale(yValue(d)) + yScale.bandwidth() / 2 + tooltipOffset}
            dy=".21em"
          >
            {`染疫：${d.confirmed.toLocaleString()}人`}
          </text>
          <text
            className={styles.tooltipStroke}
            x={xScale(xValue(d)) + 10}
            y={yScale(yValue(d)) + yScale.bandwidth() / 2 + tooltipOffset * 2}
            dy=".21em"
          >
            {`死亡：${d.deaths.toLocaleString()}人`}
          </text>
          <text
            className={styles.tooltip}
            x={xScale(xValue(d)) + 10}
            y={yScale(yValue(d)) + yScale.bandwidth() / 2 + tooltipOffset * 2}
            dy=".21em"
          >
            {`死亡：${d.deaths.toLocaleString()}人`}
          </text>
        </>
      ) : null}
    </g>
  ));
