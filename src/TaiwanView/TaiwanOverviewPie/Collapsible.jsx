import React from "react";
const SourceCredit = () => (
  <p className="footnote">
    資料來源：衛生福利部疾病管制署（API by{" "}
    <a href="https://disease.sh">disease.sh</a>. Data collected by{" "}
    <a href="https://www.worldometers.info/coronavirus/#countries">
      Worldometer
    </a>
    .）
  </p>
);
export const Collapsible = ({ id }) => {
  return (
    <div className="wrap-collapsible">
      <input id={id} className="toggle" type="checkbox" />
      <label htmlFor={id} className="lbl-toggle">
        這張圖表可以怎麼看？
      </label>
      <div className="collapsible-content">
        <div className="content-inner">
          <p>
            這張圖表的用意是呈現此時此刻COVID-19在台灣的疫情概況。左上角的「總確診數」代表篩檢陽性案例的總計，不過，由於並非所有人都經過篩檢，這個數目並不足以代表社會中真正染疫的人數，頂多代表目前已知的確診人數而已。
          </p>
          <p>
            正如圓餅圖所示，總確診數可以細分為三類：病中、死亡、解除隔離。此處列出解除隔離的比例，用意在顯示台灣距離疫病的終點還有多遠。但要知道，這組「恢復鐘」在疫情迅速增溫的時候是有可能倒轉的。病中案例代表目前還未康復、正在與疾病奮鬥中的人們。根據《紐約時報》
            <a href="https://www.nytimes.com/interactive/2020/world/asia/china-coronavirus-contain.html">
              一篇疫情爆發初期的報導
            </a>
            ，大多數染疫者最終都會康復，確診者的死亡比例可能會小於百分之三。
          </p>
          <SourceCredit />
        </div>
      </div>
    </div>
  );
};
