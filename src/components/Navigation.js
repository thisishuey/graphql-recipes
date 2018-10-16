import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <div>
        <h1>Recipes App</h1>
        <Link to="/">Home</Link>
        <Link to="/recipes">List Recipes</Link>
        <Link to="/recipes/add">Add Recipe</Link>
      </div>
    );
  }
}

export default Navigation;
