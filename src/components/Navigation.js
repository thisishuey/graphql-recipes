import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

class Navigation extends Component {
  render() {
    const HomeLink = props => <Link to="/" {...props} />;
    const ListRecipesLink = props => <Link to="/recipes" {...props} />;
    const AddRecipeLink = props => <Link to="/recipes/add" {...props} />;
    return (
      <div>
        <Typography variant="h1">Recipes App</Typography>
        <Button component={HomeLink}>Home</Button>
        <Button component={ListRecipesLink}>List Recipes</Button>
        <Button component={AddRecipeLink}>Add Recipe</Button>
      </div>
    );
  }
}

export default Navigation;
