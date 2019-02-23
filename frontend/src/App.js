import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import {
  getAllUsers,
  getAllBoards,
  getAllPins,
  getSinglePin,
  getBoardsForAuser
} from "./util/util.js";
import { Pins } from "./components/pins/Pins.js";
import OnePin from "./components/onePin/OnePin.js";
import UserProfile from "./components/user/UserProfile.js";
import axios from "axios";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      boards: [],
      pins: [],
      pin: null,
      userBoards: []
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

  boardsForAuser = id => {
    getBoardsForAuser(id).then(res =>
      this.setState({ userBoards: res.data.boards })
    );
  };

  render() {
    console.log(this.state);
    const { pins, pin, userBoards } = this.state;
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
            path="/pin/:id"
            render={props => {
              return (
                <OnePin {...props} pin={pin} loadOnePin={this.loadOnePin} />
              );
            }}
          />
          <Route
            path="/user"
            render={props => {
              return (
                <UserProfile
                  {...props}
                  userBoards={userBoards}
                  boardsForAuser={this.boardsForAuser}
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
