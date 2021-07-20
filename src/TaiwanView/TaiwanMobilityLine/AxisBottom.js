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
    xAxisG
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-55)");
  }, [xScale, innerHeight, tickFormat, tickOffset, tickCount]);
  return (
    <g
      ref={ref}
      className={styles.tick}
      transform={`translate(0, ${innerHeight})`}
    />
  );
};
