import React, { useMemo } from "react";
import { pointer, bisectCenter } from "d3";
import styles from "./AreaChart.module.css";

export const PathOverlay = ({ data, areaGenerator, onHover }) => {
  return useMemo(() => {
    // d3.bisect() only works with ascending values
    // turn x values into negative numbers as a cheat
    const points = data.map((d) => -areaGenerator.x()(d));
    return (
      <g className={styles.captureArea}>
        <path
          d={areaGenerator(data)}
          onTouchStart={(event) => {
            event.preventDefault();
            const index = bisectCenter(points, -pointer(event)[0]);
            onHover(data[index]);
          }}
          onPointerMove={(event) => {
            const index = bisectCenter(points, -pointer(event)[0]);
            onHover(data[index]);
          }}
          onMouseMove={(event) => {
            const index = bisectCenter(points, -pointer(event)[0]);
            onHover(data[index]);
          }}
        ></path>
      </g>
    );
  }, [data, areaGenerator, onHover]);
};
