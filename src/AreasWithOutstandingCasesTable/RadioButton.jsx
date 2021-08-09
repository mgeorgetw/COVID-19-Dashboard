export const RadioButton = (props) => {
  return (
    <div className="radio-btn">
      <input
        id={props.id}
        type="radio"
        onChange={props.changed}
        checked={props.isSelected}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};
