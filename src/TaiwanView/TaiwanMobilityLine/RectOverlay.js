import React, { useMemo } from "react";
import { pointer, bisectCenter } from "d3";
import styles from "./LineChart.module.css";
export const RectOverlay = ({
  data,
  lineGenerator,
  onHover,
  innerWidth,
  innerHeight,
}) => {
  return useMemo(() => {
    const points = data.map((d) => lineGenerator.x()(d));
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
  }, [data, lineGenerator, innerHeight, innerWidth, onHover]);
};
