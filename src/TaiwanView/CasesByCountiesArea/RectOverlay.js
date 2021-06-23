import React, { useMemo } from "react";
import { pointer, bisectCenter } from "d3";
import styles from "./AreaChart.module.css";
export const RectOverlay = ({ data, areaGenerator, onHover }) => {
  return useMemo(() => {
    const points = data.map((d) => -areaGenerator.x()(d));
    return (
      <g className={styles.captureArea}>
        <path
          d={areaGenerator(data)}
          onTouchStart={(event) => {
            event.preventDefault();
            const mouseX = -pointer(event)[0],
              index = bisectCenter(points, mouseX);
            onHover(data[index]);
          }}
          onMouseMove={(event) => {
            const mouseX = -pointer(event)[0];
            const index = bisectCenter(points, mouseX);
            onHover(data[index]);
          }}
          onPointerMove={(event) => {
            const mouseX = -pointer(event)[0];
            const index = bisectCenter(points, mouseX);
            onHover(data[index]);
          }}
        ></path>
      </g>
    );
  }, [data, areaGenerator, onHover]);
};
