import React from "react";
// import { useEffect, useRef } from "react";
// import { select, transition } from "d3";
import styles from "./OverviewPie.module.css";
export const PieChart = ({
  pieData,
  pieArc,
  colorPie,
  colorValue,
  dataType,
  onHover,
  hoveredValue,
  fadeOpacity = 0.2,
}) => {
  // const refPie = useRef(null);
  // useEffect(() => {
  //   const t = transition().duration(750).text("agggg").style("fill", "red");

  //   const textG = select(refPie.current);
  //   textG.enter().transition(t);
  // }, []);
  return colorPie(pieData).map((d) => {
    const domainValue = dataType(d.data);
    return (
      <g
        className={styles.pieChart}
        opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
        onMouseEnter={() => onHover(domainValue)}
        onClick={() => onHover(domainValue)}
        onMouseLeave={() => onHover(null)}
        key={dataType(d.data)}
      >
        <path fill={colorValue(d.data)} d={pieArc(d)} />
      </g>
    );
  });
};
