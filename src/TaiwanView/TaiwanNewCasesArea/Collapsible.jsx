import React from "react";
const SourceCredit = () => (
  <p className="footnote">
    資料來源：Center for Systems Science and Engineering (CSSE) at Johns Hopkins
    University (
    <a href="https://github.com/owid/covid-19-data/tree/master/public/data/jhu">
      Our Wolrd in Data
    </a>
    )
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
            這張圖表用來顯示病毒每天傳播的速度。每一個資料點代表一天內新增的確診案例數。
          </p>
          <p>
            在傳染病增溫期間，一名染疫者可能會將病毒傳染給一名以上原本健康的人，如此一來，後些日子的新增案例就會比前些日子要多。舉例來說，假設今天驗出了十名新的確診者，而昨天只有五名，那我們可以粗略地看作是昨天的五名病患各別將病毒傳染了二個人。於是「二」就是圖表上方列的「增長因數」。唯有當增長因數穩定低於一，我們才有機會看到疫情的終點，否則便代表疫情還在增溫階段。
          </p>
          <p>
            就各國的經驗看來，由於大多數社會都是以週為單位在運作，所以光看每日的新增病例數不一定準。為了避免過度解讀，這張圖表列出的增長因數以週平均數來計算。
          </p>
          <p>
            2021年6月20日新增「死亡人數」按鈕，死亡不會傳染，但可以觀察確診人數與死亡人數的相對關係。
          </p>
          <SourceCredit />
        </div>
      </div>
    </div>
  );
};
