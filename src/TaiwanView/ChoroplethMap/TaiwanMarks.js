import { useState } from "react";
import { geoPath, pointer } from "d3";
import styles from "./ChoroplethMap.module.css";
const missingDataColor = "white";

export const TaiwanMarks = ({
  atlas: { counties, interiors },
  data,
  colorScale,
  onHover,
  hoveredValue,
}) => {
  const [points, setPoints] = useState(null);
  const width = window.innerWidth;
  const path = geoPath(); // creates a new geographic path generator
  return (
    <>
      <g className={styles.marks}>
        {counties.features.map((feature, i) => {
          const d = feature.properties.COUNTYNAME;
          return (
            <path
              fill={d ? colorScale(data[d]) : missingDataColor}
              key={i}
              d={path(feature)}
              onTouchStart={(event) => {
                event.preventDefault();
                onHover(d);
                setPoints(pointer(event));
              }}
              onMouseMove={(event) => {
                onHover(d);
                setPoints(pointer(event));
              }}
              onPointerMove={(event) => {
                onHover(d);
                setPoints(pointer(event));
              }}
            />
          );
        })}
        {hoveredValue ? (
          <g>
            <text
              className={styles.tooltipStroke}
              x={points[0]}
              y={points[1]}
              textAnchor={points[0] > width / 2 ? "end" : "start"}
            >
              {hoveredValue}累計確診：{data[hoveredValue]}
            </text>
            <text
              className={styles.tooltip}
              x={points[0]}
              y={points[1]}
              textAnchor={points[0] > width / 2 ? "end" : "start"}
            >
              {hoveredValue}累計確診：{data[hoveredValue]}
            </text>
          </g>
        ) : null}
        {/* <path className={styles.interiors} d={path(interiors)} /> */}
      </g>
    </>
  );
};
