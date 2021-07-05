import { useState, useEffect } from "react";
import { json } from "d3";
import { feature, mesh } from "topojson";

const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

// Use JSON data
export const useWorldAtlas = () => {
  const [data, setData] = useState(null);
  // console.log(data);

  useEffect(() => {
    json(jsonUrl).then((topology) => {
      const { countries } = topology.objects;
      setData({
        // topojson.feature(topology, object) converts TopoJSON to GeoJSON,
        // which d3 can parse
        countries: feature(topology, countries),
        // topojson.mesh - mesh TopoJSON geometry and convert to GeoJSON lines
        interiors: mesh(topology, countries, (a, b) => a !== b),
      });
    });
  }, []);
  return data;
};
