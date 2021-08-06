import React from "react";
import PropTypes from "prop-types";

export const LoadSpinner = () => {
  return (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const Card = ({ children, className }) => (
  <li className={`flex-card-listitem${className ? " " + className : ""}`}>
    <div className="flex-card">{children}</div>
  </li>
);

Card.propTypes = {
  children: PropTypes.node,
};

export const Footer = () => (
  <div className="footer">
    <p>
      © 2021 <a href="https://eternallogger.com">George Huang</a>. All rights
      reserved.
    </p>
  </div>
);
