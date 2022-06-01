import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getCustomers } from "../services/customerService";
import { getMovies } from "../services/movieService";
import Form from "./comman/form";
import { saveRental } from "../services/rentalService";

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
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    const { data: movies } = await getMovies();

    this.setState({ customers, movies });
  }

  doSubmit = async () => {
    try {
      await saveRental(this.state.data);
      toast.success("Rental is saved successfully.");

      this.props.history.push("/rentals");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  };

  render() {
    const { customers, movies } = this.state;

    return (
      <div>
        <h2>Rental Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderDataList(
            "customers",
            "Customer",
            "customerId",
            "name",
            customers
          )}
          {this.renderDataList("movies", "Movie", "movieId", "title", movies)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default RentalForm;
