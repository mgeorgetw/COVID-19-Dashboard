import React from "react";
import styles from "./AreaChart.module.css";
export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickSize = 10,
  tickTextOffset = 16,
}) =>
  colorScale.domain().map((domainValue, index) => (
    <g
      key={colorScale(domainValue)}
      transform={`translate(${index * tickSpacing}, 0)`}
    >
      <circle fill={colorScale(domainValue)} r={tickSize}></circle>
      <text
        dominantBaseline="central"
        x={tickTextOffset}
        className={styles.legendStroke}
      >
        {domainValue}
      </text>
      <text
        dominantBaseline="central"
        x={tickTextOffset}
        className={styles.legend}
      >
        {domainValue}
      </text>
    </g>
  ));
