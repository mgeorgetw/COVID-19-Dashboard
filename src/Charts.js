import React, { useState, useEffect } from "react";
import * as V from "victory";

// API Users
const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  return [{ data, isLoading, isError }, setData, setUrl];
};

// SMALL COMPONENTS / HELPER FUNCTIONS
const LoadingSpinner = () => {
  return (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const SmallTable = ({ items }) => {
  return (
    <div className="small-table">
      <table>
        <thead>
          <tr>
            {items.map(item => (
              <th key={item.heading}>{item.heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {items.map((item, index) => (
              <td className="numerical-data" key={index}>
                {item.datum}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const LineChart = ({ data, x, y }) => {
  const axis_style = {
    grid: {
      stroke: "#f3f5f6",
      strokeWidth: 2,
      strokeDasharray: "15,15"
    }
  };
  return (
    <div className="line-chart">
      <V.VictoryChart
        containerComponent={
          <V.VictoryVoronoiContainer
            labels={({ datum }) => `${datum[x]}: ${datum._y}`}
            labelComponent={<V.VictoryTooltip constrainToVisibleArea />}
          />
        }
        padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
      >
        <V.VictoryAxis fixLabelOverlap />
        <V.VictoryAxis dependentAxis fixLabelOverlap style={axis_style} />
        <V.VictoryLine data={data} x={x} y={y} />
      </V.VictoryChart>
    </div>
  );
};

// Charts
const DailyNewCasesInAnAreaLineChart = ({ area }) => {
  const [data, setData] = useState({ areaName: "", statisticsData: [] });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch(`area_timeseries?area=${area}`);
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [area]);
  return (
    <>
      <div className="chart-title">Daily New Cases in {data.areaName}</div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SmallTable
            items={[
              {
                heading: "2 days ago",
                datum: data.statisticsData.slice(-2)[0].confirmedIncr
              },
              {
                heading: "Yesterday",
                datum: data.statisticsData.slice(-1)[0].confirmedIncr
              },
              {
                heading: "Growth Factor",
                datum: data.statisticsData.slice(-1)[0].growthFactor
              }
            ]}
          />
          <LineChart data={data.statisticsData} x="dateId" y="confirmedIncr" />
          <p className="footnote">
            Source: 丁香園（
            <a href="https://github.com/BlankerL/DXY-COVID-19-Crawler">
              DXY-COVID-19-Crawler
            </a>
            ）
          </p>
        </>
      )}
    </>
  );
};

const ConfirmedCasesChinaVsWorldLineChart = () => {
  const [{ data, isLoading, isError }, setData] = useDataApi(
    "https://covid.mathdro.id/api/daily",
    []
  );
  useEffect(() => {
    // Shortens date strings to show more on the axis
    data.forEach(
      d =>
        (d.reportDate = d.reportDate
          .replace(/-/g, "/")
          .replace(/^\d{4}\//g, ""))
    );
    setData(data);
  }, [data, setData]);
  return (
    <>
      {isError && <div>Something went wrong</div>}
      <div className="chart-title">Confirmed Cases</div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SmallTable
            items={[
              { heading: "China", datum: data.slice(-1)[0].mainlandChina },
              {
                heading: "Other",
                datum: data.slice(-1)[0].otherLocations
              }
            ]}
          />
          <div className="line-chart">
            <V.VictoryChart
              containerComponent={
                <V.VictoryVoronoiContainer
                  labels={({ datum }) => `${datum["reportDate"]}: ${datum._y}`}
                  labelComponent={<V.VictoryTooltip constrainToVisibleArea />}
                />
              }
              padding={{ top: 20, bottom: 40, left: 60, right: 20 }}
            >
              <V.VictoryAxis fixLabelOverlap />
              <V.VictoryAxis
                dependentAxis
                fixLabelOverlap
                style={{
                  grid: {
                    stroke: "#f3f5f6",
                    strokeWidth: 2,
                    strokeDasharray: "15,15"
                  }
                }}
              />
              <V.VictoryGroup colorScale={["#fb6361", "black"]}>
                <V.VictoryLine data={data} x="reportDate" y="mainlandChina" />
                <V.VictoryLine data={data} x="reportDate" y="otherLocations" />
              </V.VictoryGroup>
              <V.VictoryLegend
                colorScale={["#fb6361", "black"]}
                x={60}
                y={20}
                data={[{ name: "China" }, { name: "Other Countries" }]}
              />
            </V.VictoryChart>
          </div>
          <p className="footnote">
            Source: Johns Hopkins University Center for Systems Science and
            Engineering (
            <a href="https://github.com/mathdroid/covid-19-api">
              mathdroid/covid-19-api
            </a>
            )
          </p>
        </>
      )}
    </>
  );
};

const ConfirmedCasesInSelectedCountriesLineChart = () => {
  const [data, setData] = useState([
    {
      province: "",
      country: "",
      Lat: 0,
      Long: 0,
      confirmed: []
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch(`/confirmed_timeseries`);
        const data = await response.json();
        // Areas selected arbitrarily
        // TODO: An UI for user to choose which areas to be shown
        const areas_to_find = [
          "Italy",
          "Iran",
          "Spain",
          "Germany",
          "Korea, South",
          "US",
          "Japan"
        ];
        let areas_data = [];
        for (let area of areas_to_find) {
          let found = data.data.find(
            obj =>
              obj.province === area || (!obj.province && obj.country === area)
          );
          areas_data.push(found);
        }
        setData(areas_data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  return (
    <>
      <div className="chart-title">Confirmed Cases in Selected Countries</div>
      <div className="line-chart">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <V.VictoryChart
            containerComponent={
              <V.VictoryVoronoiContainer
                labels={({ datum }) => datum._y}
                labelComponent={<V.VictoryTooltip constrainToVisibleArea />}
              />
            }
            padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
            scale={{ x: "time", y: "linear" }}
            minDomain={{ x: 30 }}
          >
            <V.VictoryAxis fixLabelOverlap />
            <V.VictoryAxis
              dependentAxis
              fixLabelOverlap
              style={{
                grid: {
                  stroke: "#f3f5f6",
                  strokeWidth: 2,
                  strokeDasharray: "15,15"
                }
              }}
            />
            <V.VictoryGroup colorScale={"qualitative"}>
              {data.map(d => (
                <V.VictoryLine
                  key={d.province ? d.province : d.country}
                  data={d.confirmed}
                />
              ))}
            </V.VictoryGroup>
            <V.VictoryLegend
              colorScale={"qualitative"}
              orientation="horizontal"
              itemsPerRow={3}
              x={50}
              y={20}
              data={data.map(d => ({
                name: d.province ? d.province : d.country
              }))}
            />
          </V.VictoryChart>
        )}
      </div>
      <p className="footnote">
        Source: Johns Hopkins University Center for Systems Science and
        Engineering (
        <a href="https://github.com/CSSEGISandData/COVID-19">
          CSSEGISandData/COVID-19
        </a>
        )
      </p>
    </>
  );
};

const AreasWithOutstandingCasesTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/daily_reports");
      const data = await response.json();
      let sorted_data = data.data.sort((a, b) => b.Confirmed - a.Confirmed);
      setData(sorted_data);
    };
    getData();
  }, []);
  return (
    <>
      <div className="chart-title">Areas with Outstanding Cases</div>
      <div className="area-data-sets">
        {data.slice(0, 10).map(d => (
          <div
            className="data-set"
            key={
              d["Province_State"] ? d["Province_State"] : d["Country_Region"]
            }
          >
            <div className="country-name">
              {d["Province_State"] ? d["Province_State"] : d["Country_Region"]}
            </div>
            <div className="set-title">Confirmed</div>
            <div className="confirmed-count numerical-data">
              {d["Confirmed"]}
            </div>
            <div className="set-title">Deaths</div>
            <div className="dead-count numerical-data">{d["Deaths"]}</div>
            <div className="set-title">Death Rate</div>
            <div className="current-dead-rate numerical-data">
              {((d["Deaths"] / d["Confirmed"]) * 100).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
      <p className="footnote">
        Source: Johns Hopkins University Center for Systems Science and
        Engineering (
        <a href="https://github.com/CSSEGISandData/COVID-19">
          CSSEGISandData/COVID-19
        </a>
        )
      </p>
    </>
  );
};

const FatalityRatioByAgeGroupInHubei = () => {
  const pie_data = [
    { x: "0-9", y: 0.000094 },
    { x: "10-19", y: 0.022 },
    { x: "20-29", y: 0.091 },
    { x: "30-39", y: 0.18 },
    { x: "40-49", y: 0.4 },
    { x: "50-59", y: 1.3 },
    { x: "60-69", y: 4.6 },
    { x: "70-79", y: 9.8 },
    { x: "80+", y: 18 }
  ];
  return (
    <>
      <div className="chart-title">
        Fatality Ratio by Age Group in Hubei, China
      </div>
      <div className="bar-chart">
        <V.VictoryChart
          domainPadding={{ x: 10 }}
          padding={{ top: 15, bottom: 40, left: 50, right: 50 }}
        >
          <V.VictoryAxis
            dependentAxis
            style={{
              grid: {
                stroke: "#f3f5f6",
                strokeWidth: 2,
                strokeDasharray: "15,15"
              }
            }}
          />
          <V.VictoryBar
            horizontal
            barRatio={0.8}
            data={pie_data}
            labels={({ datum }) => datum.y + "%"}
          />
          <V.VictoryAxis />
        </V.VictoryChart>
        <p className="footnote">
          Source: WHO;{" "}
          <a href="https://www.medrxiv.org/content/10.1101/2020.03.04.20031104v1.full.pdf">
            "ADJUSTED AGE-SPECIFIC CASE FATALITY RATIO DURING THE COVID-19
            EPIDEMIC IN HUBEI, CHINA, JANUARY AND FEBRUARY 2020" by Riou et al."
          </a>
        </p>
      </div>
    </>
  );
};

const FatalityRateInAnAreaLineChart = ({ area }) => {
  const [data, setData] = useState({ areaName: "", statisticsData: [] });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch(`area_timeseries?area=${area}`);
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [area]);
  return (
    <>
      <div className="chart-title">Fatality Rate in {data.areaName}</div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SmallTable
            items={[
              {
                heading: "Confirmed",
                datum: data.statisticsData.slice(-1)[0].confirmedCount
              },
              {
                heading: "Deaths",
                datum: data.statisticsData.slice(-1)[0].deadCount
              },
              {
                heading: "Fatality Rate",
                datum: data.statisticsData.slice(-1)[0].deathRate + "%"
              }
            ]}
          />
          <LineChart data={data.statisticsData} x="dateId" y="deathRate" />
          <p className="footnote">
            Source: 丁香園（
            <a href="https://github.com/BlankerL/DXY-COVID-19-Crawler">
              DXY-COVID-19-Crawler
            </a>
            ）
          </p>
        </>
      )}
    </>
  );
};

const DailyNewCasesWorldwideLineChart = () => {
  const [{ data, isLoading, isError }, setData] = useDataApi(
    "https://covid.mathdro.id/api/daily",
    []
  );
  useEffect(() => {
    // Shortens date strings to show more on the axis
    data.forEach(
      d =>
        (d.reportDate = d.reportDate
          .replace(/-/g, "/")
          .replace(/^\d{4}\//g, ""))
    );
    setData(data);
  }, [data, setData]);
  //const [{ data, isLoading, isError }] = useDataApi();
  const axis_style = {
    grid: {
      stroke: "#f3f5f6",
      strokeWidth: 2,
      strokeDasharray: "15,15"
    }
  };
  return (
    <>
      <div className="chart-title">Daily New Cases Worldwide</div>
      {isError && <div>Something went wrong</div>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SmallTable
            items={[
              {
                heading: "2 days ago",
                datum: data[data.length - 2].deltaConfirmed
              },
              {
                heading: "Yesterday",
                datum: data[data.length - 1].deltaConfirmed
              },
              {
                heading: "Growth Factor",
                datum: (
                  data[data.length - 1].deltaConfirmed /
                  data[data.length - 2].deltaConfirmed
                ).toFixed(2)
              }
            ]}
          />
          <div className="line-chart">
            <V.VictoryChart
              containerComponent={
                <V.VictoryVoronoiContainer
                  labels={({ datum }) => `${datum["reportDate"]}: ${datum._y}`}
                  labelComponent={<V.VictoryTooltip constrainToVisibleArea />}
                />
              }
              padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
            >
              <V.VictoryAxis fixLabelOverlap />
              <V.VictoryAxis dependentAxis fixLabelOverlap style={axis_style} />
              <V.VictoryLine data={data} x="reportDate" y="deltaConfirmed" />
              {/* <V.VictoryLabel */}
              {/*   text="中國加入臨床確診" */}
              {/*   datum={{ x: 23, y: 16500 }} */}
              {/*   textAnchor="end" */}
              {/*   style={{ fontSize: 11 }} */}
              {/* /> */}
            </V.VictoryChart>
          </div>
          <p className="footnote">
            Source: Johns Hopkins University Center for Systems Science and
            Engineering (
            <a href="https://github.com/mathdroid/covid-19-api">
              mathdroid/covid-19-api
            </a>
            )
          </p>
        </>
      )}
    </>
  );
};

const WorldwideRecoveryProgressPieChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pieData = [
    { x: "Recovered", y: data.recovered },
    { x: "Sick", y: data.confirmed - data.deaths - data.recovered },
    { x: "Deaths", y: data.deaths }
  ];
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetch("/daily_reports");
      let data = await response.json();
      let confirmed = data.data.reduce(
        (prev, cur) =>
          (parseInt(prev) || 0) + (parseInt(cur["Confirmed"]) || 0),
        0
      );
      let deaths = data.data.reduce(
        (prev, cur) => (parseInt(prev) || 0) + (parseInt(cur["Deaths"]) || 0),
        0
      );
      let recovered = data.data.reduce(
        (prev, cur) =>
          (parseInt(prev) || 0) + (parseInt(cur["Recovered"]) || 0),
        0
      );
      let deathRate = ((deaths / confirmed) * 100).toFixed(2);
      setData({
        confirmed: confirmed,
        deaths: deaths,
        recovered: recovered,
        deathRate: deathRate
      });
      setIsLoading(false);
    };
    getData();
  }, []);
  return (
    <>
      <div className="chart-title">
        Worldwide Recovery Progress from COVID-19
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SmallTable
            items={[
              { heading: "Confirmed", datum: data.confirmed },
              { heading: "Recovered", datum: data.recovered },
              { heading: "Deaths", datum: data.deaths },
              { heading: "Death Rate", datum: data.deathRate + "%" }
            ]}
          />
          <div className="pie-chart">
            <svg className="pie" width={350} height={350}>
              <text x="50%" y="53%" textAnchor="middle">
                {((data.recovered / data.confirmed) * 100).toFixed(2)}%
              </text>
              <V.VictoryPie
                colorScale={["#85b135", "#fb6361", "#073f5c"]}
                innerRadius={80}
                width={350}
                height={350}
                standalone={false}
                data={pieData}
                labels={({ datum }) => datum.x}
              />
            </svg>
            <p className="footnote">
              Source: Johns Hopkins University Center for Systems Science and
              Engineering (
              <a href="https://github.com/CSSEGISandData/COVID-19">
                CSSEGISandData/COVID-19
              </a>
              )
            </p>
          </div>
        </>
      )}
    </>
  );
};

export {
  AreasWithOutstandingCasesTable,
  DailyNewCasesInAnAreaLineChart,
  ConfirmedCasesChinaVsWorldLineChart,
  ConfirmedCasesInSelectedCountriesLineChart,
  FatalityRatioByAgeGroupInHubei,
  FatalityRateInAnAreaLineChart,
  DailyNewCasesWorldwideLineChart,
  WorldwideRecoveryProgressPieChart
};
