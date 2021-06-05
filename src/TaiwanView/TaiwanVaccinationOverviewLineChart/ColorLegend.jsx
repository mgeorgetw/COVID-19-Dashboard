import React from "react";
import styles from "./LineChart.module.css";
export const ColorLegend = ({
  colorScale,
  tickSpacing = 20,
  tickSize = 10,
  tickTextOffset = 20,
}) =>
  colorScale.domain().map((domainValue, index) => (
    <g
      key={colorScale(domainValue)}
      className={styles.legend}
      transform={`translate(0, ${index * tickSpacing})`}
    >
      <circle fill={colorScale(domainValue)} r={tickSize}></circle>
      <text dy=".32em" x={tickTextOffset} className={styles.legendStroke}>
        {domainValue}
      </text>
      <text dy=".32em" x={tickTextOffset} className={styles.legend}>
        {domainValue}
      </text>
    </g>
  ));
