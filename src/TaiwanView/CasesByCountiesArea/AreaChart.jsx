import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";

import {
  scaleLinear,
  scaleTime,
  scaleOrdinal,
  area,
  timeFormat,
  extent,
  min,
  max,
  interpolateViridis,
  select,
} from "d3";

import { DropdownMenu } from "./DropdownMenu";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { CursorLine } from "./CursorLine";
import { XMarkerLine } from "./XMarkerLine";
import { PathOverlay } from "./PathOverlay";
import { Tooltip } from "./Tooltip";
import styles from "./AreaChart.module.css";

const margin = { top: 20, right: 10, bottom: 80, left: 50 };

const xValue = (d) => d.date;
const xAxisTickFormat = timeFormat("%-m/%-d, %Y");
const xTooltipFormat = timeFormat("%-m/%-d, %Y");
const formatDate = timeFormat("%Y/%-m/%-d");

const yAxisTickFormat = (tickValue) => (tickValue < 0 ? -tickValue : tickValue);

export const AreaChart = ({ data, stackedData, view, setView }) => {
  const [width, setWidth] = useState(null);
  const height = width > 480 ? width * 0.6 : width * 1;
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const [activeDataPoint, setActiveDataPoint] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);

  const scrollableDivRef = useRef();

  const xScale = useMemo(
    () =>
      scaleTime()
        // Domain is an array of actual dates
        // d3.extent(iterable[, accessor]) returns the [max, min] of iterable
        .domain(extent(data, (d) => d["日期"]))
        // Range is where the data is shown in pixels, starts from 0 to chart's width
        .range([0, innerWidth * 3]),
    [data, innerWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([
          min(stackedData, (d) => min(d, (d) => d[0])),
          max(stackedData, (d) => max(d, (d) => d[1])),
        ])
        .range([innerHeight, 0])
        .nice(),
    [stackedData, innerHeight]
  );

  const colorScale = useMemo(
    () =>
      scaleOrdinal().range(
        stackedData.map((area, i) => {
          const t = i / stackedData.length;
          return interpolateViridis(t);
        })
      ),
    [stackedData]
  );

  const areaGenerator = useMemo(
    () =>
      area()
        .x((d) => xScale(xValue(d.data)))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]))
        .defined((d) => d[1] || d[1] === "0"),
    [xScale, yScale]
  );

  const minX = xScale(data[data.length - 1]["日期"]);
  const maxX = xScale(data[0]["日期"]);
  const overwidth = maxX - minX + margin.left + margin.right;

  const handleCursorHover = useCallback(setActiveDataPoint, [
    setActiveDataPoint,
  ]);
  const handleTypeHover = useCallback(setHoveredValue, [setHoveredValue]);

  function initializeSVGWidth() {
    const flexCardWidth =
      document.getElementsByClassName("flex-card")[0].offsetWidth;
    const cardMarginAndPadding = (16 + 8) * 2;
    const cardInnerWidth = flexCardWidth - cardMarginAndPadding;
    setWidth(cardInnerWidth);
  }

  useEffect(() => {
    function scrollChartToLatest() {
      const divToScroll = select(scrollableDivRef.current);
      divToScroll.node().scrollBy(overwidth, 0);
    }

    initializeSVGWidth();
    scrollChartToLatest();
  }, [overwidth]);

  return (
    <>
      <DropdownMenu
        chosen={view}
        setChosen={setView}
        handleTypeHover={handleTypeHover}
        handleCursorHover={handleCursorHover}
      />
      <pre>資料更新時間：{formatDate(data[0]["日期"])}</pre>
      <div>
        <svg
          style={{ position: "absolute", pointerEvents: "none", zIndex: 1 }}
          width={width}
          height={height}
        >
          {/* Adds margin to left and top  */}
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisLeft
              innerWidth={innerWidth}
              yScale={yScale}
              tickOffset={7}
              tickFormat={yAxisTickFormat}
            />
          </g>
        </svg>
        <div
          style={{ overflowX: "scroll", width: width }}
          ref={scrollableDivRef}
        >
          <svg display="block" width={overwidth} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <AxisBottom
                innerHeight={innerHeight}
                xScale={xScale}
                tickFormat={xAxisTickFormat}
                tickOffset={7}
                tickCount={width > 480 ? 6 : 2}
              />

              <g className={styles.primary}>
                {stackedData.map((d) => (
                  <StreamGraphWithHoverEffect
                    key={d.key}
                    d={d}
                    areaGenerator={areaGenerator}
                    colorScale={colorScale}
                    activeDataPoint={activeDataPoint}
                    hoveredValue={hoveredValue}
                    xScale={xScale}
                    innerHeight={innerHeight}
                    handleTypeHover={handleTypeHover}
                    handleCursorHover={handleCursorHover}
                  />
                ))}
              </g>

              <XMarkerLine
                value={new Date("2021-05-15T08:00")}
                xScale={xScale}
                height={innerHeight}
                label={"雙北實施三級警戒"}
              />

              <XMarkerLine
                value={new Date("2021-07-27T08:00")}
                xScale={xScale}
                height={innerHeight}
                label={"全國三級警戒解除"}
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

const StreamGraphWithHoverEffect = ({
  d,
  areaGenerator,
  colorScale,
  activeDataPoint,
  hoveredValue,
  xScale,
  innerHeight,
  handleTypeHover,
  handleCursorHover,
}) => (
  <g
    onTouchStart={(event) => {
      handleTypeHover(d.key);
      event.preventDefault();
    }}
    onPointerEnter={() => handleTypeHover(d.key)}
    onMouseLeave={() => handleTypeHover(null)}
  >
    <path
      d={areaGenerator(d)}
      fill={colorScale(d.key)}
      stroke={"#ddd"}
      strokeWidth={0.1}
      opacity={hoveredValue ? 0.2 : 1}
    >
      <title>{d.key}</title>
    </path>

    {hoveredValue === d.key && (
      <>
        <path
          d={areaGenerator(d)}
          fill={colorScale(d.key)}
          stroke={"#ddd"}
          strokeWidth={0.1}
        >
          <title>{d.key}</title>
        </path>
        {activeDataPoint && (
          <>
            <CursorLine
              value={activeDataPoint.data.date}
              xScale={xScale}
              innerHeight={innerHeight}
            />
            <Tooltip
              activeDataPoint={activeDataPoint}
              xScale={xScale}
              hoveredValue={hoveredValue}
              xTooltipFormat={xTooltipFormat}
            />
          </>
        )}
        <PathOverlay
          onHover={handleCursorHover}
          data={d}
          areaGenerator={areaGenerator}
        />
      </>
    )}
  </g>
);
