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
    <p className="footnote">
      圖資：內政部國土測繪中心（
      <a href="https://github.com/dkaoster/taiwan-atlas">
        dkaoster / taiwan-atlas
      </a>
      ，lisensed under The MIT License。）
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
            這張地圖顯示COVID-19的確診案例在台灣的分佈情形，顏色越深代表案例數越多。上方的滑桿用來控制日期，能夠看到從2021年5月1日以來的轉變。事實上，這張地圖所呈現的資訊並沒有比上面一張「台灣各地區每日新增確診案例數比較」來得多，能夠藉由控制滑桿取得的資訊，在上圖一目了然。不過我想畫畫看地圖，所以做了這一張圖。
          </p>
          <SourceCredit />
        </div>
      </div>
    </div>
  );
};
