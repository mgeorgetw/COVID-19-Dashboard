import React, { useRef, useEffect } from "react";
import { select, axisBottom } from "d3";
import styles from "./LineChart.module.css";

export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickCount = 6,
  tickOffset = 3,
}) => {
  const ref = useRef();
  useEffect(() => {
    const xAxisG = select(ref.current);
    const xAxis = axisBottom(xScale)
      .ticks(tickCount, tickFormat)
      .tickSize(-innerHeight)
      .tickPadding(tickOffset);
    xAxisG.call(xAxis);
  }, [xScale, innerHeight, tickFormat, tickOffset, tickCount]);
  return (
    <g
      ref={ref}
      className={styles.tick}
      transform={`translate(0, ${innerHeight})`}
    />
  );
};

// export const AxisBottom = ({
//   xScale,
//   innerHeight,
//   tickFormat,
//   tickOffset = 3
// }) =>
//   // Label and reference lines for x scale
//   xScale.ticks().map(tickValue => (
//     // Each tick goes to the position indicating its value
//     <g
//       className={styles.tick}
//       key={tickValue}
//       transform={`translate(${xScale(tickValue)}, 0)`}
//     >
//       {/* the values of x1, x2, y1 are 0, which is default */}
//       <line y2={innerHeight} />
//       <text
//         y={innerHeight + tickOffset}
//         dy="0.71em"
//         style={{ textAnchor: "middle" }}
//       >
//         {tickFormat(tickValue)}
//       </text>
//     </g>
//   ));
