import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { getRentals } from "../services/rentalService";
import RentalsTable from "./rentalsTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";

class Rentals extends Component {
  state = {
    rentals: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: '',
    sortColumn: { path: "customer.name", order: "asc" },
  };

  async componentDidMount() {
    const { data: rentals } = await getRentals();

    this.setState({ rentals });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery, currentPage: 1 })
  }

  render() {
    const { rentals: allRentals, sortColumn, pageSize, currentPage, searchQuery } = this.state;

    let fileredRentals = allRentals;
    if (searchQuery)
    fileredRentals = fileredRentals.filter((r) =>
      r.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    const sortedRentals = _.orderBy(
      fileredRentals,
      [sortColumn.path],
      [sortColumn.order]
    );

    const rentals = paginate(sortedRentals, currentPage, pageSize);

    return (
      <React.Fragment>
        {auth.getCurrentUser() && (
          <Link
            to="/rentals/new"
            className="btn btn-primary"
            style={{ marginBottom: "20px" }}
          >
            New Rental
          </Link>
        )}
        <p>Showing {fileredRentals.length} customers in the database.</p>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <RentalsTable
          sortColumn={sortColumn}
          onSort={this.handleSort}
          rentals={rentals}
        />
        <Pagination
          itemsCount={fileredRentals.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Rentals;
