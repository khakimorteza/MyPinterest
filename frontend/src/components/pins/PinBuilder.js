import React from "react";
import { NavLink, Link } from "react-router-dom";
import { createNewPin } from "../../util/util.js";
import "../../css/AddForm.css";

class PinBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board_id: "",
      url: ""
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

  handleSelect = e => {
    if (e.target.value === "new-board") {
      this.props.history.push("/board-builder");
    }
    this.setState({
      board_id: e.target.value
    });
  };

  handleCreateApin = (user_id, board_id, url) => {
    createNewPin(user_id, board_id, url);
    this.setState({
      url: ""
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    console.log("props =>", this.props);
    const { currentUser, userBoards, boardsAndPinsForAuser } = this.props;

    if (!userBoards) {
      currentUser && boardsAndPinsForAuser(currentUser.id);
      return <div>loading!</div>;
    }

    const boardOption = userBoards.map(userboard => {
      return (
        <option key={userboard.board_id} value={userboard.board_id}>
          {userboard.title}
        </option>
      );
    });
    return (
      <div className="form-page">
        <div className="form-container">
          <img
            src="https://www.freepnglogos.com/uploads/pinterest-button-logo-vector-png-26.png"
            alt=""
          />
          <h1>Create Pin</h1>
          <form>
            <select onChange={this.handleSelect}>
              <option key={""} value={""} disabled>
                Choose a board (required)
              </option>
              {boardOption}
              <option key={"new-board"} value={"new-board"}>
                [Create new board]
              </option>
            </select>

            <br />
            <input
              required
              value={this.state.url}
              name="url"
              type="text"
              placeholder="Add image address"
              onChange={this.handleChange}
            />
            <br />
            <button
              value="submit"
              placeholder="save"
              onClick={e => {
                e.preventDefault();
                this.handleCreateApin(
                  currentUser.id,
                  Number(this.state.board_id),
                  this.state.url
                );
              }}
            >
              Save
            </button>
          </form>
          <NavLink to={"/board-builder"}>Create a board</NavLink>
        </div>
        <Link className="link-home" to="#" onClick={this.goBack}>
          Back
        </Link>
      </div>
    );
  }
}

export default PinBuilder;
