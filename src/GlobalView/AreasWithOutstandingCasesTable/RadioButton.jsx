export const RadioButton = ({ item, label, selected, handleChange }) => (
  <div className="radio-btn">
    <input
      id={item}
      type="radio"
      onChange={() => handleChange(item)}
      checked={item === selected}
    />
    <label htmlFor={item}>{label}</label>
  </div>
);
