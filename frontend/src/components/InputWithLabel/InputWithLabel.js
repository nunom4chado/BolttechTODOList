function InputWithLabel({
  containerClasses,
  label,
  value,
  handleValueChange,
  isPassword,
}) {
  return (
    <div className={containerClasses}>
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        type={isPassword ? "password" : "text"}
        value={value}
        onChange={handleValueChange}
      />
    </div>
  );
}

export default InputWithLabel;
