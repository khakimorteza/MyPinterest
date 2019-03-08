import React from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";

export const NavBar = ({
  handleLogout,
  currentUser,
  handleSearchChange,
  handleSearchSubmit,
  textInput
}) => {
  return (
    <nav>
      <NavLink to={"/home"}>
        <img
          src="https://www.freepnglogos.com/uploads/pinterest-button-logo-vector-png-26.png"
          alt=""
        />
      </NavLink>
      <form onSubmit={handleSearchSubmit}>
        <input
          className="input"
          name="textInput"
          value={textInput}
          type="text"
          placeholder=" 🔍 Search for a Board"
          onChange={handleSearchChange}
        />
      </form>
      <NavLink to={"/home"}>Home</NavLink>
      <NavLink to={`/user/${currentUser.id}/boards`}>
        {currentUser.username}
      </NavLink>
      <NavLink to={"/"} onClick={handleLogout}>
        Logout
      </NavLink>
    </nav>
  );
};
