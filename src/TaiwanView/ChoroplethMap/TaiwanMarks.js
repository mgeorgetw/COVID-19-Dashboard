import { geoPath } from "d3";
import styles from "./ChoroplethMap.module.css";
const missingDataColor = "gray";

export const TaiwanMarks = ({
  view,
  atlas: { counties, interiors },
  data,
  colorScale,
}) => {
  // console.log(counties);
  // console.log("d", data);
  const path = geoPath(); // creates a new geographic path generator
  return (
    <g className={styles.marks}>
      {counties.features.map((feature, i) => {
        const d = feature.properties.COUNTYNAME;
        return (
          <path
            fill={d ? colorScale(data[d]) : missingDataColor}
            key={i}
            d={path(feature)}
          />
        );
      })}
      {/* <path className={styles.interiors} d={path(interiors)} /> */}
    </g>
  );
};
