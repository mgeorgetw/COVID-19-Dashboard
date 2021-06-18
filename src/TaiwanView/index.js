import React from "react";
import { Card } from "../elements/CommonUIs";
import { TaiwanOverviewPie } from "./TaiwanOverviewPie/index";
import { TaiwanTestsOverviewPie } from "./TaiwanTestsOverviewPie/index";
import { TaiwanNewCasesArea } from "./TaiwanNewCasesArea/index";
import { TaiwanVaccinationArea } from "./TaiwanVaccinationArea/index";
import { VaccinationRateByCountiesBar } from "./VaccinationRateByCountiesBar/index";
import { CasesByCountiesArea } from "./CasesByCountiesArea/index";
// import { ChoroplethMap } from "./ChoroplethMap/index";

export const TaiwanView = () => (
  <ul className="flex-card-list">
    {/* <Card> */}
    {/*   <ChoroplethMap /> */}
    {/* </Card> */}
    <Card>
      <TaiwanOverviewPie />
    </Card>
    <Card>
      <TaiwanTestsOverviewPie />
    </Card>
    <Card>
      <TaiwanNewCasesArea />
    </Card>
    <Card>
      <CasesByCountiesArea />
    </Card>
    <Card>
      <TaiwanVaccinationArea />
    </Card>
    <Card>
      <VaccinationRateByCountiesBar />
    </Card>
  </ul>
);
