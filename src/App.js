import React, { useState, useEffect } from "react";
import "./App.css";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryPie,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

const LineChart = ({ data, x, y }) => {
  return (
    <div className="line-chart">
      <VictoryChart
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => datum[y]}
            labelComponent={<VictoryTooltip constrainToVisibleArea />}
          />
        }
        height={220}
        width={350}
        padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
      >
        <VictoryAxis fixLabelOverlap />
        <VictoryAxis dependentAxis fixLabelOverlap />
        <VictoryLine data={data} x={x} y={y} />
      </VictoryChart>
    </div>
  );
};

const CurrentInfoByAreas = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://covid2019-api.herokuapp.com/current"
      );
      const data = await response.json();
      setData(data);
    };
    getData();
  }, []);
  return (
    <div className="area-data-sets">
      {Object.keys(data)
        .slice(0, 10)
        .map(d => (
          <div className="data-set" key={d}>
            <div className="country-name">{d}</div>
            <div className="set-title">累計確診</div>
            <div className="confirmed-count numerical-data">
              {data[d].confirmed}
            </div>
            <div className="set-title">累計死亡</div>
            <div className="dead-count numerical-data">{data[d].deaths}</div>
            <div className="set-title">病死率</div>
            <div className="current-dead-rate numerical-data">
              {((data[d].deaths / data[d].confirmed) * 100).toFixed(2)}%
            </div>
          </div>
        ))}
      <p className="footnote">
        ※資料來源：Johns Hopkins University Center for Systems Science and
        Engineering (
        <a href="https://github.com/nat236919/Covid2019API">COVID2019-API</a>)
      </p>
    </div>
  );
};

const InfoByAreas = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/area_latest");
      const data = await response.json();
      setData(data.latest_data);
    };
    getData();
  }, []);
  return (
    <div className="area-data-sets">
      {data.map(d => (
        <div className="data-set" key={d.country}>
          <div className="country-name">{d.country}</div>
          <div className="set-title">累計確診</div>
          <div className="confirmed-count numerical-data">
            {d.confirmedCount}
          </div>
          <div className="set-title">累計死亡</div>
          <div className="dead-count numerical-data">{d.deadCount}</div>
          <div className="set-title">病死率</div>
          <div className="current-dead-rate numerical-data">
            {d.currentDeathRate}%
          </div>
        </div>
      ))}
    </div>
  );
};

const WorldRecoveryProgressChart = () => {
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/world_overall");
      const data = await response.json();
      let pie_data = [
        { x: "病中", y: data.confirmed - data.deaths - data.recovered },
        { x: "死亡", y: data.deaths },
        { x: "病癒", y: data.recovered }
      ];
      setData(data);
      setPieData(pie_data);
    };
    getData();
  }, []);
  return (
    <>
      <div className="chart-title">全球恢復進度</div>
      <div className="small-table">
        <table>
          <thead>
            <tr>
              <th>全球確診</th>
              <th>全球死亡</th>
              <th>全球病癒</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.confirmed}</td>
              <td>{data.deaths}</td>
              <td>{data.recovered}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pie-chart">
        <svg width={350} height={350}>
          <text
            x="50%"
            y="53%"
            textAnchor="middle"
            fontSize="30"
            fontWeight="bold"
            fill="#85b135"
          >
            {((data.recovered / data.confirmed) * 100).toFixed(2)}%
          </text>
          <VictoryPie
            colorScale={["#fb6361", "#073f5c", "#85b135"]}
            innerRadius={75}
            width={350}
            height={350}
            standalone={false}
            data={pieData}
            labels={({ datum }) => datum.x}
            style={{
              labels: {
                fill: "black",
                fontSize: 15,
                fontWeight: "bold"
              }
            }}
          />
        </svg>
        <p className="footnote">
          ※資料來源：Johns Hopkins University Center for Systems Science and
          Engineering (
          <a href="https://github.com/nat236919/Covid2019API">COVID2019-API</a>)
        </p>
      </div>
    </>
  );
};

