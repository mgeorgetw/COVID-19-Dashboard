import React from "react";
const SourceCredit = () => (
  <p className="footnote">
    資料來源：衛生福利部疾病管制署（
    <a href="https://github.com/owid/covid-19-data/blob/master/public/data/vaccinations/country_data/Taiwan.csv">
      Our Wolrd in Data
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
            這張圖表的用意在於判斷：以施打疫苗為防疫手段而言，台灣距離平息COVID-19疫情還有多遠。由於目前市面上的疫苗大多需要打兩劑才算完成接種
            <s>，因此這裡也將接種人次分為「已接種」與「充分接種」兩種</s>
            。（2021年6月18日更新：台灣疾管署公佈接種數據時並不區分劑數差異，這張圖也只好改為單純的接種人次統計。）
          </p>
          <p>
            根據
            <a href="https://www.who.int/zh/news-room/q-a-detail/herd-immunity-lockdowns-and-covid-19?gclid=Cj0KCQjw16KFBhCgARIsALB0g8K0rV9obZlpcbd2lFom_qKgbCe72ZnV_mqn8Z2AiNt5W3QRZFbMGCoaAshfEALw_wcB">
              世界衛生組織的建議
            </a>
            ，對抗大規模傳染的流行病，居家隔離、封鎖等措施本身便會對個人與社會造成負面影響，是為爭取時間不得已而為之。要真正對抗COVID-19，世衛支持透過疫苗來達到「群體免疫」的效果。
          </p>
          <p>
            要實現「群體免疫」，就得讓社群中大多數人都擁有抗體，人數一多，病毒自然就少了傳播媒介，從而中斷傳播鏈。人要取得抗體有兩種手段：一是讓大多數的人都感染，感染過後自然會產生抗體，但這種方法必然會導致更多病例與死亡。另一種方法，就是施打疫苗。疫苗可以在不讓人生病的情況下，訓練免疫系統產生抗體，比起真的生病是安全得多的做法。
          </p>
          <p>
            那麼，要多少人打過疫苗才能達到群體免疫呢？要考慮的條件主要有二。首先是每種疾病的狀況不同，例如麻疹需要95%的人口接種，才能保護剩下的5%。就COVID-19來說，實際需要多高的接種率目前沒有人能夠肯定。不過，根據
            <a href="https://wwwnc.cdc.gov/eid/article/27/5/20-4365_article">
              美國疾管中心在卡達做的研究
            </a>
            ，社群中若有65%至70%的人感染，該社群就很接近群體免疫。
          </p>
          <p>
            知道了這點之後，第二個要考慮的是
            <a href="https://www.thelancet.com/journals/lanmic/article/PIIS2666-5247(21)00069-0/fulltext">
              疫苗的效能
            </a>
            。每一款疫苗的效能不盡相同，若是使用效能約65%至70%左右的AstraZeneca-Oxford或嬌生疫苗，就需要全民施打來達到群體免疫；若使用效能達95%左右的Pfizer-BioNTech或Moderna-NIH疫苗，則只需75%的人口施打即可。
          </p>
          <SourceCredit />
        </div>
      </div>
    </div>
  );
};
