import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import "./App.css";
import * as Charts from "./Charts.js";

// React-grid-layout
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
//import { Responsive, WidthProvider } from "react-grid-layout";

// Pull to refresh
import PullToRefresh from "pulltorefreshjs";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//const ResponsiveGridLayout = WidthProvider(Responsive);

// SMALL COMPONENTS / HELPER FUNCTIONS
function getToday() {
  var time = new Date();
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var formattedDate = year + "/" + month + "/" + date;
  return formattedDate;
}

const AppTitle = () => {
  return (
    <div className="app-title">
      <h1>
        Covid<span className="title-numerals">-19</span> Dashboard
      </h1>
      <h2 className="title-date">{getToday()}</h2>
    </div>
  );
};

const Footer = () => {
  return (
    <div class="footer">
      <p>
        © 2020 <a href="https://eternallogger.com">George Huang</a>. All rights
        reserved.
      </p>
    </div>
  );
};

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
  return (
    <div className="App">
      <AppTitle />
      <ul className="flex-card-list">
        <li className="flex-card-listitem">
          <div className="flex-card">
            <Charts.WorldwideRecoveryProgressPieChart />
          </div>
        </li>
        <li className="flex-card-listitem">
          <div className="flex-card">
            <Charts.DailyNewCasesWorldwideLineChart />
          </div>
        </li>
        <li className="flex-card-listitem full-width">
          <div className="flex-card">
            <Charts.AreasWithOutstandingCasesTable />
          </div>
        </li>
        <li className="flex-card-listitem">
          <div className="flex-card">
            <Charts.DailyLineChartInAnArea chart_type="newCases" />
          </div>
        </li>
        <li className="flex-card-listitem">
          <div className="flex-card">
            <Charts.DailyLineChartInAnArea chart_type="newDeaths" />
          </div>
        </li>
        <li className="flex-card-listitem">
          <div className="flex-card">
            <Charts.ConfirmedCasesInSelectedCountriesLineChart />
          </div>
        </li>
        <li className="flex-card-listitem">
          <div className="flex-card">
            <Charts.FatalityRatioByAgeGroupInHubei />
          </div>
        </li>
      </ul>
      <Footer />
    </div>
  );
};

export default App;
