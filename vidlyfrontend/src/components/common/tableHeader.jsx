import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const { sortColumn: column, onSort } = this.props;

    const sortColumn = { ...column };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (!(column.path === sortColumn.path)) return null;
    else {
      return sortColumn.order === "asc" ? (
        <i className="fa fa-sort-asc"></i>
      ) : (
        <i className="fa fa-sort-desc"></i>
      );
    }
  };

  render() {
    const { columns } = this.props;

    return (
      <thead className="table-light">
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              className="clickable"
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
