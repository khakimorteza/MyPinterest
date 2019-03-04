import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import {
  getAllUsers,
  getSingleUser,
  getAllBoards,
  getAllPins,
  getSinglePin,
  getBoardsAndPinsForAuser,
  getPinsForAuser,
  getABoardWithPins,
  loginAuser,
  signUpAuser,
  logoutUser,
  isUserLoggedIn,
  createNewPin,
  createNewBoard
} from "./util/util.js";
import { Pins } from "./components/pins/Pins.js";
import PinBuilder from "./components/pins/PinBuilder.js";
import BoardBuilder from "./components/pins/BoardBuilder.js";
import OnePin from "./components/onePin/OnePin.js";
import UserBoards from "./components/user/UserBoards.js";
import UserPins from "./components/user/UserPins.js";
import BoardPins from "./components/board/Board.js";
import Login from "./components/log/Login.js";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      user: null,
      boards: null,
      pins: null,
      pin: null,
      userBoards: null,
      userPins: null,
      boardPins: null,
      board: null,
      showModal: "login",
      currentUser: null
    };
  }
  componentDidMount() {
    // getAllUsers().then(res => this.setState({ users: res.data.users }));
    getAllBoards().then(res => this.setState({ boards: res.data.boards }));
    getAllPins().then(res => this.setState({ pins: res.data.images }));
    isUserLoggedIn().then(res => {
      console.log("isLoggedIn", res);
      if (res.data.user) {
        this.setState({ currentUser: res.data.user, showModal: "" });
      }
    });
  }

  authenticateAndSetUser = () => {
    isUserLoggedIn().then(res => {
      if (res.data.user) {
        this.setState({ currentUser: res.data.user, showModal: "" });
      } else {
        this.props.history.push("/");
      }
    });
  };

  loadOnePin = id => {
    console.log("id", id, this);
    getSinglePin(id).then(res => this.setState({ pin: res.data.image }));
  };

  getSingleUser = id => {
    getSingleUser(id).then(res => {
      console.log("!!!!!", res.data);
      this.setState({ user: res.data.user });
    });
  };

  boardsAndPinsForAuser = id => {
    getBoardsAndPinsForAuser(id).then(res =>
      this.setState({ userBoards: res.data.boards })
    );
  };

  loadPinsForAuser = id => {
    getPinsForAuser(id).then(res => {
      this.setState({ userPins: res.data.pins });
    });
  };

  loadPinsForAboardWithBoard = id => {
    getABoardWithPins(id).then(res => {
      this.setState({ boardPins: res.data.board });
    });
  };

  userLogin = (username, password) => {
    console.log("username =>", username, password);
    loginAuser(username, password)
      .then(res => {
        this.setState({
          currentUser: res.data,
          showModal: ""
        });
      })
      .catch(err => {
        console.log("@er", err);
      });
  };

  handleSignup = (username, email, password) => {
    signUpAuser(username, email, password)
      .then(res => {
        console.log("sign up successfull !!!!");
        this.userLogin(username, password);
      })
      .catch(err => {
        console.log("@er sign up error", err);
      });
  };

  handleLogout = () => {
    logoutUser().then(res => {
      this.setState({
        showModal: "login",
        currentUser: null
      });
    });
  };

  handleCreateApin = (user_id, board_id, url) => {
    createNewPin(user_id, board_id, url);
  };

  handleCreateAboard = (title, user_id) => {
    createNewBoard(title, user_id);
  };

  toggleButton = () => {
    if (this.state.showModal === "login") {
      this.setState({ showModal: "sign up" });
    }
    if (this.state.showModal === "sign up") {
      this.setState({ showModal: "login" });
    }
  };

  render() {
    console.log(this.state);
    const {
      pins,
      pin,
      userBoards,
      user,
      userPins,
      boardPins,
      showModal,
      currentUser
    } = this.state;
    return (
      <div className="App">
        {this.state.currentUser && (
          <NavBar handleLogout={this.handleLogout} currentUser={currentUser} />
        )}
        <Switch>
          <Route
            exact
            path="/home"
            render={props => (
              <Pins
                authenticate={this.authenticateAndSetUser}
                {...props}
                pins={pins}
              />
            )}
          />

          <Route
            path="/user/:id/boards"
            render={props => {
              return (
                <UserBoards
                  {...props}
                  userBoards={userBoards}
                  user={user}
                  getSingleUser={this.getSingleUser}
                  boardsAndPinsForAuser={this.boardsAndPinsForAuser}
                />
              );
            }}
          />

          <Route
            path="/user/:id/pins"
            render={props => {
              return (
                <UserPins
                  {...props}
                  userPins={userPins}
                  user={user}
                  getSingleUser={this.getSingleUser}
                  loadPinsForAuser={this.loadPinsForAuser}
                />
              );
            }}
          />

          <Route
            path="/pin/:id"
            render={props => {
              return (
                <OnePin {...props} pin={pin} loadOnePin={this.loadOnePin} />
              );
            }}
          />
          <Route
            path="/board/:id"
            render={props => {
              return (
                <BoardPins
                  {...props}
                  boardPins={boardPins}
                  loadPinsForAboardWithBoard={this.loadPinsForAboardWithBoard}
                />
              );
            }}
          />
          <Route
            path="/pin-builder"
            render={props => {
              return (
                <PinBuilder
                  handleCreateApin={this.handleCreateApin}
                  currentUser={currentUser}
                  userBoards={userBoards}
                  authenticate={this.authenticateAndSetUser}
                  boardsAndPinsForAuser={this.boardsAndPinsForAuser}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/board-builder"
            render={props => {
              return (
                <BoardBuilder
                  handleCreateAboard={this.handleCreateAboard}
                  authenticate={this.authenticateAndSetUser}
                  currentUser={currentUser}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/"
            render={props => {
              return (
                <Pins
                  {...props}
                  pins={pins}
                  showModal={showModal}
                  userLogin={this.userLogin}
                  toggleButton={this.toggleButton}
                  handleSignup={this.handleSignup}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
