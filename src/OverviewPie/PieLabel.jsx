import React from "react";
// import { select, transition, easeLinear } from "d3";
export const PieLabel = ({
  pieLabelPosition,
  dataValue,
  d,
  percentage,
  className,
  labelOffsetY = 18,
}) => {
  // const ref = useRef(null);
  // useEffect(() => {
  //   const textG = select(ref.current)
  //     .append("text")
  //     .attr("x", 0)
  //     .attr("y", 0)
  //     .style("fill", "red");
  //   textG.enter().text("huh");
  // }, []);
  return (
    <>
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
      {/* <svg ref={ref.current} id="test"></svg> */}
    </>
  );
};
