import React, { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";

const Profile = (props) => {
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    try {
      let response = await axios.get("http://localhost:9090/user/profile");
      let data = response.data.response;
      setUser(data);
      // props.onAuth(true);
    } catch (error) {
      console.log(error.response.data.response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="Profile">
      <h1>
        Profile {user.firstName} {user.lastName}
      </h1>
    </div>
  );
};

export default Profile;
