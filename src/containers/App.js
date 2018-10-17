import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../utils/withRoot";
import Home from "./Home";
import ListRecipes from "./recipes/ListRecipes";
import AddRecipe from "./recipes/AddRecipe";
import Navigation from "../components/Navigation";

const styles = theme => ({});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <BrowserRouter>
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/recipes" component={ListRecipes} />
              <Route path="/recipes/add" component={AddRecipe} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App));
