import React from "react";
// import PropTypes from "prop-types";
// import { setCookie } from "../utils/useCookies";

export const NavBar = ({ view, setView }) => {
  // A series of buttons to switch between views of charts.
  const buttons = [
    {
      name: "Global",
      view_name: "global",
      className: view === "global" ? "active view-button" : "view-button",
    },
    {
      name: "台灣版",
      view_name: "taiwan",
      className: view === "taiwan" ? "active view-button" : "view-button",
    },
  ];

  return (
    <div className="nav">
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
