import React from "react";
import styles from "./AreaChart.module.css";
export const Tooltip = ({
  activeData,
  hoveredValue,
  xScale,
  xTooltipFormat,
  tooltipOffsetX = -10,
}) => (
  <>
    <text
      className={styles.tooltipStroke}
      textAnchor={"end"}
      dominantBaseline={"middle"}
      x={xScale(activeData.data.date) + tooltipOffsetX}
      y={20}
    >
      {`${hoveredValue}：${
        activeData && activeData.data[hoveredValue]
          ? activeData.data[hoveredValue].toLocaleString()
          : 0
      }人`}
    </text>
    <text
      className={styles.tooltip}
      textAnchor={"end"}
      dominantBaseline={"middle"}
      x={xScale(activeData.data.date) + tooltipOffsetX}
      y={20}
      fontWeight="bold"
    >
      {`${hoveredValue}：${
        activeData && activeData.data[hoveredValue]
          ? activeData.data[hoveredValue].toLocaleString()
          : 0
      }人`}
    </text>
    <text
      className={styles.tooltip}
      textAnchor={"end"}
      dominantBaseline={"middle"}
      x={xScale(activeData.data.date) + tooltipOffsetX}
      y={-10}
    >
      {xTooltipFormat(activeData && activeData.data.date)}
    </text>
  </>
);
