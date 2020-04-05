import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import "./App.css";
import * as Charts from "./Charts.js";

// React-grid-layout
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";

// Pull to refresh
import PullToRefresh from "pulltorefreshjs";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResponsiveGridLayout = WidthProvider(Responsive);

// SMALL COMPONENTS / HELPER FUNCTIONS
function getToday() {
  var time = new Date();
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var formattedDate = year + "/" + month + "/" + date;
  return formattedDate;
}

const App = () => {
  useEffect(() => {
    PullToRefresh.init({
      mainElement: "body",
      onRefresh() {
        window.location.reload();
      },
      iconArrow: ReactDOMServer.renderToString(
        <FontAwesomeIcon icon={faSyncAlt} />
      ),
      iconRefreshing: ReactDOMServer.renderToString(
        <FontAwesomeIcon icon={faSyncAlt} spin={true} />
      )
    });
    return () => {
      PullToRefresh.destroyAll();
    };
  }, []);
  const layoutxl = [
    { i: "0", x: 0, y: 0, w: 12, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 12, h: 8 },
    { i: "b", x: 0, y: 0, w: 6, h: 18 },
    { i: "b2", x: 6, y: 0, w: 6, h: 18 },
    { i: "d", x: 0, y: 0, w: 6, h: 18 },
    { i: "e", x: 0, y: 0, w: 6, h: 18 },
    { i: "e2", x: 6, y: 0, w: 6, h: 18 },
    { i: "f", x: 0, y: 0, w: 5, h: 14 },
    { i: "f2", x: 6, y: 0, w: 3, h: 13 }
  ];
  const layoutlg = [
    { i: "0", x: 0, y: 0, w: 12, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 12, h: 13 },
    { i: "b", x: 0, y: 0, w: 6, h: 14 },
    { i: "b2", x: 6, y: 0, w: 6, h: 14 },
    { i: "d", x: 0, y: 0, w: 6, h: 14 },
    { i: "e", x: 0, y: 0, w: 6, h: 15 },
    { i: "e2", x: 6, y: 0, w: 6, h: 15 },
    { i: "f", x: 0, y: 0, w: 6, h: 14 },
    { i: "f2", x: 6, y: 0, w: 6, h: 14 }
  ];
  const layoutmd = [
    { i: "0", x: 0, y: 0, w: 10, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 10, h: 13 },
    { i: "b", x: 0, y: 0, w: 5, h: 11 },
    { i: "b2", x: 5, y: 0, w: 5, h: 11 },
    { i: "d", x: 0, y: 0, w: 5, h: 11 },
    { i: "e", x: 0, y: 0, w: 5, h: 12 },
    { i: "e2", x: 5, y: 0, w: 5, h: 12 },
    { i: "f", x: 0, y: 0, w: 5, h: 11 },
    { i: "f2", x: 5, y: 0, w: 5, h: 13 }
  ];
  const layoutsm = [
    { i: "0", x: 0, y: 0, w: 2, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 2, h: 13, isDraggable: false },
    { i: "b", x: 0, y: 0, w: 2, h: 14, isDraggable: false },
    { i: "b2", x: 0, y: 0, w: 2, h: 13, isDraggable: false },
    { i: "d", x: 0, y: 0, w: 2, h: 14, isDraggable: false },
    { i: "e", x: 0, y: 0, w: 2, h: 15, isDraggable: false },
    { i: "e2", x: 0, y: 0, w: 2, h: 15, isDraggable: false },
    { i: "f", x: 0, y: 0, w: 2, h: 13, isDraggable: false },
    { i: "f2", x: 0, y: 0, w: 2, h: 13, isDraggable: false }
  ];
  const layoutxs = [
    { i: "0", x: 0, y: 0, w: 2, h: 3, static: true },
    { i: "a", x: 0, y: 0, w: 2, h: 18, isDraggable: false },
    { i: "b", x: 0, y: 0, w: 2, h: 13, isDraggable: false },
    { i: "b2", x: 0, y: 0, w: 2, h: 12, isDraggable: false },
    { i: "d", x: 0, y: 0, w: 2, h: 13, isDraggable: false },
    { i: "e", x: 0, y: 0, w: 2, h: 14, isDraggable: false },
    { i: "e2", x: 0, y: 0, w: 2, h: 14, isDraggable: false },
    { i: "f", x: 0, y: 0, w: 2, h: 12, isDraggable: false },
    { i: "f2", x: 0, y: 0, w: 2, h: 13, isDraggable: false }
  ];
  const layoutxxs = [
    { i: "0", x: 0, y: 0, w: 1, h: 3, static: true },
    { i: "a", x: 0, y: 0, w: 1, h: 23, isDraggable: false },
    { i: "b", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "b2", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "d", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "e", x: 0, y: 0, w: 1, h: 12, isDraggable: false },
    { i: "e2", x: 0, y: 0, w: 1, h: 12, isDraggable: false },
    { i: "f", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "f2", x: 0, y: 0, w: 1, h: 13, isDraggable: false }
  ];
  const layoutmin = [
    { i: "0", x: 0, y: 0, w: 1, h: 4, static: true },
    { i: "a", x: 0, y: 0, w: 1, h: 29, isDraggable: false },
    { i: "b", x: 0, y: 0, w: 1, h: 10, isDraggable: false },
    { i: "b2", x: 0, y: 0, w: 1, h: 10, isDraggable: false },
    { i: "d", x: 0, y: 0, w: 1, h: 10, isDraggable: false },
    { i: "e", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "e2", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "f", x: 0, y: 0, w: 1, h: 10, isDraggable: false },
    { i: "f2", x: 0, y: 0, w: 1, h: 14, isDraggable: false }
  ];
  const layouts = {
    xl: layoutxl,
    lg: layoutlg,
    md: layoutmd,
    sm: layoutsm,
    xs: layoutxs,
    xxs: layoutxxs,
    min: layoutmin
  };
  return (
    <div className="App">
      <ResponsiveGridLayout
        className="layout"
        autoSize={true}
        layouts={layouts}
        rowHeight={30}
        breakpoints={{
          xl: 1160,
          lg: 880,
          md: 680,
          sm: 590,
          xs: 480,
          xxs: 362,
          min: 0
        }}
        cols={{ xl: 12, lg: 12, md: 10, sm: 2, xs: 2, xxs: 1, min: 1 }}
        margin={[10, 10]}
        containerPadding={[10, 10]}
      >
        <div className="container" key="0">
          <div className="app-title">
            <h1>
              Covid<span className="title-numerals">-19</span> Dashboard
            </h1>
            <h2 className="title-date">{getToday()}</h2>
          </div>
        </div>
        <div className="container" key="a">
          <Charts.AreasWithOutstandingCasesTable2 />
        </div>
        <div className="container" key="b">
          <Charts.DailyNewCasesWorldwideLineChart />
        </div>
        <div className="container" key="b2">
          <Charts.ConfirmedCasesInSelectedCountriesLineChart />
        </div>
        {/* <div className='container' key="d"> */}
        {/*   <Charts.ConfirmedCasesChinaVsWorldLineChart /> */}
        {/* </div> */}
        <div className="container" key="e">
          <Charts.DailyLineChartInAnArea chart_type="newCases" />
        </div>
        <div className="container" key="e2">
          <Charts.DailyLineChartInAnArea chart_type="newDeaths" />
        </div>
        <div className="container" key="f">
          <Charts.FatalityRatioByAgeGroupInHubei />
        </div>
        <div className="container" key="f2">
          <Charts.WorldwideRecoveryProgressPieChart />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default App;
