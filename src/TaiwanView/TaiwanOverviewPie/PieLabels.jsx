import React from "react";
import { sum } from "d3";
import styles from "./OverviewPie.module.css";
export const PieLabels = ({
  pieData,
  pieArc,
  colorPie,
  dataType,
  dataValue,
  onHover,
  hoveredValue,
  fadeOpacity = 0.2,
  labelOffsetY = 18,
}) =>
  colorPie(pieData).map((d) => {
    const domainValue = dataType(d.data);
    let pieLabelPosition = pieArc.centroid(d);
    if (d.endAngle - d.startAngle < 0.25) {
      pieLabelPosition[0] *= 1.65;
      pieLabelPosition[1] *= 1.65;
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
        <text
          className={styles.pieLabelStroke}
          transform={`translate(${pieLabelPosition})`}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <tspan className="num" x="0" dy={-labelOffsetY / 2} fill="black">
            {dataPercentage}%
          </tspan>
          <tspan x="0" dy={labelOffsetY} fill="#635F5D">
            {dataValue(d.data).toLocaleString()}
          </tspan>
        </text>
        <text
          className={styles.pieLabel}
          transform={`translate(${pieLabelPosition})`}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <tspan className="num" x="0" dy={-labelOffsetY / 2} fill="black">
            {dataPercentage}%
          </tspan>
          <tspan x="0" dy={labelOffsetY} fill="#635F5D">
            {dataValue(d.data).toLocaleString()}
          </tspan>
        </text>
      </g>
    );
  });
