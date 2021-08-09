import React from "react";
export const Collapsible = ({ children, id }) => {
  return (
    <div className="wrap-collapsible">
      <input id={id} className="toggle" type="checkbox" />
      <label htmlFor={id} className="lbl-toggle">
        What does this chart tell us?
      </label>
      <div className="collapsible-content">
        <div className="content-inner">{children}</div>
      </div>
    </div>
  );
};
