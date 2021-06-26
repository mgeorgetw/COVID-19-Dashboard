import React from "react";
import styles from "./AreaChart.module.css";
export const Tooltip = ({ activeData, hoveredValue, xTooltipFormat }) => (
  <>
    <text
      className={styles.tooltipStroke}
      textAnchor={"start"}
      dominantBaseline={"middle"}
      x={0}
      y={20}
    >
      <tspan x="10" dy="0" fontWeight="bold">
        {`${hoveredValue}：${
          activeData && activeData.data[hoveredValue].toLocaleString()
        }人`}
      </tspan>
      <tspan x="10" dy="1.3em">
        {xTooltipFormat(activeData && activeData.data.date)}
      </tspan>
    </text>
    <text
      className={styles.tooltip}
      textAnchor={"start"}
      dominantBaseline={"middle"}
      x={0}
      y={20}
    >
      <tspan x="10" dy="0" fontWeight="bold">
        {`${hoveredValue}：${
          activeData && activeData.data[hoveredValue].toLocaleString()
        }人`}
      </tspan>
      <tspan x="10" dy="1.3em">
        {xTooltipFormat(activeData && activeData.data.date)}
      </tspan>
    </text>
  </>
);
