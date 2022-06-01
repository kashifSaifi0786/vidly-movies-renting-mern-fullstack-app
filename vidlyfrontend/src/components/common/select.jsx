import React from "react";

const Select = ({ name, label, options, value, error, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select className="form-select" value={value} name={name} onChange={onChange}>
        <option value=""></option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>{option.name}</option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
