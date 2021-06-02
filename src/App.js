import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import "./App.css";
import * as Charts from "./Charts.js";
import { Card, Footer } from "./elements/CommonUIs";
import { AppTitle } from "./elements/AppTitle";
import { NavBar } from "./elements/NavBar";
import { OverviewPie } from "./OverviewPie/index";
import { CasesLineChart } from "./CasesLineChart/index";
import { CaseFatalityRatesByAgeBarChart } from "./CaseFatalityRatesByAgeBarChart/index";

// Pull to refresh
import PullToRefresh from "pulltorefreshjs";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const area = "Taiwan";

const GlobalView = () => (
  <ul className="flex-card-list">
    <Card>
      <OverviewPie />
    </Card>
    <Card>
      <CasesLineChart />
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
      <Charts.DailyLineChartInAnArea area={area} chart_type="newCases" />
    </Card>
    <Card>
      <Charts.DailyLineChartInAnArea area={area} chart_type="newDeaths" />
    </Card>
    <Card>
      <Charts.ConfirmedCasesInSelectedCountriesLineChart />
    </Card>
    <Card>
      <CaseFatalityRatesByAgeBarChart />
    </Card>
  </ul>
);

const TaiwanView = () => (
  <ul className="flex-card-list">
    <Card>
      <CaseFatalityRatesByAgeBarChart />
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
  </ul>
);

const App = () => {
  const [view, setView] = useState("taiwan");
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
      ),
    });
    return () => {
      PullToRefresh.destroyAll();
    };
  }, []);
  return (
    <div className="App">
      <AppTitle />
      <NavBar view={view} setView={setView} />
      {view === "global" ? <GlobalView /> : <TaiwanView />}
      <Footer />
    </div>
  );
};

export default App;
