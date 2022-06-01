import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      name="query"
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      type="text"
      className="form-control my-3"
      placeholder="Search..."
    ></input>
  );
};

export default SearchBox;
