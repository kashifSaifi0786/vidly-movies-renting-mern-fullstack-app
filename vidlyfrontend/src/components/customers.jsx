import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getCustomers, deleteCustomer } from "../services/customerService";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import auth from '../services/authService';
import SearchBox from "./searchBox";

class Customers extends Component {
  state = {
    customers: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: '',
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();

    this.setState({ customers });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleDelete = async (customer) => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter(
      (savedCustomers) => savedCustomers._id !== customer._id
    );

    this.setState({ customers });

    try {
      await deleteCustomer(customer._id);
      toast.success("This customer has been deleted successfully.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This customer has already been deleted.");

        this.setState({ customers: originalCustomers });
      }
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page })
  }

  handleSearch = searchQuery => {
    this.setState({ searchQuery, currentPage: 1 })
  }

  render() {
    const { sortColumn, customers: allCustomers, pageSize, currentPage, searchQuery } = this.state;

    let filteredCustomers = allCustomers;
    if (searchQuery)
    filteredCustomers = filteredCustomers.filter((c) =>
      c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    const sortedCustomers = _.orderBy(
      filteredCustomers,
      [sortColumn.path],
      [sortColumn.order]
    );

    const customers = paginate(sortedCustomers, currentPage, pageSize);

    return (
      <React.Fragment>
       {auth.getCurrentUser() && (
        <Link
          to="/customers/new"
          className="btn btn-primary"
          style={{ marginBottom: "20px" }}
        >
          New Customer
        </Link>
       )}
        <p>Showing {filteredCustomers.length} customers in the database.</p>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <CustomersTable
          sortColumn={sortColumn}
          onSort={this.handleSort}
          customers={customers}
          onDelete={this.handleDelete}
        />
         <Pagination
            itemsCount={filteredCustomers.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
      </React.Fragment>
    );
  }
}

// sortColumn, onSort, customers

export default Customers;
