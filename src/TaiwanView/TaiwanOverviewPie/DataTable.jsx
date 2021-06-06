import React from "react";

export const DataTable = ({ items }) => (
  <div className="small-table">
    <table>
      <thead>
        <tr>
          <th>總確診數</th>
          {/* {items.map((item) => ( */}
          {/*   <th key={dataType(item)}>{dataType(item)}</th> */}
          {/* ))} */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="numerical-data">
            {items.reduce((acc, cur) => acc + cur.value, 0).toLocaleString()}
          </td>
          {/* {items.map((item, index) => ( */}
          {/*   <td className="numerical-data" key={index}> */}
          {/*     {dataValue(item).toLocaleString()} */}
          {/*   </td> */}
          {/* ))} */}
        </tr>
      </tbody>
    </table>
  </div>
);
