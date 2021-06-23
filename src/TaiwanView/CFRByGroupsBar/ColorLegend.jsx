import React from "react";
import styles from "./BarChart.module.css";
export const ColorLegend = ({
  tickSpacing = 20,
  tickSize = 10,
  tickTextOffset = 20,
}) => (
  <>
    <g className={styles.legend} transform={`translate(0, 0)`}>
      <rect
        fill={"lightgray"}
        transform={`translate(-${tickSize / 2}, -${tickSize / 2})`}
        width={tickSize}
        height={tickSize}
      />
      <text dy=".32em" x={tickTextOffset}>
        {"已配送"}
      </text>
    </g>
    <g className={styles.legend} transform={`translate(0, ${tickSpacing})`}>
      <rect
        fill={"#7098a5"}
        transform={`translate(-${tickSize / 2}, -${tickSize / 2})`}
        width={tickSize}
        height={tickSize}
      />
      <text dy=".32em" x={tickTextOffset}>
        {"已施打"}
      </text>
    </g>
  </>
);
