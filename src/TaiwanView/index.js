import React from "react";
import { Card } from "../elements/CommonUIs";
import { TaiwanOverviewPie } from "./TaiwanOverviewPie/index";
import { TaiwanTestsOverviewPie } from "./TaiwanTestsOverviewPie/index";
import { TaiwanNewCasesArea } from "./TaiwanNewCasesArea/index";
import { TaiwanVaccinationArea } from "./TaiwanVaccinationArea/index";
// import { ChoroplethMap } from "./ChoroplethMap/index";
// import { CasesByCountiesArea } from "./CasesByCountiesArea/index";
// import { CFRByGroupsBar } from "./CFRByGroupsBar/index";
// import { TaiwanMobilityLine } from "./TaiwanMobilityLine/index";
// import { VaccinationRateByCountiesBar } from "./VaccinationRateByCountiesBar/index";

export const TaiwanView = () => (
  <ul className="flex-card-list">
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
      <TaiwanVaccinationArea />
    </Card>
  </ul>
);
