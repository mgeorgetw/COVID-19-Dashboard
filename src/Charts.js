import React, { useState, useEffect, useReducer, useCallback } from "react";
import * as V from "victory";

// API Users
// Generic hook to fetch data v1
const useDataApi = (initialUrl, initialData, transformFn) => {
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
        setData((transformFn && transformFn(data)) || data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url, transformFn]);
  return [{ data, isLoading, isError }, setUrl];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const useDataApiReducer = (initialUrl, initialData, transformFn) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: initialData
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({
          type: "FETCH_SUCCESS",
          payload: (transformFn && transformFn(data)) || data
        });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchData();
  }, [transformFn, url]);
  return [state, setUrl];
};

// SMALL COMPONENTS / HELPER FUNCTIONS
const CountriesDropDownMenu = ({ data, chosen, setChosen }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(
      data.map(d => ({
        label: d.province ? d.province + ", " + d.country : d.country,
        value: d.province ? d.province : d.country
      }))
    );
  }, [data]);
  return (
    <div className="dropdown-container">
      Select:{" "}
      <select value={chosen} onChange={e => setChosen(e.currentTarget.value)}>
        {items.map(({ label, value }) => (
          <option className="region-name" key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

const BarChart = ({ data, x, y }) => {
  const axis_style = {
    grid: {
      stroke: "#f3f5f6",
      strokeWidth: 2,
      strokeDasharray: "15,15"
    }
  };
  return (
    <div className="bar-chart">
      <V.VictoryChart
        containerComponent={
          <V.VictoryVoronoiContainer
            labels={({ datum }) =>
              datum.x ? `${datum.x}: ${datum._y}` : `${datum[x]}: ${datum._y}`
            }
            labelComponent={<V.VictoryTooltip constrainToVisibleArea />}
          />
        }
        padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
      >
        <V.VictoryAxis fixLabelOverlap />
        <V.VictoryAxis dependentAxis fixLabelOverlap style={axis_style} />
        <V.VictoryBar data={data} x={x} y={y} />
      </V.VictoryChart>
    </div>
  );
};

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

const RadioButton = props => {
  return (
    <div className="radio-btn">
      <input
        id={props.id}
        type="radio"
        onChange={props.changed}
        checked={props.isSelected}
      />
      <label htmlFor={props.id}>{props.label}</label>
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
                {item.datum.toLocaleString()}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const calPercentage = (numerator, denominator) =>
  Number(((numerator / denominator) * 100).toFixed(2));

const sumValuesInObject = (data, key) =>
  data.reduce(
    (prev, cur) => (parseInt(prev) || 0) + (parseInt(cur[key]) || 0),
    0
  );

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
          <BarChart data={data.statisticsData} x="dateId" y="confirmedIncr" />
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

const DailyLineChartInAnArea = ({ chart_type }) => {
  const [{ data, isLoading, isError }] = useDataApi(
    "https://corona.lmao.ninja/v2/historical",
    null
  );
  const [chosen, setChosen] = useState("USA");
  const [lineData, setLineData] = useState({});
  const CHART_TYPES = {
    newCases: "Daily New Cases in ",
    newDeaths: "Daily Deaths in ",
    deathRate: "Fatality Rate in "
  };
  const ChartTitle = ({ chart_type, area_name }) => {
    return (
      <div className="chart-title">
        {CHART_TYPES[chart_type]}
        {area_name}
      </div>
    );
  };
  const getSTItems = (chart_type, data) =>
    ({
      newCases: [
        {
          heading: "Total cases",
          datum: data.cases.slice(-1)[0].y
        },
        {
          heading: "New cases",
          datum: data.newCases.slice(-1)[0].y
        },
        {
          heading: "Growth Factor",
          datum: (
            data.newCases.slice(-1)[0].y / data.newCases.slice(-2)[0].y
          ).toFixed(2)
        }
      ],
      newDeaths: [
        {
          heading: "Total deaths",
          datum: data.deaths.slice(-1)[0].y
        },
        {
          heading: "New deaths",
          datum: data.newDeaths.slice(-1)[0].y
        },
        {
          heading: "Fatality Rate",
          datum: data.deathRate.slice(-1)[0].y + "%"
        }
      ],
      deathRate: [
        {
          heading: "Confirmed",
          datum: data.cases.slice(-1)[0].y
        },
        {
          heading: "Deaths",
          datum: data.deaths.slice(-1)[0].y
        },
        {
          heading: "Fatality Rate",
          datum: data.deathRate.slice(-1)[0].y + "%"
        }
      ]
    }[chart_type]);
  useEffect(() => {
    // Helper functions
    // Transposes {'Key': 'Value'} to {x: key, y:value}
    const transposeKeyValue = data =>
      Object.entries(data).map(([key, value]) => ({
        // Shortens date string
        x: key.replace(/\/\d{2}$/g, ""),
        y: value
      }));

    // Calculates daily new cases & deaths
    const calDailyDifference = data =>
      data.map((cur, index, array) => ({
        ...cur,
        y: index > 0 ? cur.y - array[index - 1].y : 0
      }));

    if (data) {
      let found = data.find(
        obj =>
          obj.province === chosen || (!obj.province && obj.country === chosen)
      );
      let cases = transposeKeyValue(found.timeline.cases);
      let deaths = transposeKeyValue(found.timeline.deaths);
      let new_cases = calDailyDifference(cases);
      let new_deaths = calDailyDifference(deaths);
      let death_rate = cases.map((cur, index) => ({
        x: cur.x,
        y: calPercentage(deaths[index].y, cur.y) || 0
      }));
      setLineData({
        country: found.country,
        province: found.province,
        cases: cases,
        deaths: deaths,
        newCases: new_cases,
        newDeaths: new_deaths,
        deathRate: death_rate
      });
    }
  }, [data, chosen]);
  return (
    <>
      {isError && <div>Something went wrong</div>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="chart-container">
          <ChartTitle
            chart_type={chart_type}
            area_name={
              lineData.province
                ? lineData.province + ", " + lineData.country
                : lineData.country
            }
          />
          <CountriesDropDownMenu
            data={data}
            chosen={chosen}
            setChosen={setChosen}
          />
          <SmallTable items={getSTItems(chart_type, lineData)} />
          <BarChart data={lineData[chart_type]} />
          <p className="footnote">
            Source: John Hopkins University CSSE (
            <a href="https://github.com/NovelCOVID/API">NovelCOVID/API</a>)
          </p>
        </div>
      )}
    </>
  );
};

const ConfirmedCasesChinaVsWorldLineChart = () => {
  const replaceDate = dataItem => ({
    ...dataItem,
    reportDate: dataItem.reportDate.replace(/-/g, "/").replace(/^\d{4}\//g, "")
  });
  const transformFn = useCallback(data => data.map(replaceDate), []);
  const [{ data, isLoading, isError }] = useDataApiReducer(
    "https://covid.mathdro.id/api/daily",
    [],
    transformFn
  );
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
          "Japan",
          "France"
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
            padding={{ top: 20, bottom: 40, left: 55, right: 20 }}
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
              x={55}
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

const AreasWithOutstandingCasesTable2 = () => {
  const [{ data, isLoading, isError }] = useDataApiReducer(
    "https://corona.lmao.ninja/countries",
    []
  );
  const [sortBy, setSortBy] = useState("cases");
  return (
    <>
      <div className="chart-title">Areas with Outstanding Cases</div>
      {isError && <div>Something went wrong</div>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="radio-btn-container">
            <RadioButton
              id="1"
              changed={() => setSortBy("cases")}
              isSelected={sortBy === "cases" ? true : false}
              label="Total cases"
            />
            <RadioButton
              id="2"
              changed={() => setSortBy("deaths")}
              isSelected={sortBy === "deaths" ? true : false}
              label="Total deaths"
            />
            <RadioButton
              id="3"
              changed={() => setSortBy("todayCases")}
              isSelected={sortBy === "todayCases" ? true : false}
              label="New cases"
            />
            <RadioButton
              id="4"
              changed={() => setSortBy("todayDeaths")}
              isSelected={sortBy === "todayDeaths" ? true : false}
              label="New deaths"
            />
          </div>
          <div className="area-data-sets">
            {data
              .sort((a, b) => b[sortBy] - a[sortBy])
              .slice(0, 10)
              .map(d => (
                <div className="data-set" key={d.country}>
                  <div className="country-name vertical-inverted-title">
                    {d.country}
                  </div>
                  <div className="set-title">Confirmed</div>
                  <div className="confirmed-count numerical-data">
                    {d.cases}
                  </div>
                  <div className="smaller-numbers numerical-data">
                    (+{d.todayCases})
                  </div>
                  <div className="set-title">Deaths</div>
                  <div className="dead-count numerical-data">{d.deaths}</div>
                  <div className="smaller-numbers numerical-data">
                    (+{d.todayDeaths})
                  </div>
                  <div className="set-title">Death Rate</div>
                  <div className="current-dead-rate numerical-data">
                    {calPercentage(d.deaths, d.cases)}%
                  </div>
                </div>
              ))}
          </div>
          <p className="footnote">
            Source: Johns Hopkins University Center for Systems Science and
            Engineering (
            <a href="https://github.com/NovelCOVID/API">NovelCOVID / API</a>)
          </p>
        </>
      )}
    </>
  );
};

const AreasWithOutstandingCasesTable = () => {
  const [{ data, isLoading, isError }] = useDataApiReducer(
    "/daily_reports",
    []
  );
  return (
    <>
      <div className="chart-title">Areas with Outstanding Cases</div>
      {isError && <div>Something went wrong</div>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="area-data-sets">
            {data
              .sort((a, b) => b.Confirmed - a.Confirmed)
              .slice(0, 10)
              .map(d => (
                <div
                  className="data-set"
                  key={
                    d["Province_State"]
                      ? d["Province_State"]
                      : d["Country_Region"]
                  }
                >
                  <div className="country-name">{d["Combined_Key"]}</div>
                  <div className="set-title">Confirmed</div>
                  <div className="confirmed-count numerical-data">
                    {d["Confirmed"]}
                  </div>
                  <div className="set-title">Deaths</div>
                  <div className="dead-count numerical-data">{d["Deaths"]}</div>
                  <div className="set-title">Death Rate</div>
                  <div className="current-dead-rate numerical-data">
                    {calPercentage(d["Deaths"], d["Confirmed"])}%
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
      )}
    </>
  );
};

const FatalityRatioByAgeGroupInHubei = () => {
  const data = [
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
            data={data}
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
          <BarChart data={data.statisticsData} x="dateId" y="deathRate" />
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
  const replaceDate = dataItem => ({
    ...dataItem,
    reportDate: dataItem.reportDate.replace(/-/g, "/").replace(/^\d{4}\//g, "")
  });
  const transformFn = useCallback(data => data.map(replaceDate), []);
  const [{ data, isLoading, isError }] = useDataApiReducer(
    "https://covid.mathdro.id/api/daily",
    [],
    transformFn
  );
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
                datum: data.slice(-2)[0].deltaConfirmed
              },
              {
                heading: "Yesterday",
                datum: data.slice(-1)[0].deltaConfirmed
              },
              {
                heading: "Growth Factor",
                datum: (
                  data.slice(-1)[0].deltaConfirmed /
                  data.slice(-2)[0].deltaConfirmed
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
              padding={{ top: 20, bottom: 40, left: 55, right: 20 }}
            >
              <V.VictoryAxis fixLabelOverlap />
              <V.VictoryAxis dependentAxis fixLabelOverlap style={axis_style} />
              <V.VictoryArea data={data} x="reportDate" y="deltaConfirmed" />
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
  const transformFn = useCallback(data => {
    let confirmed = sumValuesInObject(data.data, "Confirmed");
    let deaths = sumValuesInObject(data.data, "Deaths");
    let recovered = sumValuesInObject(data.data, "Recovered");
    let deathRate = calPercentage(deaths, confirmed);
    return {
      confirmed: confirmed,
      deaths: deaths,
      recovered: recovered,
      deathRate: deathRate
    };
  }, []);
  const [{ data, isLoading, isError }] = useDataApiReducer(
    "/daily_reports",
    [],
    transformFn
  );
  const pieData = [
    { x: "Recovered", y: data.recovered },
    { x: "Sick", y: data.confirmed - data.deaths - data.recovered },
    { x: "Deaths", y: data.deaths }
  ];
  return (
    <>
      <div className="chart-title">Worldwide Recovery Progress</div>
      {isError && <div>Something went wrong</div>}
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
            <svg className="pie" width={310} height={310}>
              <V.VictoryLabel
                textAnchor="middle"
                x={155}
                y={155}
                style={{ fontSize: 30, fill: "#85b135" }}
                text={calPercentage(data.recovered, data.confirmed) + "%"}
              />
              <V.VictoryPie
                colorScale={["#85b135", "#fb6361", "#073f5c"]}
                innerRadius={70}
                width={310}
                height={310}
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
  AreasWithOutstandingCasesTable2,
  DailyNewCasesInAnAreaLineChart,
  DailyLineChartInAnArea,
  ConfirmedCasesChinaVsWorldLineChart,
  ConfirmedCasesInSelectedCountriesLineChart,
  FatalityRatioByAgeGroupInHubei,
  FatalityRateInAnAreaLineChart,
  DailyNewCasesWorldwideLineChart,
  WorldwideRecoveryProgressPieChart
};
