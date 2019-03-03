import React from "react";
import { Modal } from "./Modal.js";
import "../../css/Login.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { handleSignup } = this.props;
    return (
      <Modal>
        <div className="login">
          <img
            src="https://www.freepnglogos.com/uploads/pinterest-button-logo-vector-png-26.png"
            alt=""
          />
          <h1>Sign up to see more</h1>
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
              onClick={e => {
                e.preventDefault();
                handleSignup(
                  this.state.username,
                  this.state.email,
                  this.state.password
                );
              }}
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
