import React, { useState, useEffect } from "react";
import "./App.css";
import * as Charts from "./Charts.js";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

// TODO: 整理API、重構Components

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
    { i: "b", x: 0, y: 0, w: 6, h: 17 },
    { i: "b2", x: 6, y: 0, w: 6, h: 17 },
    { i: "d", x: 0, y: 0, w: 6, h: 14 },
    { i: "e", x: 0, y: 0, w: 6, h: 17 },
    { i: "e2", x: 6, y: 0, w: 6, h: 17 },
    { i: "f", x: 0, y: 0, w: 6, h: 14 },
    { i: "f2", x: 6, y: 0, w: 6, h: 14 }
  ];
  const layoutlg = [
    { i: "0", x: 0, y: 0, w: 12, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 12, h: 7 },
    { i: "b", x: 0, y: 0, w: 6, h: 14, maxH: 18 },
    { i: "b2", x: 6, y: 0, w: 6, h: 14, maxH: 18 },
    { i: "d", x: 0, y: 0, w: 6, h: 14 },
    { i: "e", x: 0, y: 0, w: 6, h: 14, maxH: 18 },
    { i: "e2", x: 6, y: 0, w: 6, h: 14, maxH: 18 },
    { i: "f", x: 0, y: 0, w: 6, h: 14 },
    { i: "f2", x: 6, y: 0, w: 6, h: 14 }
  ];
  const layoutmd = [
    { i: "0", x: 0, y: 0, w: 10, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 10, h: 11 },
    { i: "b", x: 0, y: 0, w: 5, h: 12, maxH: 18 },
    { i: "b2", x: 5, y: 0, w: 5, h: 12, maxH: 18 },
    { i: "d", x: 0, y: 0, w: 5, h: 14 },
    { i: "e", x: 0, y: 0, w: 5, h: 12, maxH: 18 },
    { i: "e2", x: 5, y: 0, w: 5, h: 12, maxH: 18 },
    { i: "f", x: 0, y: 0, w: 5, h: 12 },
    { i: "f2", x: 5, y: 0, w: 5, h: 12 }
  ];
  const layoutsm = [
    { i: "0", x: 0, y: 0, w: 6, h: 2, static: true },
    { i: "a", x: 0, y: 0, w: 6, h: 11 },
    { i: "b", x: 0, y: 0, w: 6, h: 16 },
    { i: "b2", x: 0, y: 0, w: 6, h: 14 },
    { i: "d", x: 0, y: 0, w: 6, h: 13 },
    { i: "e", x: 0, y: 0, w: 6, h: 15 },
    { i: "e2", x: 0, y: 0, w: 6, h: 15 },
    { i: "f", x: 0, y: 0, w: 6, h: 14 },
    { i: "f2", x: 6, y: 0, w: 6, h: 14 }
  ];
  const layoutxs = [
    { i: "0", x: 0, y: 0, w: 4, h: 3, static: true },
    { i: "a", x: 0, y: 0, w: 4, h: 15 },
    { i: "b", x: 0, y: 0, w: 4, h: 14 },
    { i: "b2", x: 0, y: 0, w: 4, h: 14 },
    { i: "d", x: 0, y: 0, w: 4, h: 14 },
    { i: "e", x: 0, y: 0, w: 4, h: 14 },
    { i: "e2", x: 0, y: 0, w: 4, h: 14 },
    { i: "f", x: 0, y: 0, w: 4, h: 14 },
    { i: "f2", x: 0, y: 0, w: 4, h: 14 }
  ];
  const layoutxxs = [
    { i: "0", x: 0, y: 0, w: 2, h: 3, static: true },
    { i: "a", x: 0, y: 0, w: 2, h: 19 },
    { i: "b", x: 0, y: 0, w: 2, h: 12 },
    { i: "b2", x: 0, y: 0, w: 2, h: 11 },
    { i: "d", x: 0, y: 0, w: 2, h: 13 },
    { i: "e", x: 0, y: 0, w: 2, h: 12 },
    { i: "e2", x: 0, y: 0, w: 2, h: 12 },
    { i: "f", x: 0, y: 0, w: 2, h: 12 },
    { i: "f2", x: 0, y: 0, w: 2, h: 12 }
  ];
  const layouts = {
    xl: layoutxl,
    lg: layoutlg,
    md: layoutmd,
    sm: layoutsm,
    xs: layoutxs,
    xxs: layoutxxs
  };
  return (
    <div className="App">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        rowHeight={30}
        breakpoints={{ xl: 1420, lg: 1279, md: 707, sm: 639, xs: 511, xxs: 0 }}
        cols={{ xl: 12, lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        <div key="0">
          <h1 className="app-title">
            Covid<span className="title-numerals">-19</span> Dashboard
            <span className="title-date">{getToday()}</span>
          </h1>
        </div>
        <div key="a">
          <Charts.AreasWithOutstandingCasesTable />
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
          <Charts.DailyNewCasesInAnAreaLineChart area="United States of America" />
        </div>
        <div key="e2">
          <Charts.FatalityRateInAnAreaLineChart area="Netherlands" />
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
