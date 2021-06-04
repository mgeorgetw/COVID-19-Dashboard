import React, { useMemo } from "react";
import { Delaunay } from "d3-delaunay";
import styles from "./LineChart.module.css";
export const VoronoiOverlay = ({
  margin,
  data,
  areaGenerator,
  onHover,
  innerWidth,
  innerHeight,
}) => {
  // console.log(data);
  return useMemo(() => {
    const points = data.map((d) => [
      areaGenerator.x()(d),
      areaGenerator.y()(d),
    ]);
    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([
      0,
      0,
      innerWidth + margin.right,
      innerHeight,
    ]);
    return (
      <g className={styles.voronoi}>
        {points.map((point, i) => (
          <path
            key={i}
            onPointerEnter={() => onHover(data[i])}
            d={voronoi.renderCell(i)}
          />
        ))}
      </g>
    );
  }, [data, areaGenerator, innerHeight, innerWidth, onHover, margin.right]);
};