const DeathRateChartInChina = ({ data }) => {
  return (
    <>
      <div className="chart-title">中國病死率</div>
      <div className="small-table">
        <table>
          <thead>
            <tr>
              <th>累計確診</th>
              <th>累計死亡</th>
              <th>病死率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data[data.length - 1].confirmedCount}</td>
              <td>{data[data.length - 1].deadCount}</td>
              <td>{data[data.length - 1].deathRate}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <LineChart data={data} x="date" y="deathRate" />
      <p className="footnote">
        ※資料來源：丁香園（
        <a href="https://github.com/BlankerL/DXY-COVID-19-Crawler">
          DXY-COVID-19-Crawler
        </a>
        ）
      </p>
    </>
  );
};

const SevereRateChartInChina = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    async function filterData() {
      try {
        const filtered = data.filter(d => d.severeRate !== 0);
        setChartData(filtered);
      } catch (error) {
        console.error(error);
      }
    }
    filterData();
  }, [data]);
  return (
    <>
      <div className="chart-title">中國重症率</div>
      <div className="small-table">
        <table>
          <thead>
            <tr>
              <th>現存確診</th>
              <th>現存重症</th>
              <th>重症率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data[data.length - 1].currentConfirmedCount}</td>
              <td>{data[data.length - 1].seriousCount}</td>
              <td>{data[data.length - 1].severeRate}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <LineChart data={chartData} x="date" y="severeRate" />
      <p className="footnote">
        ※資料來源：丁香園（
        <a href="https://github.com/BlankerL/DXY-COVID-19-Crawler">
          DXY-COVID-19-Crawler
        </a>
        ）
      </p>
    </>
  );
};
function getToday() {
  var time = new Date();
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var formattedDate = year + "/" + month + "/" + date;
  return formattedDate;
}

const App = () => {
  const [data, setData] = useState([
    {
      date: "",
      confirmedCount: 0,
      deadCount: 0,
      currentConfirmedCount: 0,
      seriousCount: 0,
      deathRate: 0,
      severeRate: 0
    }
  ]);
  const layoutlg = [
    { i: "0", x: 0, y: 0, w: 12, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 12, h: 5, maxH: 15 },
    { i: "b", x: 0, y: 0, w: 6, h: 13 },
    { i: "c", x: 6, y: 0, w: 6, h: 13 },
    { i: "d", x: 0, y: 0, w: 5, h: 13 }
  ];
  const layoutmd = [
    { i: "0", x: 0, y: 0, w: 10, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 10, h: 9, maxH: 15 },
    { i: "b", x: 0, y: 0, w: 5, h: 11 },
    { i: "c", x: 5, y: 0, w: 5, h: 11 },
    { i: "d", x: 0, y: 0, w: 5, h: 13 }
  ];
  const layoutsm = [
    { i: "0", x: 0, y: 0, w: 6, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 6, h: 10, maxH: 15 },
    { i: "b", x: 0, y: 0, w: 6, h: 13 },
    { i: "c", x: 0, y: 0, w: 6, h: 13 },
    { i: "d", x: 0, y: 0, w: 6, h: 13 }
  ];
  const layoutxs = [
    { i: "0", x: 0, y: 0, w: 4, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 4, h: 13 },
    { i: "b", x: 0, y: 0, w: 4, h: 13 },
    { i: "c", x: 0, y: 0, w: 4, h: 13 },
    { i: "d", x: 0, y: 0, w: 4, h: 13 }
  ];
  const layouts = {
    lg: layoutlg,
    md: layoutmd,
    sm: layoutsm,
    xs: layoutxs
  };
  useEffect(() => {
    async function getData() {
      try {
        const getData = async () => {
          const response = await fetch("china_overall");
          const data = await response.json();
          setData(data.dailyRates);
        };
        getData();
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="App">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        rowHeight={30}
        breakpoints={{ lg: 1200, md: 710, sm: 590, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        <div key="0">
          <h1 className="app-title">
            COVID-19 疫情追蹤<span className="title-date">{getToday()}</span>
          </h1>
        </div>
        <div key="a">
          {/* <InfoByAreas /> */}
          <CurrentInfoByAreas />
        </div>
        <div key="b">
          <DeathRateChartInChina data={data} />
        </div>
        <div key="c">
          <SevereRateChartInChina data={data} />
        </div>
        <div key="d">
          <WorldRecoveryProgressChart />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default App;
