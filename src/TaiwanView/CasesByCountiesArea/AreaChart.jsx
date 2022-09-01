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
  interpolateTurbo,
  select,
} from "d3";

import { DropdownMenu } from "./DropdownMenu";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { CursorLine } from "./CursorLine";
import { XMarkerLine } from "./XMarkerLine";
import { PathOverlay } from "./PathOverlay";
import { Tooltip } from "./Tooltip";
import { calculateRemToPixels } from "../../utils/helper";
import styles from "./AreaChart.module.css";

const margin = { top: 20, right: 10, bottom: 80, left: 50 };

const xValue = (d) => d["日期"];
const xAxisTickFormat = timeFormat("%-m/%-d, %Y");
const xTooltipFormat = timeFormat("%-m/%-d, %Y");
const formatDate = timeFormat("%Y/%-m/%-d");

const yAxisTickFormat = (tickValue) => (tickValue < 0 ? -tickValue : tickValue);

export const AreaChart = ({ data, stackedData, view, setView }) => {
  const [width, setWidth] = useState(480);
  const height = width > 480 ? width * 0.6 : width * 1;
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const totalWidth = innerWidth * 3;

  const [activeDataPoint, setActiveDataPoint] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);

  const xScale = useMemo(
    () => scaleTime().domain(extent(data, xValue)).range([0, totalWidth]),
    [data, totalWidth]
  );
  const minX = xScale(xValue(data[data.length - 1]));
  const maxX = xScale(xValue(data[0]));
  const overwidth = maxX - minX + margin.left + margin.right;

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
          return interpolateTurbo(t);
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
        // Fills empty data with zeroes
        .defined((d) => d[1] || d[1] === 0),
    [xScale, yScale]
  );

  const handleAreaHover = useCallback(setHoveredValue, [setHoveredValue]);
  const handleCursorHover = useCallback(setActiveDataPoint, [
    setActiveDataPoint,
  ]);

  const svgParentDivRef = useRef();
  const scrollableDivRef = useRef();

  function initializeSVGWidth() {
    const appWidth = window.innerWidth < 1000 ? window.innerWidth : 1000;
    const cardOffsetOneSide = calculateRemToPixels(1.5);
    const SVGContainerWidth = appWidth - cardOffsetOneSide * 2;
    setWidth(SVGContainerWidth);
  }

  useEffect(() => {
    initializeSVGWidth();
    scrollChartToLatest();

    function scrollChartToLatest() {
      const divToScroll = select(scrollableDivRef.current);
      divToScroll.node().scrollBy(overwidth, 0);
    }
  }, [overwidth]);

  useEffect(() => window.addEventListener("resize", initializeSVGWidth), []);

  return (
    <>
      <DropdownMenu
        chosen={view}
        setChosen={setView}
        handleAreaHover={handleAreaHover}
        handleCursorHover={handleCursorHover}
      />
      <pre>資料更新時間：{formatDate(data[0]["日期"])}</pre>

      <div ref={svgParentDivRef}>
        <svg
          style={{ position: "absolute", pointerEvents: "none", zIndex: 1 }}
          width={width}
          height={height}
        >
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
                    dataPoint={d}
                    areaGenerator={areaGenerator}
                    colorScale={colorScale}
                    activeDataPoint={activeDataPoint}
                    hoveredValue={hoveredValue}
                    xScale={xScale}
                    innerHeight={innerHeight}
                    handleAreaHover={handleAreaHover}
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
  dataPoint,
  areaGenerator,
  colorScale,
  activeDataPoint,
  hoveredValue,
  xScale,
  innerHeight,
  handleAreaHover,
  handleCursorHover,
}) => (
  <g
    onTouchStart={(event) => {
      handleAreaHover(dataPoint.key);
      event.preventDefault();
    }}
    onPointerEnter={() => handleAreaHover(dataPoint.key)}
    onPointerLeave={() => handleAreaHover(null)}
  >
    <path
      d={areaGenerator(dataPoint)}
      fill={colorScale(dataPoint.key)}
      stroke={"#ddd"}
      strokeWidth={0.1}
      opacity={hoveredValue ? 0.2 : 1}
    >
      <title>{dataPoint.key}</title>
    </path>

    {hoveredValue === dataPoint.key && (
      <>
        <path
          d={areaGenerator(dataPoint)}
          fill={colorScale(dataPoint.key)}
          stroke={"#ddd"}
          strokeWidth={0.1}
        >
          <title>{dataPoint.key}</title>
        </path>

        {activeDataPoint && (
          <>
            <CursorLine
              activeDataPoint={activeDataPoint}
              xValue={xValue}
              xScale={xScale}
              innerHeight={innerHeight}
            />

            <Tooltip
              activeDataPoint={activeDataPoint}
              xValue={xValue}
              xScale={xScale}
              hoveredValue={hoveredValue}
              xTooltipFormat={xTooltipFormat}
            />
          </>
        )}

        <PathOverlay
          onHover={handleCursorHover}
          data={dataPoint}
          areaGenerator={areaGenerator}
        />
      </>
    )}
  </g>
);
