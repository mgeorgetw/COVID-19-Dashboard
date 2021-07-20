import React, { useState, useEffect } from "react";

export const DropdownMenu = ({ dropdownItems, chosen, setChosen }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(
      dropdownItems.map((d) => ({
        label: d,
        value: d,
      }))
    );
  }, [dropdownItems]);
  return (
    <div className="dropdown-container">
      選擇區域：
      <select value={chosen} onChange={(e) => setChosen(e.currentTarget.value)}>
        {items.map(({ label, value }) => (
          <option className="region-name" key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
