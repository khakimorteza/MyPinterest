import React from "react";
import { Modal } from "./Modal.js";
import "../../css/Login.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: []
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    const { email, username, password } = this.state;
    const errors = [];
    if (email.length === 0 || !this.validateEmail(email)) {
      errors.push("Invalid email");
    }
    if (username.length === 0) {
      errors.push("Invalid username");
    }
    if (password.length === 0) {
      errors.push("Invalid password");
    }
    this.setState({ errors: errors });
  };

  validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.validate();
    if (!this.state.errors.length) {
      this.props.handleSignup(
        this.state.username,
        this.state.email,
        this.state.password
      );
    }
  };

  render() {
    const { handleSignup } = this.props;
    const errorMessages = this.state.errors.map(e => <li>{e}</li>);
    return (
      <Modal>
        <div className="login">
          <img
            src="https://www.freepnglogos.com/uploads/pinterest-button-logo-vector-png-26.png"
            alt=""
          />
          <h1>Sign up to see more</h1>
          <ul className="errors">{errorMessages}</ul>
          <form>
            <input
              required
              name="username"
              type="text"
              placeholder="username"
              onChange={this.handleChange}
            />

            <br />
            <input
              required
              name="email"
              type="email"
              placeholder="email"
              onChange={this.handleChange}
            />

            <br />

            <input
              required
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />

            <br />

            <button
              value="continue"
              placeholder="continue"
              onClick={this.handleSubmit}
            >
              Continue
            </button>
          </form>
        </div>
      </Modal>
    );
  }
}

export default SignUp;
