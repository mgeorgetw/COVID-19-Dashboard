import { useState, useEffect } from "react";
import { json } from "d3";
import { feature, mesh } from "topojson";

// Source: https://github.com/dkaoster/taiwan-atlas
// License: MIT
// const jsonUrl = "https://cdn.jsdelivr.net/npm/taiwan-atlas/towns-10t.json";
const jsonUrl =
  "https://cdn.jsdelivr.net/npm/taiwan-atlas/towns-mercator-10t.json";

// Use JSON data
export const useTaiwanAtlas = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);

  useEffect(() => {
    json(jsonUrl).then((topology) => {
      console.log("topo", topology);
      const { nation, counties, towns, compBorders } = topology.objects;
      setData({
        // topojson.feature(topology, object) converts TopoJSON to GeoJSON,
        // which d3 can parse
        nation: feature(topology, nation),
        counties: feature(topology, counties),
        towns: feature(topology, towns),
        // topojson.mesh - mesh TopoJSON geometry and convert to GeoJSON lines
        compBorders: feature(topology, compBorders),
        interiors: mesh(topology, towns, (a, b) => a !== b),
      });
    });
  }, []);
  return data;
};
