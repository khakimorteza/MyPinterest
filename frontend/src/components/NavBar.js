import React from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";

export const NavBar = ({ handleLogout }) => {
  return (
    <nav>
      <NavLink to={"/home"}>
        <img
          src="https://www.freepnglogos.com/uploads/pinterest-button-logo-vector-png-26.png"
          alt=""
        />
      </NavLink>
      <input className="input" type="text" placeholder=" 🔍 Search ..." />
      <NavLink to={"/home"}>Home</NavLink>
      <NavLink to={"/user/11/boards"}>Ms. Jocelyn Hammes</NavLink>
      <NavLink
        to={"/"}
        onClick={e => {
          e.preventDefault();
          handleLogout();
        }}
      >
        Logout
      </NavLink>
    </nav>
  );
};
