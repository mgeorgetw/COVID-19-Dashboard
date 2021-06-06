import React, { useRef, useEffect } from "react";
import { select, axisLeft } from "d3";
import styles from "./AreaChart.module.css";

export const AxisLeft = ({
  yScale,
  innerWidth,
  tickFormat,
  tickCount = 6,
  tickOffset = 3,
}) => {
  const ref = useRef();
  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axisLeft(yScale)
      .ticks(tickCount)
      .tickSize(innerWidth)
      .tickPadding(tickOffset)
      .tickFormat(tickFormat);
    yAxisG.call(yAxis);
  }, [yScale, innerWidth, tickFormat, tickOffset, tickCount]);
  return (
    <g
      ref={ref}
      className={styles.tick}
      transform={`translate(${innerWidth}, 0)`}
    />
  );
};
