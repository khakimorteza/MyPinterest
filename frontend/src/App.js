import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
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
  isUserLoggedIn
} from "./util/util.js";
import { Pins } from "./components/pins/Pins.js";
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
      users: [],
      user: null,
      boards: [],
      pins: [],
      pin: null,
      userBoards: [],
      userPins: [],
      boardPins: [],
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
      showModal
    } = this.state;
    return (
      <div className="App">
        {this.state.currentUser && <NavBar handleLogout={this.handleLogout} />}
        <Switch>
          <Route
            exact
            path="/home"
            render={props => <Pins {...props} pins={pins} />}
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

export default App;
