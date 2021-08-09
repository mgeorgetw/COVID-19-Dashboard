import React from "react";
import { useData } from "./useData";
import { LoadSpinner } from "../../elements/CommonUIs";
import { ChartTitle } from "./ChartTitle";
import { DataTable } from "./DataTable";
import { LineChart } from "./LineChart";
import { Collapsible } from "./Collapsible";

const sumValuesInObject = (data, key) =>
  data.reduce(
    (prev, cur) => prev + cur[key],
    0 // initialValue
  );

const title = "Daily New Cases Worldwide";

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

export const DailyNewCasesWorldwideArea = () => {
  const data = useData();
  if (!data) return <LoadSpinner />;
  // if (data) console.log(data);
  const lastSevenDaysAvg = sumValuesInObject(data.slice(-7), "newCases") / 7;

  const beforeSevenDaysAvg =
    sumValuesInObject(data.slice(-14, -7), "newCases") / 7;

  const tableData = [
    {
      heading: "Average previous week",
      value: Math.round(beforeSevenDaysAvg).toLocaleString(),
    },
    {
      heading: "Average this week",
      value: Math.round(lastSevenDaysAvg).toLocaleString(),
    },
    {
      heading: "Growth factor",
      value: (lastSevenDaysAvg / beforeSevenDaysAvg).toFixed(2),
    },
  ];

  return (
    <>
      <ChartTitle title={title} />
      <DataTable items={tableData} />
      <LineChart data={data} />
      <Collapsible id={title}>
        <p>
          This chart is intended to show how fast the viruses are spreading over
          time. Each data point represents the number of people tested positive
          on that day, therefore "new cases".
        </p>
        <p>
          During a contagious disease's growing period, an infected person is
          likely to spread the virus to more than one healthy person, so the
          latter days will see more new cases than the previous days. For
          example, if we have 10 new cases today but only 5 new cases yesterday,
          it can mean each of those 5 people passed the disease to 2 more people
          during the day. So, the "2" is the "growth factor" listed here above
          the chart. Only when the growth factor constantly goes below 1, have
          we the chance to see an end to the pandemic.
        </p>
        <p>
          Since most societies work in a weekly basis, we can see the data
          regularly fluctuates inside of a week. To avoid misintepretation, this
          chart calculates the growth factor with weekly averages.
        </p>
        <SourceCredit />
      </Collapsible>
    </>
  );
};
