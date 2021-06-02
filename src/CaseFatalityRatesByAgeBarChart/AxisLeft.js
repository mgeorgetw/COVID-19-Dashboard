import React from "react";
import styles from "./BarChart.module.css";
export const AxisLeft = ({
  countryScale,
  ageScale,
  width,
  margin,
  tickOffset = 3,
}) =>
  ageScale.domain().map((tickValue) => (
    <g
      key={tickValue}
      className={styles.tick}
      transform={`translate(0,${
        ageScale(tickValue) + ageScale.bandwidth() / 2
      })`}
    >
      <rect
        x={-margin.left}
        y={-ageScale.bandwidth() / 2 - 4}
        width={width}
        height={ageScale.bandwidth() + 8}
      />
      <text
        dy=".32em"
        x={-margin.left + tickOffset}
        style={{ fontSize: "1.1em", fontWeight: "bold", textAnchor: "start" }}
      >
        {tickValue}
      </text>
      {countryScale.domain().map((tickValue) => (
        <text
          key={tickValue}
          dy=".72em"
          x={-tickOffset}
          y={countryScale(tickValue) - ageScale.bandwidth() / 2}
          style={{ textAnchor: "end", dominantBaseline: "middle" }}
        >
          {tickValue}
        </text>
      ))}
    </g>
  ));
