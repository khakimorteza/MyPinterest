import React from "react";
import { Modal } from "./Modal.js";
import "../../css/Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { userLogin } = this.props;
    return (
      <Modal>
        <div className="login">
          <img
            src="https://www.freepnglogos.com/uploads/pinterest-button-logo-vector-png-26.png"
            alt=""
          />
          <h1>Wellcome back!</h1>
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
                userLogin(this.state.username, this.state.password);
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

export default Login;
