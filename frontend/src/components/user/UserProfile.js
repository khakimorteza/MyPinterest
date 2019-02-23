import React from "react";
import { withRouter } from "react-router-dom";
import { DisplayBoard } from "./DisplayBoard.js";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const userId = 11;
    this.props.boardsForAuser(userId);
  }
  render() {
    const { userBoards } = this.props;
    const userBoardsDis = userBoards.map(board => {
      return <DisplayBoard key={board.id} board={board} />;
    });
    return <div>{userBoardsDis}</div>;
  }
}

export default UserProfile;
