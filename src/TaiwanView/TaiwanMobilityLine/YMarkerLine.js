import React from "react";
import styles from "./LineChart.module.css";
export const YMarkerLine = ({
  value,
  label,
  yScale,
  innerWidth,
  labelOffset = 8,
}) => {
  const markerLineY = yScale(value);
  const markerLineX1 = 0;
  const markerLineX2 = innerWidth;
  return (
    <>
      <line
        className={styles.markerLine}
        x1={markerLineX1}
        y1={markerLineY}
        x2={markerLineX2}
        y2={markerLineY}
      />
      <text
        className={styles.markerLineLabelStroke}
        textAnchor={"start"}
        dominantBaseline={"hanging"}
        x={labelOffset}
        y={yScale(value) + labelOffset}
        fontWeight="bold"
      >
        {label}
      </text>
      <text
        className={styles.markerLineLabel}
        textAnchor={"start"}
        dominantBaseline={"hanging"}
        x={labelOffset}
        y={yScale(value) + labelOffset}
        fontWeight="bold"
      >
        {label}
      </text>
    </>
  );
};
