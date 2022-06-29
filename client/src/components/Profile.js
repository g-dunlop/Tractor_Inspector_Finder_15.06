import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import config from "../config";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently  } = useAuth0();


  return (
    isAuthenticated && (
      <div className="profile">
        {/* <img src={user.picture} alt={user.name} /> */}
        <p>{user.name}</p>
        {/* <p>{user.email}</p> */}
       
      </div>
    )
  );
};

export default Profile;