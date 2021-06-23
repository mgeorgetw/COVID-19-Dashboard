import React, { useMemo } from "react";
import { pointer } from "d3";
import styles from "./AreaChart.module.css";
export const LineOverlay = ({ data, areaGenerator, onHover }) => {
  return useMemo(() => {
    const points = data.map((d) => [
      areaGenerator.x()(d),
      areaGenerator.y0()(d),
      areaGenerator.y1()(d),
    ]);
    return (
      <g className={styles.voronoi}>
        {points.map((point, i) => (
          <path
            key={i}
            d={`M${point[0]},${point[1]}L${point[0]},${point[2]}Z`}
            strokeLinecap={"round"}
            opacity={0.7}
            onPointerEnter={(event) => {
              event.preventDefault();
              onHover(data[i]);
              const pointX = pointer(event)[0];
              console.log(pointX);
            }}
            onMouseEnter={() => onHover(data[i])}
            onTouchMove={(event) => {
              event.preventDefault();
              onHover(data[i]);
            }}
            onTouchStart={(event) => {
              event.preventDefault();
              onHover(data[i]);
            }}
          />
        ))}
      </g>
    );
  }, [data, areaGenerator, onHover]);
};
