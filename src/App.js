import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import "./App.css";
import { cookieExists, setCookie, findCookie } from "./utils/useCookies";

import { TaiwanView } from "./TaiwanView/index";
import * as Charts from "./Charts.js";
import { Card, Footer } from "./elements/CommonUIs";
import { GitHubStarBtn } from "./GitHubStarBtn";
import { AppTitle } from "./elements/AppTitle";
import { NavBar } from "./elements/NavBar";
import { OverviewPie } from "./OverviewPie/index";
import { DailyNewCasesWorldwideArea } from "./DailyNewCasesWorldwideArea/index";
import { NewCasesArea } from "./NewCasesArea/index";
import { CaseFatalityRatesByAgeBarChart } from "./CaseFatalityRatesByAgeBarChart/index";

// Pull to refresh
import PullToRefresh from "pulltorefreshjs";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GlobalView = () => (
  <ul className="flex-card-list">
    <Card>
      <OverviewPie />
    </Card>
    <Card>
      <DailyNewCasesWorldwideArea />
    </Card>
    {/* <Card> */}
    {/*   <Charts.WorldwideRecoveryProgressPieChart /> */}
    {/* </Card> */}
    {/* <Card> */}
    {/*   <Charts.DailyNewCasesWorldwideLineChart /> */}
    {/* </Card> */}
    <Card>
      <Charts.AreasWithOutstandingCasesTable />
    </Card>
    <Card>
      <NewCasesArea />
    </Card>
    {/* <Card> */}
    {/*   <Charts.DailyLineChartInAnArea area={area} chart_type="newCases" /> */}
    {/* </Card> */}
    {/* <Card> */}
    {/*   <Charts.DailyLineChartInAnArea area={area} chart_type="newDeaths" /> */}
    {/* </Card> */}
    {/* <Card> */}
    {/*   <Charts.ConfirmedCasesInSelectedCountriesLineChart /> */}
    {/* </Card> */}
    <Card>
      <CaseFatalityRatesByAgeBarChart />
    </Card>
  </ul>
);

const App = () => {
  const [view, setView] = useState("global");
  useEffect(() => {
    // Checks if there's a cookie for view, if not, set it to Indices View
    if (cookieExists("view")) {
      // Set view according to cookie, if exists
      setView(findCookie("view"));
    } else {
      setCookie("view", "global");
    }

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
      ),
    });
    return () => {
      PullToRefresh.destroyAll();
    };
  }, []);
  return (
    <div className="App">
      <GitHubStarBtn user="mgeorgetw" repo="COVID-19-Dashboard" />
      <AppTitle />
      <NavBar view={view} setView={setView} />
      {view === "global" ? <GlobalView /> : <TaiwanView />}
      <Footer />
    </div>
  );
};

export default App;
