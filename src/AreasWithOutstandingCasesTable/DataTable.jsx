import { useState } from "react";
import { RadioButton } from "./RadioButton";

const calPercentage = (numerator, denominator) =>
  Number(((numerator / denominator) * 100).toFixed(2));

export const DataTable = ({ data }) => {
  const [sortBy, setSortBy] = useState("new_cases");
  return (
    <>
      <div className="radio-btn-container">
        <RadioButton
          id="1"
          changed={() => setSortBy("total_cases")}
          isSelected={sortBy === "total_cases" ? true : false}
          label="Total cases"
        />
        <RadioButton
          id="2"
          changed={() => setSortBy("total_deaths")}
          isSelected={sortBy === "total_deaths" ? true : false}
          label="Total deaths"
        />
        <RadioButton
          id="3"
          changed={() => setSortBy("new_cases")}
          isSelected={sortBy === "new_cases" ? true : false}
          label="New cases"
        />
        <RadioButton
          id="4"
          changed={() => setSortBy("new_deaths")}
          isSelected={sortBy === "new_deaths" ? true : false}
          label="New deaths"
        />
      </div>
      <div className="area-data-sets">
        {data
          .sort((a, b) => b[sortBy] - a[sortBy])
          .filter((obj) => obj.continent !== null)
          .slice(0, 12)
          .map((d, index) => (
            <div className="data-set" key={d.country}>
              <div className="vertical-inverted-title">
                {index + 1} {d.location}
              </div>
              <div className="set-title">Confirmed</div>
              <div
                className={`numerical-data ${
                  sortBy === "total_cases" ? "selected" : null
                }`}
              >
                {d.total_cases.toLocaleString()}
              </div>
              <div
                className={`smaller-numbers numerical-data ${
                  sortBy === "new_cases" ? "selected" : null
                }`}
              >
                (+{d.new_cases.toLocaleString()})
              </div>
              <div className="set-title">Deaths</div>
              <div
                className={`numerical-data ${
                  sortBy === "total_deaths" ? "selected" : null
                }`}
              >
                {d.total_deaths.toLocaleString()}
              </div>
              <div
                className={`smaller-numbers numerical-data ${
                  sortBy === "new_deaths" ? "selected" : null
                }`}
              >
                (+{d.new_deaths.toLocaleString()})
              </div>
              <div className="set-title">Death Rate</div>
              <div className="numerical-data">
                {calPercentage(d.total_deaths, d.total_cases)}%
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
