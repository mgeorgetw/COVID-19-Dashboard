import React from "react";

// SMALL COMPONENTS / HELPER FUNCTIONS
function getToday() {
  var time = new Date();
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var formattedDate = year + "/" + month + "/" + date;
  return formattedDate;
}

export const AppTitle = () => {
  return (
    <div className="app-title">
      <h1>
        Covid<span className="title-numerals">-19</span> Dashboard
      </h1>
      <h2 className="title-date">{getToday()}</h2>
    </div>
  );
};
