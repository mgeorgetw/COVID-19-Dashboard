import React from "react";

export const DataTable = ({ items }) => {
  return (
    <div className="small-table">
      <table>
        <thead>
          <tr>
            {items.map((item, index) => (
              <th key={index}>{item.heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {items.map((item, index) => (
              <td className="numerical-data" key={index}>
                {item.value}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
