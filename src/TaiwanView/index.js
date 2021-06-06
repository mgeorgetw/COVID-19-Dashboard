import React from "react";
import { Card } from "../elements/CommonUIs";
import { TaiwanOverviewPie } from "./TaiwanOverviewPie/index";
import { TaiwanTestsOverviewPie } from "./TaiwanTestsOverviewPie/index";
import { TaiwanNewCasesArea } from "./TaiwanNewCasesArea/index";
import { TaiwanVaccinationArea } from "./TaiwanVaccinationArea/index";

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
