import chartStyles from "./BarChart.module.css";
export const Tooltip = ({ hoveredValue, data, points, labelOffset }) => {
  const d = data.find((obj) => obj.group === hoveredValue);
  return (
    <g>
      <text
        className={chartStyles.tooltipStroke}
        x={points[0] + labelOffset}
        y={points[1]}
        dy=".42em"
      >
        <tspan x={points[0] + labelOffset}>
          {`染疫：${d.confirmed.toLocaleString()}人`}
        </tspan>
        <tspan
          x={points[0] + labelOffset}
          dy="1.3em"
        >{`死亡：${d.deaths.toLocaleString()}人`}</tspan>
      </text>
      <text
        className={chartStyles.tooltip}
        x={points[0] + labelOffset}
        y={points[1]}
        dy=".42em"
      >
        <tspan x={points[0] + labelOffset}>
          {`染疫：${d.confirmed.toLocaleString()}人`}
        </tspan>
        <tspan
          x={points[0] + labelOffset}
          dy="1.3em"
        >{`死亡：${d.deaths.toLocaleString()}人`}</tspan>
      </text>
    </g>
  );
};
