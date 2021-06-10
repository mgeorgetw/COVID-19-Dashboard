import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import { useCodes } from "./useCodes";
import { Marks } from "./Marks";
import { scaleSequential, interpolateYlOrRd, max } from "d3";

const width = "960";
const height = "500";
const selectedYear = "2017";

export const ChoroplethMap = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const codes = useCodes(); // ISO 3166-1 country codes numeric vs alpha-3

  if (!worldAtlas || !data || !codes) return <pre>"Loading..."</pre>;

  // Choropleth Map can only displays one year of data
  const filteredData = data.filter(d => d.Year === selectedYear);

  // Creates a key/value map that matches ISO 3166 numeric to alpha-3 codes
  const numericCodeByAlphaCode = new Map();
  codes.forEach(code => {
    const alpha3Code = code["alpha-3"];
    const numericCode = code["country-code"];
    numericCodeByAlphaCode.set(alpha3Code, numericCode);
  });
  // console.log(numericCodeByAlphaCode);

  // Creates a key/value map that matches numeric code to data
  // We need this because GeoJSON defaults to ISO 3166 numeric codes
  const rowByNumericCode = new Map();
  filteredData.forEach(d => {
    const alpha3Code = d.Code;
    const numericCode = numericCodeByAlphaCode.get(alpha3Code);
    rowByNumericCode.set(numericCode, d);
  });
  // console.log(rowByNumericCode);

  const colorValue = d => d.aids;
  const colorScale = scaleSequential(interpolateYlOrRd).domain([
    0,
    max(data, colorValue)
  ]);

  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlas}
        rowByNumericCode={rowByNumericCode}
        colorScale={colorScale}
        colorValue={colorValue}
      />
    </svg>
  );
};
