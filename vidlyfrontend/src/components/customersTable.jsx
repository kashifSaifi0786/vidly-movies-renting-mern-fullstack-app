import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import auth from "../services/authService";

class CustomersTable extends Component {
  columns = [
    {
      label: "Name",
      path: "name",
      content: (customer) => (
        <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
      ),
    },
    { label: "IsGold", path: "isGold" },
    { label: "Phone", path: "phone" },
  ];

  deleteColumn = {
    key: "delete",
    content: (customer) => {
      return (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(customer)}
        >
          Delete
        </button>
      );
    },
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();

    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { sortColumn, onSort, customers } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={customers}
      />
    );
  }
}

export default CustomersTable;
