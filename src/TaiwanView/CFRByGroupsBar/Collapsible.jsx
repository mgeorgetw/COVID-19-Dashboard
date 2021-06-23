import React from "react";

const SourceCredit = () => (
  <>
    <p className="footnote">
      資料來源：衛生福利部疾病管制署（API：{" "}
      <a href="https://covid-19.nchc.org.tw/dt_005-covidTable_taiwan.php">
        國家高速網路與計算中心
      </a>
      。）
    </p>
  </>
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
            COVID-19的一大特性是：高齡者的死亡率明顯較高。台灣的疫情比起許多國家要晚展開，因此已經有不止一個研究都顯示年齡與染疫死亡率的正相關。在這個網頁的「Global」版本中，有義大利、西班牙、中國、韓國分別做的研究結果。這張圖表利用台灣疾管署公告的病逝者資料，即時顯示台灣各年齡的染疫死亡率，一方面印證高齡者的風險確實較高，一方面也能與其他國家比較。
          </p>
          <p>2021年6月23日新增以性別分類的圖表。</p>
          <SourceCredit />
        </div>
      </div>
    </div>
  );
};
