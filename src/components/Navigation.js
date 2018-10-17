import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

class Navigation extends Component {
  render() {
    return (
      <div>
        <Typography variant="h1">Recipes App</Typography>
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/recipes">
          List Recipes
        </Button>
        <Button component={Link} to="/recipes/add">
          Add Recipe
        </Button>
      </div>
    );
  }
}

export default Navigation;
