import React, { useState, useEffect } from "react";
import axios from "axios";
import "./user.css";

const Profile = (props) => {
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    try {
      let response = await axios.get("http://localhost:9090/user/profile");
      let data = response.data.response;
      setUser(data);
    } catch (error) {
      console.log(error.response.data.response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className="Profile">
      <div className="profileDetails">
        <h1>Welcome {user.firstName}</h1>
        <label htmlFor="firstName">First name</label>
        <p className="name">{user.firstName}</p>
        <label htmlFor="lastName">Last name</label>
        <p className="name">{user.lastName}</p>
        <label htmlFor="email">Email</label>
        <p className="name">{user.email}</p>
      </div>
    </section>
  );
};

export default Profile;
