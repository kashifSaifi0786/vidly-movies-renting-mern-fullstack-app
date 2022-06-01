import React, { Component } from "react";
import PropTypes from 'prop-types';
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

class Table extends Component {
  render() {
    const { columns, sortColumn, onSort, data } = this.props;

    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody data={data} columns={columns} />
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
}

export default Table;
