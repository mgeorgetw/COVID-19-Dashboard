const dropdownItems = [
  "全台灣",
  "南投縣",
  "台中市",
  "台北市",
  "台南市",
  "台東縣",
  "嘉義市",
  "嘉義縣",
  "基隆市",
  "境外移入",
  "宜蘭縣",
  "屏東縣",
  "彰化縣",
  "新北市",
  "新竹市",
  "新竹縣",
  "桃園市",
  "澎湖縣",
  "花蓮縣",
  "苗栗縣",
  "連江縣",
  "雲林縣",
  "高雄市",
];

const labelValuePairs = dropdownItems.map((d) => ({
  label: d,
  value: d,
}));

export const DropdownMenu = ({
  chosen,
  setChosen,
  handleAreaHover,
  handleCursorHover,
}) => (
  <div className="dropdown-container">
    區域：
    <select
      value={chosen}
      onChange={(e) => {
        setChosen(e.currentTarget.value);
        handleAreaHover(null);
        handleCursorHover(null);
      }}
    >
      {labelValuePairs.map(({ label, value }) => (
        <option className="region-name" key={label} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);
