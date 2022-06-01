import React, { Component } from "react";
import moment from 'moment';
import Table from "./common/table";

class RentalsTable extends Component {
  columns = [
    { label: "Customer Name", path: "customer.name" },
    { label: "Customer Phone", path: "customer.phone" },
    { label: "Movie", path: "movie.title" },
    { label: "DailyRentalRate", path: "movie.dailyRentalRate" },
    { label: 'DateOut', path: 'dateOut', key: 'dateout', content: (item) => (
        moment(item.dateOut).format('MMMM Do YYYY, h:mm:ss a')
    )},
  ];

  render() {
    const { sortColumn, onSort, rentals } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={rentals}
      />
    );
  }
}

export default RentalsTable;
