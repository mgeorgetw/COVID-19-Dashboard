import React, { useState, useMemo, useCallback } from "react";
import {
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  area,
  timeFormat,
  extent,
  format,
} from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { CursorLine } from "./CursorLine";
import { YMarkerLine } from "./YMarkerLine";
import { XMarkerLine } from "./XMarkerLine";
import { RectOverlay } from "./RectOverlay";
import { ColorLegend } from "./ColorLegend";
import { Tooltip } from "./Tooltip";
import styles from "./AreaChart.module.css";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.6 : width * 1;
const margin = { top: 20, right: 50, bottom: 80, left: 50 };

const xValue = (d) => d.date;
const xAxisTickFormat = timeFormat("%-m/%-d, %Y");
const xTooltipFormat = timeFormat("%-m/%-d, %Y");

const yValues = [
  { name: "已接種一劑", value: (d) => d.people_vaccinated, color: "#7098a5" },
  {
    name: "已接種二劑",
    value: (d) => d.people_fully_vaccinated,
    color: "#b1c1be",
  },
  {
    name: "追加第三劑",
    value: (d) => (d.total_boosters ? d.total_boosters : 0),
    color: "#8acaa7",
  },
];

// const yValue = (d) => d.total_vaccinations;
const areaNames = yValues.map((item) => item.name);
const areaColors = yValues.map((item) => item.color);

// const yAxisLabel = "接種人次";
// const yAxisLabelOffset = 75;
const siFormat = format("~s");
const yAxisTickFormat = (tickValue) => siFormat(tickValue).replace("M", "百萬");

// const ColorLegendLabel = "接種情形";
const legendCircleRadius = 8;
const legendItemSpacing = 26;

export const AreaChart = ({ data }) => {
  // Change state when different point is hovered
  const [activeData, setActiveData] = useState(data[data.length - 1]);
  const taiwanPopulation = 23514196;

  // The chart's real height and width
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const legendX = margin.left + legendCircleRadius * 2;
  const legendY = margin.top + legendItemSpacing / 2;

  // X axis is time
  const xScale = useMemo(
    () =>
      scaleTime()
        // Domain is an array of actual dates
        // d3.extent(iterable[, accessor]) returns the [max, min] of iterable
        .domain(extent(data, xValue))
        // Range is where the data is shown in pixels, starts from 0 to chart's width
        .range([0, innerWidth])
        .nice(),
    [data, innerWidth]
  );

  // Y is countries is categorical, band scale is for ordinal or categorical dimension
  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, taiwanPopulation])
        .range([innerHeight, 0])
        .nice(),
    [innerHeight]
  );

  const colorScale = useMemo(
    () => scaleOrdinal().domain(areaNames).range(areaColors),
    []
  );

  const handleHover = useCallback(setActiveData, [setActiveData]);

  const multipleAreasGenerator = (yAccessor) =>
    area()
      .x((d) => xScale(xValue(d)))
      .y1((d) => yScale(yAccessor(d)))
      .y0(yScale(0));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMid">
      {/* Adds margin to left and top  */}
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          innerHeight={innerHeight}
          xScale={xScale}
          tickFormat={xAxisTickFormat}
          tickOffset={7}
          tickCount={width > 480 ? 6 : 2}
        />

        <AxisLeft
          innerWidth={innerWidth}
          yScale={yScale}
          tickOffset={7}
          tickFormat={yAxisTickFormat}
        />

        {yValues.map((item, index) => (
          <g key={index} style={{ fill: item.color, stroke: "#635f5d" }}>
            <path d={multipleAreasGenerator(item.value)(data)} />
          </g>
        ))}

        <YMarkerLine
          value={taiwanPopulation * 0.75}
          yScale={yScale}
          innerWidth={innerWidth}
        />

        <XMarkerLine
          value={new Date("2021-06-15T00:00")}
          xScale={xScale}
          height={innerHeight}
          label={"公費疫苗開打"}
        />

        {activeData
          ? yValues.map(
              (item, index) =>
                item.value(activeData) &&
                item.value(activeData) !== 0 && (
                  <g
                    key={`tooltip-${index}`}
                    transform={`translate(${multipleAreasGenerator(
                      item.value
                    ).x()(activeData)}, ${multipleAreasGenerator(
                      item.value
                    ).y1()(activeData)})`}
                  >
                    <circle className={styles.dataPoint} r={5} />
                    <Tooltip>
                      {`${item.value(activeData).toLocaleString()}人 (${format(
                        ".1%"
                      )(item.value(activeData) / taiwanPopulation)})`}
                    </Tooltip>
                  </g>
                )
            )
          : null}

        {activeData ? (
          <CursorLine
            value={activeData.date}
            xScale={xScale}
            innerHeight={innerHeight}
            xTooltipFormat={xTooltipFormat}
          />
        ) : null}

        <RectOverlay
          onHover={handleHover}
          data={data}
          areaGenerator={multipleAreasGenerator(yValues[0].value)}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
        />
      </g>

      <g transform={`translate(${legendX}, ${legendY})`}>
        <ColorLegend
          colorScale={colorScale}
          tickSpacing={legendItemSpacing}
          tickSize={legendCircleRadius}
          tickTextOffset={16}
        />
      </g>
    </svg>
  );
};
