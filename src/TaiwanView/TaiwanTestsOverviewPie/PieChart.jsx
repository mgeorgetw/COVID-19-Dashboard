import React from "react";
import { sum } from "d3";
import styles from "./OverviewPie.module.css";
import { PieLabel } from "./PieLabel.jsx";
export const PieChart = ({
  pieData,
  pieArc,
  colorPie,
  colorValue,
  dataType,
  dataValue,
  onHover,
  hoveredValue,
  fadeOpacity = 0.2,
}) =>
  colorPie(pieData).map((d) => {
    const domainValue = dataType(d.data);
    let pieLabelPosition = pieArc.centroid(d);
    if (d.endAngle - d.startAngle < 0.25) {
      pieLabelPosition[0] *= 2.4;
      pieLabelPosition[1] *= 2.4;
    }
    const dataPercentage = (
      (dataValue(d.data) / sum(pieData, (d) => d.value)) *
      100
    ).toFixed(1);
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
        <PieLabel
          pieLabelPosition={pieLabelPosition}
          dataValue={dataValue}
          d={d}
          percentage={dataPercentage}
          className={styles.pieLabelStroke}
        />
        <PieLabel
          pieLabelPosition={pieLabelPosition}
          dataValue={dataValue}
          d={d}
          percentage={dataPercentage}
          className={styles.pieLabel}
        />
      </g>
    );
  });
