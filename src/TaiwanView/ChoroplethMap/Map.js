import { useState } from "react";
// import { Marks } from "./Marks";
import { TaiwanMarks } from "./TaiwanMarks";
import { scaleSequential, interpolateGreys, max } from "d3";
import styles from "./ChoroplethMap.module.css";

const width = window.innerWidth < 1000 ? window.innerWidth : 1000;
const height = width > 480 ? width * 0.9 : width * 1.1;

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
    <input
      className={styles.slider}
      type="range"
      min="0"
      max={range.length - 1}
      value={range.indexOf(selected)}
      onChange={(e) => handleChange(range[e.target.value])}
    />
    <pre>{selected}</pre>
  </div>
);

export const Map = ({ data, atlas, view }) => {
  const [selectedDate, setSelectedDate] = useState(data[0].a01);

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

  return (
    <>
      <Slider
        range={allDates}
        selected={selectedDate}
        handleChange={setSelectedDate}
      />
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMid">
        <TaiwanMarks
          atlas={atlas}
          colorScale={colorScale}
          data={transformedData}
          view={view}
        />
      </svg>
    </>
  );
};
