import React from "react";
import styles from "./BarChart.module.css";
export const AxisLeft = ({ yScale, tickOffset = 3 }) =>
  yScale.domain().map((tickValue) => (
    <g
      key={tickValue}
      className={styles.tick}
      transform={`translate(0,${yScale(tickValue) + yScale.bandwidth() / 2})`}
    >
      <text
        dy=".18em"
        x={-tickOffset}
        style={{
          fontWeight: "bold",
          textAnchor: "end",
          dominantBaseline: "middle",
        }}
      >
        {tickValue}歲
      </text>
    </g>
  ));
