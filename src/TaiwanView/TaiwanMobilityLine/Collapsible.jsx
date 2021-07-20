import React from "react";
const SourceCredit = () => (
  <p className="footnote">
    資料來源：Apple Mobility Trends Reports（API by{" "}
    <a href="https://disease.sh/">disease.sh</a>）
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
          <p>這張圖表主要用來觀察台灣的疫情與人民外出情形之間的關係。</p>
          <p>
            Apple公開了各個地區使用「Apple地圖」導航功能的頻繁程度，藉以判斷外出的人流是否增加或減少。正如導航所提供的功能，數據也區分為「步行」、「開車」、「大眾交通」三種，一般人通常要到陌生的地方或走不熟悉的路線才會開導航，因此用這些數據來判斷「不必要的移動」頗為合適。
          </p>
          <SourceCredit />
        </div>
      </div>
    </div>
  );
};
