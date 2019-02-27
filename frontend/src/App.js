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
  getABoardWithPins
} from "./util/util.js";
import { Pins } from "./components/pins/Pins.js";
import OnePin from "./components/onePin/OnePin.js";
import UserBoards from "./components/user/UserBoards.js";
import UserPins from "./components/user/UserPins.js";
import BoardPins from "./components/board/Board.js";
import axios from "axios";
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
      board: null
    };
  }
  componentDidMount() {
    getAllUsers().then(res => this.setState({ users: res.data.users }));
    getAllBoards().then(res => this.setState({ boards: res.data.boards }));
    getAllPins().then(res => this.setState({ pins: res.data.images }));
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

  render() {
    console.log(this.state);
    const { pins, pin, userBoards, user, userPins, boardPins } = this.state;
    return (
      <div className="App">
        <NavBar />
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
        </Switch>
      </div>
    );
  }
}

export default App;
