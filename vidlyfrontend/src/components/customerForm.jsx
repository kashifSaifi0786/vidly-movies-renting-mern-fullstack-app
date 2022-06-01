import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import { saveCustomer, getCustomer } from "../services/customerService";

class CustomerForm extends Form {
  state = {
    data: {
      name: "",
      phone: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(5).max(55).required(),
    phone: Joi.string().min(5).max(55).required(),
  };

  async populateCustomer() {
    try {
      const customerId = this.props.match.params.id;
      if (customerId === "new") return;

      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 404)
      )
        this.props.history.push("/not-found");
    }
  }

  async componentDidMount() {
    this.populateCustomer();
  }

  mapToViewModel(customer) {
    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    };
  }

  doSubmit = async () => {
    try {
      await saveCustomer(this.state.data);

      toast.success("Customer is saved successfully.");
      this.props.history.push("/customers");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;

        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h2>Customer Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CustomerForm;
