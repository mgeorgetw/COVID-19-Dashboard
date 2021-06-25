import React, { useEffect, useRef } from "react";
import styles from "./OverviewPie.module.css";
import {
  pie,
  arc,
  scaleOrdinal,
  schemeTableau10,
  format,
  select,
  interpolate,
  sum,
} from "d3";

export const AnimatedPieHooks = ({
  data,
  dataValue,
  innerRadius,
  outerRadius,
}) => {
  const ref = useRef(null);
  const cache = useRef(data);
  const createPie = pie()
    .value((d) => d.value)
    .sort(null);
  const createArc = arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const colors = scaleOrdinal(schemeTableau10);
  const valueFormat = format("1,");
  const percentFormat = format(".2%");
  const animateDuration = 500;

  useEffect(() => {
    const pieData = createPie(data);
    const prevData = createPie(cache.current);
    const group = select(ref.current);
    const groupWithData = group.selectAll("g.arc").data(pieData);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));

    const arcTween = (d, i) => {
      const interpolator = interpolate(prevData[i], d);
      return (t) => createArc(interpolator(t));
    };

    path
      .attr("class", "arc")
      .attr("fill", (d, i) => colors(i))
      .transition()
      .duration(animateDuration)
      .attrTween("d", arcTween);

    const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("fill", "black")
      .style("font-size", 10)
      .transition()
      .duration(animateDuration)
      .attr(
        "transform",
        (d) =>
          `translate(${
            d.endAngle - d.startAngle < 0.25
              ? `${createArc.centroid(d)[0] * 1.7}, ${
                  createArc.centroid(d)[1] * 1.7
                }`
              : createArc.centroid(d)
          })`
      )
      .tween("text", (d, i, nodes) => {
        const interpolator = interpolate(prevData[i], d);
        const dataPercentage = dataValue(d.data) / sum(data, (d) => d.value);
        return (t) =>
          select(nodes[i])
            .text(valueFormat(interpolator(t).value))
            .append("tspan")
            .attr("x", 0)
            .attr("y", 18)
            .text(percentFormat(dataPercentage));
      });

    cache.current = data;
  }, [
    data,
    colors,
    createArc,
    createPie,
    valueFormat,
    percentFormat,
    dataValue,
  ]);

  return <g ref={ref} className={styles.pieChart} />;
};
