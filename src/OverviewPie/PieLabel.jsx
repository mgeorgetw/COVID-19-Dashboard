import React from "react";
export const PieLabel = ({
  pieLabelPosition,
  dataValue,
  d,
  percentage,
  className,
  labelOffsetY = 18,
}) => (
  <text
    className={className}
    transform={`translate(${pieLabelPosition})`}
    textAnchor="middle"
    dominantBaseline="middle"
  >
    <tspan className="num" x="0" dy={-labelOffsetY} fill="black">
      {percentage}%
    </tspan>
    <tspan x="0" dy={labelOffsetY} fill="#635F5D">
      {dataValue(d.data).toLocaleString()}
    </tspan>
  </text>
);
