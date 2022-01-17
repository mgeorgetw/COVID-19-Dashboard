import React from "react";
import styles from "./AreaChart.module.css";
export const Tooltip = ({
  activeDataPoint,
  hoveredValue,
  xValue,
  xScale,
  xTooltipFormat,
  tooltipOffsetX = -10,
}) => (
  <>
    <text
      className={styles.tooltipStroke}
      textAnchor={"end"}
      dominantBaseline={"middle"}
      x={xScale(xValue(activeDataPoint.data)) + tooltipOffsetX}
      y={20}
    >
      {`${hoveredValue}：${
        activeDataPoint && activeDataPoint.data[hoveredValue]
          ? activeDataPoint.data[hoveredValue].toLocaleString()
          : 0
      }人`}
    </text>
    <text
      className={styles.tooltip}
      textAnchor={"end"}
      dominantBaseline={"middle"}
      x={xScale(xValue(activeDataPoint.data)) + tooltipOffsetX}
      y={20}
      fontWeight="bold"
    >
      {`${hoveredValue}：${
        activeDataPoint && activeDataPoint.data[hoveredValue]
          ? activeDataPoint.data[hoveredValue].toLocaleString()
          : 0
      }人`}
    </text>
    <text
      className={styles.tooltip}
      textAnchor={"end"}
      dominantBaseline={"middle"}
      x={xScale(xValue(activeDataPoint.data)) + tooltipOffsetX}
      y={-10}
    >
      {xTooltipFormat(activeDataPoint && xValue(activeDataPoint.data))}
    </text>
  </>
);
