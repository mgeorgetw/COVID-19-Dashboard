import React from "react";
import styles from "./AreaChart.module.css";
export const XMarkerLine = ({ value, xScale, height, label }) => {
  const markerLineX = xScale(value);
  const markerLineY1 = 0;
  const markerLineY2 = height;
  return (
    <>
      <line
        className={styles.markerLine}
        strokeDasharray="10,10"
        x1={markerLineX}
        y1={markerLineY1}
        x2={markerLineX}
        y2={markerLineY2}
      />
      <text
        className={styles.markerLineLabelStroke}
        textAnchor={"start"}
        x={markerLineX - 15}
        y={5}
        writingMode="vertical-rl"
      >
        {label}
      </text>
      <text
        className={styles.markerLineLabel}
        textAnchor={"start"}
        x={markerLineX - 15}
        y={5}
        writingMode="vertical-rl"
      >
        {label}
      </text>
    </>
  );
};
