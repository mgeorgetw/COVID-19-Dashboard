import React from "react";
import { Card } from "../elements/CommonUIs";
import { TaiwanOverviewPie } from "./TaiwanOverviewPie/index";
import { TaiwanTestsOverviewPie } from "./TaiwanTestsOverviewPie/index";
import { TaiwanCasesLineChart } from "./TaiwanCasesLineChart/index";
import { TaiwanVaccinationOverviewLineChart } from "./TaiwanVaccinationOverviewLineChart/index";

export const TaiwanView = () => (
  <ul className="flex-card-list">
    <Card>
      <TaiwanOverviewPie />
    </Card>
    <Card>
      <TaiwanTestsOverviewPie />
    </Card>
    <Card>
      <TaiwanCasesLineChart />
    </Card>
    <Card>
      <TaiwanVaccinationOverviewLineChart />
    </Card>
  </ul>
);
