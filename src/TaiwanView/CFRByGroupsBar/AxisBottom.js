import React from "react";
import styles from "./BarChart.module.css";
export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 3,
  tickCount = 6,
}) =>
  // Label and reference lines for x scale
  xScale.ticks(tickCount).map((tickValue) => (
    // Each tick goes to the position indicating its value
    <g
      className={styles.tick}
      key={tickValue}
      transform={`translate(${xScale(tickValue)}, 0)`}
    >
      {/* the values of x1, x2, y1 are 0, which is default */}
      <line y2={innerHeight} />
      <text
        y={innerHeight + tickOffset}
        dy="0.71em"
        style={{ textAnchor: "middle" }}
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
