import React, { Component, useState, useEffect } from "react";
import axios from "axios";

export default class Mathilde extends Component {
  // Inheriting properties and methods from the parent component = class Component
  state = {
    color: "",
    user: {},
    open: false,
  };

  // Lifecycle method
  // Always async await + try catch when fetching data to catch errors
  componentDidMount = () => {
    // FETCHING WITH ASYNC AWAIT
    // let response = await this.fetchData();
    // this.setState({ user: response });

    // FETCHING WITH CALLBACKS
    this.fetchData.then((response) => this.setState({ user: response }));
  };

  fetchData = async () => {
    try {
      let response = await axios.get("");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return <h1>{this.state}</h1>;
  }
}

// Uses less ressources, only uses the methods it needs
const functionalComponent = () => {
  // In functional components it is better to define getters and setters for each action/meaning/purpose of modifying state
  const [color, setColor] = useState(""); // const [getter, setter] // acts like the method this.setState()

  // With multiple key-value pairs
  //   const [user, setUser] = useState({
  //     user: {},
  //     job: "",
  //   });

  const [user, setUser] = useState({});

  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  // useEffect can be created to act as componentDidMount, componentDidUpdate and componentWillUpdate

  // UseEffect that emulates componentDidMount
  useEffect(() => {
    fetchData.then((response) => {
      // With multiple key-value pairs
      //   setUser({ user: response, job: "" });

      setUser(response);
    });
  }, []);

  const fetchData = async () => {
    try {
      let response = await axios.get("");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{color}</h1>
    </div>
  );
};

export default functionalComponent;
