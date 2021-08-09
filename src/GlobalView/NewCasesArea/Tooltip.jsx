export const Tooltip = ({
  colorScale,
  dataTop,
  dataDown,
  activeDate,
  className,
  xTooltipFormat,
}) => (
  <text className={className} textAnchor={"end"}>
    <tspan x="-10">{xTooltipFormat(activeDate)}</tspan>
    <tspan x="-10" dy="1.2em" fontWeight="bold" fill={colorScale.range()[0]}>
      +
      {dataTop
        .find((obj) => obj.date.valueOf() === activeDate.valueOf())
        .newCases.toLocaleString()}
    </tspan>
    <tspan x="-10" dy="1.2em" fontWeight="bold" fill={colorScale.range()[1]}>
      +
      {dataDown
        .find((obj) => obj.date.valueOf() === activeDate.valueOf())
        .newCases.toLocaleString()}
    </tspan>
  </text>
);
