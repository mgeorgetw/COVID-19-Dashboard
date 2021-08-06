import React, { useRef, useEffect } from "react";
import { select, axisLeft } from "d3";
import styles from "./LineChart.module.css";

export const AxisLeft = ({
  yScale,
  innerWidth,
  tickFormat,
  tickOffset = 3,
}) => {
  const ref = useRef();
  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axisLeft(yScale)
      .tickSize(innerWidth)
      .tickPadding(tickOffset)
      .tickFormat(tickFormat);
    yAxisG.call(yAxis);
  }, [yScale, innerWidth, tickFormat, tickOffset]);
  return (
    <g
      ref={ref}
      className={styles.tick}
      transform={`translate(${innerWidth}, 0)`}
    />
  );
};
