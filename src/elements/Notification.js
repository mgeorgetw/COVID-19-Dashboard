import React from "react";
import PropTypes from "prop-types";

// Notification Messages
const getNotification = (text, clickAction) => ({
  info: (
    <div onClick={clickAction} className="isa_info">
      {text}
    </div>
  ),
  warning: (
    <div onClick={clickAction} className="isa_warning">
      {text}
    </div>
  ),
  error: (
    <div onClick={clickAction} className="isa_error">
      {text}
    </div>
  )
});

const Notification = ({ status, text, clickAction }) => {
  return getNotification(text, clickAction)[status];
};
Notification.propTypes = {
  status: PropTypes.string,
  text: PropTypes.string,
  clickAction: PropTypes.func
};

export { Notification };
