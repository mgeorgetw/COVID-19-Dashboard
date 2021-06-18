import React from "react";
import styles from "./AreaChart.module.css";
export const XMarkerLine = ({ value, xScale, height }) => {
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
        textAnchor={"end"}
        x={xScale(new Date("2021-05-15T08:00")) - 15}
        y={height - 5}
        writingMode="vertical-rl"
      >
        雙北實施三級警戒
      </text>
      <text
        className={styles.markerLineLabel}
        textAnchor={"end"}
        x={xScale(new Date("2021-05-15T08:00")) - 15}
        y={height - 5}
        writingMode="vertical-rl"
      >
        雙北實施三級警戒
      </text>
    </>
  );
};
