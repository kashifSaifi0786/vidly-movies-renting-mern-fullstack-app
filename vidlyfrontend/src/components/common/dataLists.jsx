import React from "react";

const DataLists = ({
  id,
  label,
  list,
  name,
  dataPath,
  onChange,
  datas,
  error,
}) => {

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        list={list}
        name={name}
        id={id}
        data-path={dataPath}
        placeholder="Type to search..."
        onChange={onChange}
        autoComplete="off"
      ></input>
      <datalist id={list}>
        {datas.map((data) => (
          <option key={data._id} value={data[dataPath]}></option>
        ))}
      </datalist>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DataLists;
