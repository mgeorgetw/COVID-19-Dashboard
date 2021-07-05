import { useState } from "react";
import { scaleSequential, interpolateGreys, max, scaleLinear } from "d3";
import { AxisBottom } from "./AxisBottom";
import { TaiwanMarks } from "./TaiwanMarks";
import styles from "./ChoroplethMap.module.css";

const width = window.innerWidth < 800 ? window.innerWidth : 800;
const height = width > 480 ? width * 0.9 : width * 1.6;
const viewBoxWidth = width + 50;

const xAxisTickFormat = (d) => d;
const legendPadding = 5;
const legendWidth = viewBoxWidth - legendPadding * 2;

const transformData = (data, view) => {
  let obj = { date: data[0]["日期"], dateString: data[0].a01 };
  if (view === "全台灣") {
    data.map(({ 縣市別, 累計確診人數 }) => (obj[縣市別] = 累計確診人數));
  } else {
    data.map(({ 區域, 累計確診人數 }) => (obj[區域] = 累計確診人數));
  }
  return obj;
};

const Slider = ({ range, selected, handleChange }) => (
  <div className={styles.sliderContainer}>
    <pre>{selected}</pre>
    <input
      className={styles.slider}
      type="range"
      min="0"
      max={range.length - 1}
      value={range.indexOf(selected)}
      onChange={(e) => handleChange(range[e.target.value])}
    />
  </div>
);

export const Map = ({ data, atlas, view }) => {
  const [selectedDate, setSelectedDate] = useState(data[0].a01);
  const [hoveredValue, setHoveredValue] = useState(null);

  // Choropleth Map can only display one day of data
  const filteredData =
    view === "全台灣"
      ? data.filter((d) => d["區域"] === "全區")
      : data.filter((d) => d["縣市別"] === view);

  const allDates = Array.from(
    new Set(filteredData.map((d) => d.a01))
  ).reverse();

  const selectedData = filteredData.filter(
    (d) => d["日期"].valueOf() === new Date(selectedDate).valueOf()
  );

  const transformedData = transformData(selectedData, view);

  const colorScale = scaleSequential(interpolateGreys).domain([
    0,
    max(filteredData.map((d) => d["累計確診人數"])),
  ]);

  const xScale = scaleLinear()
    .range([0, legendWidth])
    .domain(colorScale.domain());

  return (
    <>
      <Slider
        range={allDates}
        selected={selectedDate}
        handleChange={setSelectedDate}
      />
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${height}`}
        preserveAspectRatio="xMinYMid"
      >
        <TaiwanMarks
          atlas={atlas}
          colorScale={colorScale}
          data={transformedData}
          hoveredValue={hoveredValue}
          onHover={setHoveredValue}
        />
        <AxisBottom
          innerHeight={height}
          width={legendWidth}
          xScale={xScale}
          colorScale={colorScale}
          tickFormat={xAxisTickFormat}
          tickOffset={legendPadding}
          tickCount={6}
        />
      </svg>
    </>
  );
};
