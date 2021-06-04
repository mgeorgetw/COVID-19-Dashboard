import React from "react";

export const DataTable = ({ items, dataType, dataValue }) => {
  return (
    <div className="small-table">
      <table>
        <thead>
          <tr>
            {items.map((item) => (
              <th key={dataType(item)}>{dataType(item)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {items.map((item, index) => (
              <td className="numerical-data" key={index}>
                {dataValue(item).toLocaleString()}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
