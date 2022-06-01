import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import DataLists from "./dataLists";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);
    if (error) return error.details[0].message;

    return null;
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({ data, errors });
  };

  handleDataListChange = ({ currentTarget: input }) => {
    const data = this.state[input.id].find(
      (c) => c[input.getAttribute("data-path")] === input.value
    );

    const errors = { ...this.state.errors };
    if (!data) {
      errors[input.name] = "Invalid Customer";

      this.setState({ errors });
    } else {
      const stateData = { ...this.state.data };
      stateData[input.name] = data._id;
      delete errors[input.name];

      this.setState({ data: stateData, errors });
    }
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};

    const { error } = Joi.validate(data, this.schema, { abortEarly: false });
    if (!error) return null;
    else {
      for (let detail of error.details) errors[detail.path[0]] = detail.message;
    }

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }

    this.doSubmit();
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        options={options}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderDataList(id, label, name, dataPath, datas ) {
    const { errors } = this.state;

    return (
      <DataLists
      id={id}
      label={label}
      list={`${id}List`}
      name={name}
      dataPath={dataPath}
      onChange={this.handleDataListChange}
      datas={datas}
      error={errors[name]}
    />
    )
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }
}

export default Form;
