import React from "react";
import styles from "./AreaChart.module.css";
export const CursorLine = ({
  activeDataPoint,
  xValue,
  xScale,
  innerHeight,
}) => {
  const markerLineX = xScale(xValue(activeDataPoint.data));
  const markerLineY1 = 0;
  const markerLineY2 = innerHeight;
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
