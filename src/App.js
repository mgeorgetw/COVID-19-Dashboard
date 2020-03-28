import React from "react";
import "./App.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import * as Charts from "./Charts.js";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

// TODO: Make it mobile friendly

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
  const layoutxl = [
    { i: "0", x: 0, y: 0, w: 12, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 12, h: 7 },
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
    { i: "a", x: 0, y: 0, w: 12, h: 11 },
    { i: "b", x: 0, y: 0, w: 6, h: 14 },
    { i: "b2", x: 6, y: 0, w: 6, h: 14 },
    { i: "d", x: 0, y: 0, w: 6, h: 14 },
    { i: "e", x: 0, y: 0, w: 6, h: 14 },
    { i: "e2", x: 6, y: 0, w: 6, h: 14 },
    { i: "f", x: 0, y: 0, w: 6, h: 14 },
    { i: "f2", x: 6, y: 0, w: 6, h: 14 }
  ];
  const layoutmd = [
    { i: "0", x: 0, y: 0, w: 10, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 10, h: 11 },
    { i: "b", x: 0, y: 0, w: 5, h: 11 },
    { i: "b2", x: 5, y: 0, w: 5, h: 11 },
    { i: "d", x: 0, y: 0, w: 5, h: 11 },
    { i: "e", x: 0, y: 0, w: 5, h: 11 },
    { i: "e2", x: 5, y: 0, w: 5, h: 11 },
    { i: "f", x: 0, y: 0, w: 5, h: 11 },
    { i: "f2", x: 5, y: 0, w: 5, h: 13 }
  ];
  const layoutsm = [
    { i: "0", x: 0, y: 0, w: 2, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 2, h: 11 },
    { i: "b", x: 0, y: 0, w: 2, h: 14 },
    { i: "b2", x: 0, y: 0, w: 2, h: 13 },
    { i: "d", x: 0, y: 0, w: 2, h: 14 },
    { i: "e", x: 0, y: 0, w: 2, h: 14 },
    { i: "e2", x: 0, y: 0, w: 2, h: 14 },
    { i: "f", x: 0, y: 0, w: 2, h: 13 },
    { i: "f2", x: 0, y: 0, w: 2, h: 13 }
  ];
  const layoutxs = [
    { i: "0", x: 0, y: 0, w: 2, h: 3, static: true },
    { i: "a", x: 0, y: 0, w: 2, h: 15 },
    { i: "b", x: 0, y: 0, w: 2, h: 13 },
    { i: "b2", x: 0, y: 0, w: 2, h: 12 },
    { i: "d", x: 0, y: 0, w: 2, h: 13 },
    { i: "e", x: 0, y: 0, w: 2, h: 13 },
    { i: "e2", x: 0, y: 0, w: 2, h: 13 },
    { i: "f", x: 0, y: 0, w: 2, h: 12 },
    { i: "f2", x: 0, y: 0, w: 2, h: 13 }
  ];
  const layoutxxs = [
    { i: "0", x: 0, y: 0, w: 1, h: 3, static: true },
    { i: "a", x: 0, y: 0, w: 1, h: 19, isDraggable: false },
    { i: "b", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "b2", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "d", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "e", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "e2", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "f", x: 0, y: 0, w: 1, h: 11, isDraggable: false },
    { i: "f2", x: 0, y: 0, w: 1, h: 13, isDraggable: false }
  ];
  const layoutmin = [
    { i: "0", x: 0, y: 0, w: 1, h: 4, static: true },
    { i: "a", x: 0, y: 0, w: 1, h: 24, isDraggable: false },
    { i: "b", x: 0, y: 0, w: 1, h: 10, isDraggable: false },
    { i: "b2", x: 0, y: 0, w: 1, h: 10, isDraggable: false },
    { i: "d", x: 0, y: 0, w: 1, h: 10, isDraggable: false },
    { i: "e", x: 0, y: 0, w: 1, h: 10, isDraggable: false },
    { i: "e2", x: 0, y: 0, w: 1, h: 10, isDraggable: false },
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
        containerPadding={[10, 10]}
      >
        <div key="0">
          <h1 className="app-title">
            Covid<span className="title-numerals">-19</span> Dashboard
            <span className="title-date">{getToday()}</span>
          </h1>
        </div>
        <div key="a">
          <Charts.AreasWithOutstandingCasesTable2 />
        </div>
        <div key="b">
          <Charts.DailyNewCasesWorldwideLineChart />
        </div>
        <div key="b2">
          <Charts.ConfirmedCasesInSelectedCountriesLineChart />
        </div>
        <div key="d">
          <Charts.ConfirmedCasesChinaVsWorldLineChart />
        </div>
        <div key="e">
          <Charts.DailyNewCasesInAnAreaLineChart area="Japan" />
        </div>
        <div key="e2">
          <Charts.FatalityRateInAnAreaLineChart area="Italy" />
        </div>
        <div key="f">
          <Charts.FatalityRatioByAgeGroupInHubei />
        </div>
        <div key="f2">
          <Charts.WorldwideRecoveryProgressPieChart />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default App;
