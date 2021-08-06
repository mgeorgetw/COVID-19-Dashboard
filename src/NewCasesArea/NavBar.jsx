import React from "react";
import styles from "./AreaChart.module.css";
// import PropTypes from "prop-types";
// import { setCookie } from "../utils/useCookies";

export const NavBar = ({ view, setView }) => {
  // A series of buttons to switch between views of charts.
  const buttons = [
    {
      name: "確診案例",
      view_name: "confirmed",
      className: view === "confirmed" ? "active view-button" : "view-button",
    },
    {
      name: "死亡人數",
      view_name: "deaths",
      className: view === "deaths" ? "active view-button" : "view-button",
    },
  ];

  return (
    <div className={styles.nav}>
      {buttons.map((button) => (
        <ViewButton setView={setView} {...button} key={button.view_name} />
      ))}
    </div>
  );
};

const ViewButton = ({ name, view_name, className, setView }) => {
  // A series of buttons to switch between views of charts.
  const handleClick = (e) => {
    e.preventDefault();
    // setCookie("view", view_name);
    setView(view_name);
  };
  // Changes the button label according to current view.
  return (
    <button onClick={handleClick} type="button" className={className}>
      {name}
    </button>
  );
};
