import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/UserProfile.css";

export const UserProfile = ({ user }) => (
  <>
    <div className="profile">
      <div className="username">
        <h1>{user.username}</h1>
      </div>
      <div className="profile-picture">
        <img
          alt=""
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUXAjICrx-XVhOZIpJ80Ix1WHf9kx5X8IUUqbHdXRKXNthuOLwtw"
        />
      </div>
    </div>
    <div className="link">
      <NavLink to={`/user/${user.id}/boards`}>Boards</NavLink>
      <NavLink to={`/user/${user.id}/pins`}>Pins</NavLink>
      <NavLink to={"/pin-builder"}>Create Pin</NavLink>
    </div>
  </>
);
