import React from "react";

const SourceCredit = () => (
  <>
    <p className="footnote">
      資料來源：
      <a href="https://www.cdc.gov.tw/Category/Page/9jFXNbCe-sFK9EImRRi2Og">
        衛生福利部疾病管制署
      </a>
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
            這張圖表主要用來顯示台灣各縣市的COVID-19疫苗的配給與接種現況。圖表最上方的兩個按鈕可以用來切換「以人口比例」或「以實際劑數」兩種顯示模式。有些縣市人口少，實際劑數配送得少，但以人口比例看來就相對要多，反之亦然。也因為如此，這個圖表預設以人口比例顯示，也就是「每一百人中，有多少人取得了疫苗」。
          </p>
          <p>
            直方圖區分為兩種顏色：淺灰色代表已經配送至各地方政府的疫苗，綠色則代表已經施打的疫苗。如此分類的用意在於顯示各縣市的疫苗施打效率，但疾管署所統計的資料時常會有施打數大於配送數的「超打」情形，多少干擾了此圖表的本意，請留意。
          </p>
          <p>
            由於疾管署並沒有提供可以自動串接的資料給大眾使用，這張圖表所呈現的資訊必須要我手動去抓取，因此很有可能呈現過時的資訊。若是如此，也請見諒。
          </p>
          <SourceCredit />
        </div>
      </div>
    </div>
  );
};
