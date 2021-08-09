import { Card } from "../elements/CommonUIs";
import { OverviewPie } from "./OverviewPie/index";
import { DailyNewCasesWorldwideArea } from "./DailyNewCasesWorldwideArea/index";
import { AreasWithOutstandingCasesTable } from "./AreasWithOutstandingCasesTable/index";
import { NewCasesArea } from "./NewCasesArea/index";
import { CaseFatalityRatesByAgeBarChart } from "./CaseFatalityRatesByAgeBarChart/index";

export const GlobalView = () => (
  <ul className="flex-card-list">
    <Card>
      <OverviewPie />
    </Card>
    <Card>
      <DailyNewCasesWorldwideArea />
    </Card>
    <Card>
      <AreasWithOutstandingCasesTable />
    </Card>
    {/* <Card> */}
    {/*   <Charts.WorldwideRecoveryProgressPieChart /> */}
    {/* </Card> */}
    {/* <Card> */}
    {/*   <Charts.DailyNewCasesWorldwideLineChart /> */}
    {/* </Card> */}
    {/* <Card> */}
    {/*   <Charts.AreasWithOutstandingCasesTable /> */}
    {/* </Card> */}
    <Card>
      <NewCasesArea />
    </Card>
    {/* <Card> */}
    {/*   <Charts.DailyLineChartInAnArea area={area} chart_type="newCases" /> */}
    {/* </Card> */}
    {/* <Card> */}
    {/*   <Charts.DailyLineChartInAnArea area={area} chart_type="newDeaths" /> */}
    {/* </Card> */}
    {/* <Card> */}
    {/*   <Charts.ConfirmedCasesInSelectedCountriesLineChart /> */}
    {/* </Card> */}
    <Card>
      <CaseFatalityRatesByAgeBarChart />
    </Card>
  </ul>
);
