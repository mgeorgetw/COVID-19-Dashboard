import React from "react";
import { useData } from "./useData";
import { LoadSpinner } from "../elements/CommonUIs";
import { DataTable } from "./DataTable";
import { ChartTitle } from "./ChartTitle";
// import { Collapsible } from "./Collapsible";

const title = "Areas With Outstanding Cases";

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
  const data = useData();
  if (!data) return <LoadSpinner />;
  // if (data) console.log(data[0]);
  return (
    <>
      <ChartTitle title={title} />
      <DataTable data={data} />
      <SourceCredit />
    </>
  );
};
