import React from "react";
import styles from "./AreaChart.module.css";
export const XMarkerLine = ({ value, xScale, innerHeight }) => {
  const markerLineX = xScale(value);
  const markerLineY1 = 0;
  const markerLineY2 = innerHeight;
  return (
    <line
      className={styles.markerLine}
      x1={markerLineX}
      y1={markerLineY1}
      x2={markerLineX}
      y2={markerLineY2}
    />
  );
};
