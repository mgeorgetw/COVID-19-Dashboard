import React, { useRef, useEffect } from "react";
import { select, axisBottom } from "d3";
import styles from "./ChoroplethMap.module.css";

export const AxisBottom = ({
  xScale,
  innerHeight,
  width,
  colorScale,
  // tickFormat,
  tickCount = 6,
  tickOffset = 3,
}) => {
  const ref = useRef();
  const legendHeight = 15;
  useEffect(() => {
    const xAxisG = select(ref.current);
    const xAxis = axisBottom(xScale)
      .ticks(tickCount)
      .tickSize(-legendHeight - 3)
      .tickPadding(tickOffset);
    xAxisG
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("dy", "-2.2em");
  }, [xScale, innerHeight, tickOffset, tickCount]);
  return (
    <>
      <g transform={`translate(${tickOffset}, 0)`}>
        <defs>
          <linearGradient id="legendGradient">
            <stop offset="0%" stopColor={colorScale.range()[0]} />
            <stop offset="100%" stopColor={colorScale.range()[1]} />
          </linearGradient>
        </defs>
        <rect
          x={0}
          y={innerHeight - legendHeight}
          width={width}
          height={legendHeight}
          fill={`url('#legendGradient')`}
        />
        <g
          ref={ref}
          className={styles.tick}
          transform={`translate(0, ${innerHeight})`}
        />
      </g>
    </>
  );
};
