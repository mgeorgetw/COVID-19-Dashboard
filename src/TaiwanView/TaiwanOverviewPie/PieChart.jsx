import React from "react";
import styles from "./OverviewPie.module.css";
export const PieChart = ({
  pieData,
  pieArc,
  colorPie,
  colorScale,
  dataType,
  onHover,
  hoveredValue,
  fadeOpacity = 0.2,
}) =>
  colorPie(pieData).map((d) => {
    const domainValue = dataType(d.data);
    return (
      <g
        className={styles.pieChart}
        opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
        onMouseEnter={() => onHover(domainValue)}
        onClick={() => onHover(domainValue)}
        onMouseLeave={() => onHover(null)}
        key={d.data.case}
      >
        <path fill={colorScale(domainValue)} d={pieArc(d)} />
      </g>
    );
  });
