import React from "react";
const SourceCredit = () => (
  <p className="footnote">
    資料來源：衛生福利部疾病管制署（
    <a href="https://covid-19.nchc.org.tw/dt.php?dt_name=1&downloadall=yes">
      資料由「國家高速網路與計算中心」彙整
    </a>
    ）
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
            這系列圖表的用意在於顯示台灣各地區疫情處於增溫或降溫的階段，同時也能作為疫情傳播情形的參考。每一個色塊代表一個縣市或鄉鎮，滑鼠移到色塊上會顯示粉色的直線，每一條直線代表一筆資料，代表一天內新增的確診案例數。
          </p>
          <p>
            資料的預設範圍是「全台灣」，代表各直轄市與二級縣市的比較。點選下拉式選單則可以看到上述行政區又細分一層後的資料。
          </p>
          <SourceCredit />
        </div>
      </div>
    </div>
  );
};
