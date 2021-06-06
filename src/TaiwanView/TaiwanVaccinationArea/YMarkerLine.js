import React from "react";
import styles from "./AreaChart.module.css";
export const YMarkerLine = ({
  value,
  yScale,
  innerWidth,
  labelOffset = 10,
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
        className={styles.tooltipStroke}
        textAnchor={"start"}
        dominantBaseline={"hanging"}
        x={labelOffset}
        y={yScale(value) + labelOffset}
        fontWeight="bold"
      >
        全人口的75%
      </text>
      <text
        className={styles.tooltip}
        textAnchor={"start"}
        dominantBaseline={"hanging"}
        x={labelOffset}
        y={yScale(value) + labelOffset}
        fontWeight="bold"
      >
        全人口的75%
      </text>
    </>
  );
};
