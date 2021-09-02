import React, { useState } from "react";
import { useData } from "./useData";
import { RadioButton } from "./RadioButton";
import { LoadSpinner } from "../../elements/CommonUIs";
import { DataTable } from "./DataTable";
import { ChartTitle } from "./ChartTitle";
// import { Collapsible } from "./Collapsible";

const title = "Areas With Outstanding Cases";

const sortTypes = [
  { type: "total_cases", label: "Total infected" },
  { type: "total_deaths", label: "Total deaths" },
  { type: "new_cases", label: "Newly infected" },
  { type: "new_deaths", label: "New deaths" },
];

const SourceCredit = () => (
  <p className="footnote">
    Data source: Center for Systems Science and Engineering (CSSE) at Johns
    Hopkins University (
    <a href="https://github.com/owid/covid-19-data/tree/master/public/data/jhu">
      Our Wolrd in Data
    </a>
    )
  </p>
);

export const AreasWithOutstandingCasesTable = () => {
  const [sortBy, setSortBy] = useState("new_cases");
  const data = useData();
  if (!data || !data.length) return <LoadSpinner />;
  // if (data) console.log(data[0]);
  const tableData = data
    .sort((a, b) => b[sortBy] - a[sortBy])
    .filter((obj) => obj.continent !== null)
    .slice(0, 12);
  return (
    <>
      <ChartTitle title={title} />
      <div className="radio-btn-container">
        {sortTypes.map(({ type, label }) => (
          <RadioButton
            key={type}
            item={type}
            label={label}
            selected={sortBy}
            handleChange={setSortBy}
          />
        ))}
      </div>
      <DataTable data={tableData} selected={sortBy} />
      <SourceCredit />
    </>
  );
};
