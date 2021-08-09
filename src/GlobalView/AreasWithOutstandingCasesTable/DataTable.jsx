const calPercentage = (numerator, denominator) =>
  Number(((numerator / denominator) * 100).toFixed(2));

export const DataTable = ({ data, selected }) => (
  <div className="area-data-sets">
    {data.map((d, index) => (
      <div className="data-set" key={d.country}>
        <div className="vertical-inverted-title">
          {index + 1} {d.location}
        </div>
        <div className="set-title">Confirmed</div>
        <div
          className={`numerical-data ${
            selected === "total_cases" ? "selected" : null
          }`}
        >
          {d.total_cases.toLocaleString()}
        </div>
        <div
          className={`smaller-numbers numerical-data ${
            selected === "new_cases" ? "selected" : null
          }`}
        >
          (+{d.new_cases.toLocaleString()})
        </div>
        <div className="set-title">Deaths</div>
        <div
          className={`numerical-data ${
            selected === "total_deaths" ? "selected" : null
          }`}
        >
          {d.total_deaths.toLocaleString()}
        </div>
        <div
          className={`smaller-numbers numerical-data ${
            selected === "new_deaths" ? "selected" : null
          }`}
        >
          (+{d.new_deaths.toLocaleString()})
        </div>
        <div className="set-title">Death Rate</div>
        <div className="numerical-data">
          {calPercentage(d.total_deaths, d.total_cases)}%
        </div>
      </div>
    ))}
  </div>
);
