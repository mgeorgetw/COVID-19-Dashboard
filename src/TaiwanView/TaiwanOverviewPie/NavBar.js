import React from "react";
import styles from "./OverviewPie.module.css";
// import PropTypes from "prop-types";
// import { setCookie } from "../utils/useCookies";

export const NavBar = ({ view, setView }) => {
  // A series of buttons to switch between views of charts.
  const buttons = [
    {
      name: "現況",
      view_name: "condition",
      className: view === "condition" ? "active view-button" : "view-button",
    },
    {
      name: "年齡層",
      view_name: "age",
      className: view === "age" ? "active view-button" : "view-button",
    },
    {
      name: "生理性別",
      view_name: "gender",
      className: view === "gender" ? "active view-button" : "view-button",
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
