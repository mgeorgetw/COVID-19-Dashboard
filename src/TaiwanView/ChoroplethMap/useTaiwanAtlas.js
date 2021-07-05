import { useState, useEffect } from "react";
import { json } from "d3";
import { feature, mesh } from "topojson";

// Source: https://github.com/dkaoster/taiwan-atlas
// License: MIT
const jsonUrl =
  "https://cdn.jsdelivr.net/npm/taiwan-atlas/districts-mercator-10t.json";

// Use JSON data
export const useTaiwanAtlas = () => {
  const [data, setData] = useState(null);
  // if (data) console.log(data);

  useEffect(() => {
    json(jsonUrl).then((topology) => {
      // console.log("topo", topology);
      const { nation, counties, districts } = topology.objects;
      setData({
        // topojson.feature(topology, object) converts TopoJSON to GeoJSON,
        // which d3 can parse
        nation: feature(topology, nation),
        counties: feature(topology, counties),
        districts: feature(topology, districts),
        // topojson.mesh - mesh TopoJSON geometry and convert to GeoJSON lines
        interiors: mesh(topology, districts, (a, b) => a !== b),
      });
    });
  }, []);
  return data;
};
