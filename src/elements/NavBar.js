import React from "react";
import PropTypes from "prop-types";
import { setCookie } from "../utils/useCookies";

const ViewButton = ({ name, view_name, className, setView }) => {
  // A series of buttons to switch between views of charts.
  const handleClick = e => {
    e.preventDefault();
    setCookie("view", view_name);
    setView(view_name);
  };
  // Changes the button label according to current view.
  return (
    <button onClick={handleClick} type="button" className={className}>
      {name}
    </button>
  );
};

ViewButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  view_name: PropTypes.string,
  setView: PropTypes.func
};

// Navigation Bar
const NavBar = ({ view, setView }) => {
  // A series of buttons to switch between views of charts.
  const buttons = [
    {
      name: "指數概覽",
      view_name: "indices",
      className: view === "indices" ? "active view-button" : "view-button"
    },
    {
      name: "量幅統計",
      view_name: "volume",
      className: view === "volume" ? "active view-button" : "view-button"
    },
    {
      name: "權值熱圖",
      view_name: "heatmap",
      className: view === "heatmap" ? "active view-button" : "view-button"
    },
    {
      name: "資金籌碼",
      view_name: "money",
      className: view === "money" ? "active view-button" : "view-button"
    }
  ];

  return (
    <div className="nav">
      {buttons.map(button => (
        <ViewButton setView={setView} {...button} key={button.view_name} />
      ))}
    </div>
  );
};
NavBar.propTypes = {
  view: PropTypes.string,
  setView: PropTypes.func
};

export { NavBar };
