import React from "react";
import styles from "./LineChart.module.css";
export const YMarkerLine = ({ value, yScale, innerWidth }) => {
  const markerLineY = yScale(value);
  const markerLineX1 = 0;
  const markerLineX2 = innerWidth;
  return (
    <line
      className={styles.markerLine}
      x1={markerLineX1}
      y1={markerLineY}
      x2={markerLineX2}
      y2={markerLineY}
    />
  );
};
