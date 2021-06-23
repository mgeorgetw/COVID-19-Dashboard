import React, { useMemo } from "react";
import { pointer, bisectCenter } from "d3";
import styles from "./AreaChart.module.css";
export const RectOverlay = ({
  data,
  areaGenerator,
  onHover,
  innerWidth,
  innerHeight,
}) => {
  return useMemo(() => {
    const points = data.map((d) => areaGenerator.x()(d));
    return (
      <g className={styles.captureArea}>
        <rect
          width={innerWidth}
          height={innerHeight}
          onTouchStart={(event) => {
            event.preventDefault();
            const index = bisectCenter(points, pointer(event)[0]);
            onHover(data[index]);
          }}
          onPointerMove={(event) => {
            const index = bisectCenter(points, pointer(event)[0]);
            onHover(data[index]);
          }}
          onMouseMove={(event) => {
            const index = bisectCenter(points, pointer(event)[0]);
            onHover(data[index]);
          }}
        />
      </g>
    );
  }, [data, areaGenerator, innerHeight, innerWidth, onHover]);
};
