import {
  area,
  extent,
  format,
  select,
  max,
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  timeFormat,
} from "d3";
import { useCallback, useEffect, useRef, useMemo, useState } from "react";
import styles from "./AreaChart.module.css";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { ColorLegend } from "./ColorLegend";
import { CursorLine } from "./CursorLine";
import { RectOverlay } from "./RectOverlay";
import { Tooltip } from "./Tooltip";
import { XMarkerLine } from "./XMarkerLine";
import { calculateRemToPixels } from "../../utils/helper";

const margin = { top: 30, right: 10, bottom: 70, left: 40 };

const xValue = (d) => d.date;
const xAxisTickFormat = timeFormat("%-m/%-d, %Y");
const xTooltipFormat = timeFormat("%-m/%-d");

const yValue = (d) => d.newCases;
const roundedFormat = format("~s");
const yAxisTickFormat = (tickValue) =>
  roundedFormat(tickValue < 0 ? -tickValue : tickValue);

const legendCircleRadius = 8;
const legendItemSpacing = 100;

export const AreaChart = ({ dataTop, dataDown }) => {
  const [activeDate, setActiveDate] = useState(
    dataTop[dataTop.length - 1].date
  );
  // if (activeDate) console.log(activeDate);

  const [width, setWidth] = useState(480);
  const height = width > 480 ? width * 0.6 : width * 1;
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const totalWidth = innerWidth * 3;

  const xScale = useMemo(
    () => scaleTime().domain(extent(dataTop, xValue)).range([0, totalWidth]),
    [dataTop, totalWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([-max(dataDown, yValue), max(dataTop, yValue)])
        .range([innerHeight, 0])
        .nice(),
    [dataTop, dataDown, innerHeight]
  );

  const handleVoronoiHover = useCallback(setActiveDate, [setActiveDate]);

  const areaGenerator = useMemo(
    () =>
      area()
        .x((d) => xScale(xValue(d)))
        .y1((d) => yScale(yValue(d)))
        .y0(yScale(0)),
    [xScale, yScale]
  );

  const areaGeneratorDown = useMemo(
    () =>
      area()
        .x((d) => xScale(xValue(d)))
        .y1((d) => yScale(-yValue(d)))
        .y0(yScale(0)),
    [xScale, yScale]
  );

  const colorScale = useMemo(
    () =>
      scaleOrdinal()
        .domain(["新增確診", "新增死亡"])
        .range(["black", "#BD2D28"]),
    []
  );

  const svgParentDivRef = useRef();
  const scrollableDivRef = useRef();

  const maxX = xScale(xValue(dataTop[dataTop.length - 1]));
  const minX = xScale(xValue(dataTop[0]));
  const overwidth = maxX - minX + margin.left + margin.right;

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

              <g className={styles.marks}>
                <path d={areaGenerator(dataTop)} />
              </g>
              <g className={styles.marksDown}>
                <path d={areaGeneratorDown(dataDown)} />
              </g>

              <XMarkerLine
                value={new Date("2021-05-15T00:00")}
                xScale={xScale}
                height={innerHeight}
                label={"雙北實施三級警戒"}
              />
              <XMarkerLine
                value={new Date("2021-06-15T00:00")}
                xScale={xScale}
                height={innerHeight}
                label={"公費疫苗大規模開打"}
              />
              <XMarkerLine
                value={new Date("2021-07-27T00:00")}
                xScale={xScale}
                height={innerHeight}
                label={"全國三級警戒解除"}
              />
              <XMarkerLine
                value={new Date("2021-12-02T00:00")}
                xScale={xScale}
                height={innerHeight}
                label={"第三劑疫苗開打"}
              />
              <XMarkerLine
                value={new Date("2022-03-07T00:00")}
                xScale={xScale}
                height={innerHeight}
                label={"開放商務客入境，檢疫十天"}
              />
              <XMarkerLine
                value={new Date("2022-04-06T00:00")}
                xScale={xScale}
                height={innerHeight}
                label={"居家檢疫放寬，可同戶隔離"}
              />

              {activeDate ? (
                <>
                  <CursorLine
                    value={activeDate}
                    xScale={xScale}
                    height={innerHeight}
                  />

                  <g
                    transform={`translate(${areaGenerator.x()(
                      dataTop.find(
                        (obj) => obj.date.valueOf() === activeDate.valueOf()
                      )
                    )}, ${areaGenerator.y1()(
                      dataTop.find(
                        (obj) => obj.date.valueOf() === activeDate.valueOf()
                      )
                    )})`}
                  >
                    <circle className={styles.dataPoint} r={5} />
                    <Tooltip
                      colorScale={colorScale}
                      dataTop={dataTop}
                      dataDown={dataDown}
                      activeDate={activeDate}
                      className={styles.tooltipStroke}
                      xTooltipFormat={xTooltipFormat}
                    />
                    <Tooltip
                      colorScale={colorScale}
                      dataTop={dataTop}
                      dataDown={dataDown}
                      activeDate={activeDate}
                      className={styles.tooltip}
                      xTooltipFormat={xTooltipFormat}
                    />
                  </g>

                  <g
                    transform={`translate(${areaGeneratorDown.x()(
                      dataDown.find(
                        (obj) => obj.date.valueOf() === activeDate.valueOf()
                      )
                    )}, ${areaGeneratorDown.y1()(
                      dataDown.find(
                        (obj) => obj.date.valueOf() === activeDate.valueOf()
                      )
                    )})`}
                  >
                    <circle className={styles.dataPoint} r={5} />
                  </g>
                </>
              ) : null}

              <g
                transform={`translate(${legendCircleRadius}, ${
                  -legendCircleRadius * 2
                })`}
              >
                <ColorLegend
                  colorScale={colorScale}
                  tickSpacing={legendItemSpacing}
                  tickSize={legendCircleRadius}
                  tickTextOffset={legendCircleRadius * 2}
                />
              </g>

              <RectOverlay
                onHover={handleVoronoiHover}
                data={dataTop}
                areaGenerator={areaGenerator}
                innerWidth={totalWidth}
                innerHeight={innerHeight}
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};
