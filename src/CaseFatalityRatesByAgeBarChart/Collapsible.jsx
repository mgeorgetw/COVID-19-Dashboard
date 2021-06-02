import React from "react";

const SourceCredit = () => (
  <>
    <p className="footnote">
      Data sources: Chinese Center for Disease Control and Prevention (CDC);
      Spanish Ministry of Health; Korea Centers for Disease Control and
      Prevention (KCDC); Onder G, Rezza G, Brusaferro S. Case-Fatality Rate and
      Characteristics of Patients Dying in Relation to COVID-19 in Italy. JAMA.
      (This is a remake of{" "}
      <a href="https://ourworldindata.org/mortality-risk-covid#case-fatality-rate-of-covid-19-by-age">
        the same chart
      </a>{" "}
      by Hannah Ritchie and Max Roser published in OurWorldinData.org)
    </p>
    <p className="footnote">
      Licensed under CC-BY by the authors Hannah Ritchie and Max Roser.
    </p>
  </>
);

export const Collapsible = ({ id }) => {
  return (
    <div className="wrap-collapsible">
      <input id={id} className="toggle" type="checkbox" />
      <label htmlFor={id} className="lbl-toggle">
        What does this chart tell us?
      </label>
      <div className="collapsible-content">
        <div className="content-inner">
          <p>
            This chart gives us a rough idea of which age groups are most at
            risk to COVID-19. If we know which groups are most likely to die
            from the disease, precautions and resouces like vaccines can be
            directed to the ones who need them most. According to this chart,
            the elderly are most likely to die from COVID-19.
          </p>
          <p>
            The data presented in the chart are calculated from the number of
            deaths divided by the number of confirmed cases in each age group.
            Since COVID-19 is still an ongoing pandemic, these numbers can
            change over time and conditions. There are two main limitations to
            keep in mind when interpreting this chart:
          </p>
          <ol>
            <li>
              Since not everyone is tested within the population, we do not know
              the real number of infected cases.
            </li>
            <li>
              Some infected individuals are still alive at the time of
              recording, but will eventually die from the disease.
            </li>
          </ol>
          <SourceCredit />
        </div>
      </div>
    </div>
  );
};
