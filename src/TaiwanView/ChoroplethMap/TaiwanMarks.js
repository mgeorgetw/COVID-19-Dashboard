import { geoPath, pointer } from "d3";
import styles from "./ChoroplethMap.module.css";
const missingDataColor = "white";

export const TaiwanMarks = ({
  atlas: { counties, interiors, compBorders },
  data,
  colorScale,
  handleHover,
  handlePointerMove,
}) => {
  // const projection = geoMercator().scale(9000).center([121, 24]);
  // const path = geoPath().projection(projection); // creates a new geographic path generator
  const path = geoPath();
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
                handleHover(d);
                handlePointerMove(pointer(event));
              }}
              onMouseMove={(event) => {
                handleHover(d);
                handlePointerMove(pointer(event));
              }}
              onPointerMove={(event) => {
                handleHover(d);
                handlePointerMove(pointer(event));
              }}
            />
          );
        })}
        {/* <path className={styles.interiors} d={path(interiors)} /> */}
        <path className={styles.marks} d={path(compBorders)} />
      </g>
    </>
  );
};
