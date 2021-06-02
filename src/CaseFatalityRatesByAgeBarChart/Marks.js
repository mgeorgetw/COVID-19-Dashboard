import React from "react";
import styles from "./BarChart.module.css";
export const Marks = ({
  data,
  ageGroups,
  ageScale,
  xScale,
  countryScale,
  countryValue,
  colorScale,
  tooltipFormat,
  onHover,
  hoveredValue,
  fadeOpacity = 0.2,
}) =>
  data.map((d) =>
    ageGroups.map((key) => (
      <g
        key={countryValue(d) + key}
        className={styles.marks}
        onMouseEnter={() => onHover(countryValue(d))}
        onMouseLeave={() => onHover(null)}
        opacity={
          hoveredValue && hoveredValue !== countryValue(d) ? fadeOpacity : 1
        }
      >
        <rect
          x={0}
          y={ageScale(key) + countryScale(countryValue(d))}
          width={xScale(d[key])}
          height={countryScale.bandwidth()}
          fill={colorScale(countryValue(d))}
        >
          <title>{`${key}: ${tooltipFormat(d[key])}`}</title>
        </rect>
        <text
          x={xScale(d[key]) + 3}
          y={ageScale(key) + countryScale(countryValue(d))}
          dy=".68em"
          style={{ textAnchor: "start", dominantBaseline: "middle" }}
        >
          {tooltipFormat(d[key])}
        </text>
      </g>
    ))
  );
