import React from "react";
import styles from "./AreaChart.module.css";
export const CursorLine = ({ value, xScale, height }) => {
  const markerLineX = xScale(value);
  const markerLineY1 = 0;
  const markerLineY2 = height;
  return (
    <line
      className={styles.cursorLine}
      x1={markerLineX}
      y1={markerLineY1}
      x2={markerLineX}
      y2={markerLineY2}
    />
  );
};
