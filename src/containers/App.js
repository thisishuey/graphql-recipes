import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../utils/withRoot";
import Home from "./Home";
import ListRecipes from "./recipes/ListRecipes";
import AddRecipe from "./recipes/AddRecipe";
import Navigation from "../components/Navigation";

const styles = theme => ({
  main: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 8,
    [theme.breakpoints.up(752 + theme.spacing.unit * 2 * 2)]: {
      width: 752,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <BrowserRouter>
          <Fragment>
            <Navigation />
            <main className={classes.main}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/recipes" component={ListRecipes} />
                <Route path="/recipes/add" component={AddRecipe} />
              </Switch>
            </main>
          </Fragment>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default withRoot(withStyles(styles)(App));
