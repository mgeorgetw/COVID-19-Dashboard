import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import "./App.css";
import { cookieExists, setCookie, findCookie } from "./utils/useCookies";

import { GitHubStarBtn } from "./GitHubStarBtn";
import { AppTitle } from "./elements/AppTitle";
import { NavBar } from "./elements/NavBar";
import { TaiwanView } from "./TaiwanView/index";
import { GlobalView } from "./GlobalView/index";
import { Footer } from "./elements/CommonUIs";

// Pull to refresh
import PullToRefresh from "pulltorefreshjs";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
