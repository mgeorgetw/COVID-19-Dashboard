import React from "react";
const SourceCredit = () => (
  <p className="footnote">
    資料來源：
    <a href="https://sites.google.com/cdc.gov.tw/2019ncov/taiwan">
      衛生福利部疾病管制署
    </a>
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
          <p>這張圓餅圖用來顯示此時此刻COVID-19在台灣的篩檢工作現況。</p>
          <p>
            整塊大餅表示台灣從有疫情以來累計的檢驗件數；要注意件數不代表人數，因為一個人可能檢驗不只一次，所以這個數字會比累計檢驗人數要多。整個大餅又分成兩大塊：
          </p>
          <ul>
            <li>灰色的：已檢驗，未通報。</li>
            <li>彩色的：已通報案例。</li>
          </ul>
          <p>
            並非所有的檢驗案例都須通報，由
            <a href="https://www.cdc.gov.tw/Category/MPage/np0wef4IjYh9hvbiW2BnoQ#collapseOne84473">
              疾管署的規定
            </a>
            看來，驗心安的案例就不會通報上傳。然而，這個灰色區塊卻也是盲點所在。台灣由於上傳通報系統存在「塞車」的問題，代表有些已經檢驗且符合通報標準的案例並沒有即時通報。這些案例以及未來可能的「校正回歸」都包納在灰色的「已檢驗，未通報」區塊中。大餅的彩色部分則是已通報的件數，這又可以區分為三塊：
          </p>
          <ul>
            <li>通報確診。</li>
            <li>通報排除。</li>
            <li>通報待確認。</li>
          </ul>
          <p>
            獲通報的案例正常來說只有兩個可能，不是確診就是排除，因此不應該存在第三類。然而在通報之後、確認檢驗結果之前，還是存在時間差。據
            <a href="https://health.udn.com/health/story/120950/5479893">
              聯合報元氣網的報導
            </a>
            ，此處的落差大多來自於各種缺件，也包括正在檢驗中，或是預先通報卻尚未採檢的情形。
          </p>
          <SourceCredit />
        </div>
      </div>
    </div>
  );
};
