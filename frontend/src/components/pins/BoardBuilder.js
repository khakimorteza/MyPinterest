import React from "react";
import { createNewBoard } from "../../util/util.js";
import { Link } from "react-router-dom";
import "../../css/AddForm.css";

class BoardBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  componentDidMount() {
    this.props.authenticate();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCreateAboard = (title, user_id) => {
    createNewBoard(title, user_id);
    this.setState({ title: "" });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { currentUser } = this.props;

    return (
      <div className="form-page">
        <div className="form-container">
          <img
            src="https://www.freepnglogos.com/uploads/pinterest-button-logo-vector-png-26.png"
            alt=""
          />
          <h1>Create Board</h1>
          <form>
            <input
              required
              name="title"
              value={this.state.title}
              type="text"
              placeholder="Add title"
              onChange={this.handleChange}
            />
            <br />
            <button
              value="submit"
              placeholder="save"
              onClick={e => {
                e.preventDefault();
                this.handleCreateAboard(this.state.title, currentUser.id);
              }}
            >
              Save
            </button>
          </form>
        </div>
        <Link className="link-home" to="#" onClick={this.goBack}>
          Back
        </Link>
      </div>
    );
  }
}

export default BoardBuilder;
