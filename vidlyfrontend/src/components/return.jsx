import React from "react";
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { getCustomers } from "../services/customerService";
import { getMovies } from "../services/movieService";
import Form from "./common/form";
import { saveReturn } from "../services/returnService";

class RentalForm extends Form {
  state = {
    data: {
      customerId: "",
      movieId: "",
    },
    errors: {},
    customers: [],
    movies: [],
  };

  schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  }

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    const { data: movies } = await getMovies();

    this.setState({ customers, movies });
  }

  doSubmit = async () => {
    try {
      await saveReturn(this.state.data);
      toast.success('Movie is successfully returned.');
      
      this.props.history.push('/rentals');
    } catch(ex) {
      if (ex.response && (ex.response.status === 400 || ex.response.status === 404)) 
          toast.error(ex.response.data);
    }
  }

  render() {
    const { customers, movies } = this.state;

    return (
      <div>
        <h2>Return Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderDataList('customers', 'Customer', 'customerId', 'name', customers)}
          {this.renderDataList('movies', 'Movie', 'movieId', 'title', movies)}
          {this.renderButton('Return')}
        </form>
      </div>
    );
  }
}

export default RentalForm;
