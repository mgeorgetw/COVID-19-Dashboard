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
        x={-margin.left + tickOffset}
        style={{
          fontSize: "1.1em",
          fontWeight: "bold",
          textAnchor: "start",
          dominantBaseline: "central",
        }}
      >
        {tickValue}
      </text>
      {countryScale.domain().map((tickValue) => (
        <text
          key={tickValue}
          x={-tickOffset}
          y={
            countryScale(tickValue) +
            countryScale.bandwidth() / 2 -
            ageScale.bandwidth() / 2
          }
          style={{ textAnchor: "end", dominantBaseline: "central" }}
        >
          {tickValue}
        </text>
      ))}
    </g>
  ));
