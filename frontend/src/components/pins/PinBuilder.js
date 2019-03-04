import React from "react";
import { NavLink } from "react-router-dom";

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

  render() {
    console.log("props =>", this.props);
    const {
      handleCreateApin,
      currentUser,
      userBoards,
      boardsAndPinsForAuser
    } = this.props;

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
      <>
        <form>
          <select onChange={this.handleSelect}>
            <option key={""} value={""} />
            {boardOption}
            <option key={"new-board"} value={"new-board"}>
              [Create new board]
            </option>
          </select>

          <br />
          <input
            required
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
              handleCreateApin(
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
      </>
    );
  }
}

export default PinBuilder;
